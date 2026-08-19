# Apex Veridoc — MVP Build

Multi-tenant programme management, attendance, analytics, and verifiable
digital credential platform.

**Stack:** React (Vite + TS + Tailwind v4) → Firebase Auth + Cloud Functions
(Node 20/TS, callable functions — no separate Express server) → Firestore +
Cloud Storage.

This is **Phase 1**: project foundation — auth, organization onboarding,
tenant isolation, and the audit/security logging backbone everything else
plugs into.

## Repo layout

```
apex-veridoc/
  firebase.json / .firebaserc / firestore.rules / firestore.indexes.json / storage.rules
  client/            React app (Vite)
  functions/         Cloud Functions (the entire backend)
```

## How the pieces fit together

- **The client never talks to Firestore/Storage directly.** `firestore.rules`
  and `storage.rules` deny all client access outright. Every read and write
  goes through a Cloud Function using the Admin SDK. This keeps tenant
  isolation, RBAC, and audit logging centralized in one place
  (`functions/src/lib/rbac.ts` + `audit.service.ts`) instead of duplicated
  across security rules and function code.
- **Auth is split**: the client uses the Firebase Auth SDK directly for
  sign-up/sign-in (`createUserWithEmailAndPassword` /
  `signInWithEmailAndPassword`) — Firebase handles password hashing,
  sessions, and tokens. Immediately after account creation, the client calls
  the `registerOrganization` callable, which creates the `Organization` +
  `User` + `ORGANIZATION_OWNER` membership docs in one Firestore transaction
  and is idempotency-guarded (a retried call can't spin up a second org for
  the same account).
- **Tenant isolation choke point**: `requireOrgMembership(req, organizationId)`
  in `functions/src/lib/rbac.ts` looks up the caller's membership doc
  directly (not a custom claim, which can go stale) before any org-scoped
  function touches Firestore. Every future programmes/participants/
  attendance/credentials function must call this first.
- **Three separate log collections** (`auditLogs`, `securityLogs`,
  `systemEvents`) matching the spec: "who did what" vs "did anything
  suspicious happen" vs "what did the system do." Automation actions log
  with `actorType: SYSTEM` so they're never mistaken for a human action.
- **No hidden bypass credential.** There is no HTTP endpoint that grants
  `APEX_MASTER_ADMIN`. The first master admin is set via
  `functions/src/scripts/bootstrapMasterAdmin.ts`, run manually and locally
  with a service account key — see the script's header comment.
- **Custom claims vs Firestore**: `platformRole` and `primaryOrganizationId`
  are set as Firebase Auth custom claims for cheap client-side UX (e.g.
  deciding which portal to render without a Firestore read), but the
  Firestore membership doc is the actual source of truth for every
  authorization decision inside a Cloud Function.

## Setup

You'll need a Firebase project (Blaze plan, since Cloud Functions v2
requires it — the free tier covers an MVP's usage easily) with Auth
(Email/Password provider), Firestore, and Storage enabled.

```bash
npm install -g firebase-tools     # if you don't have it
firebase login

# Edit .firebaserc and set your actual Firebase project ID

npm run install:all

# Client env — from Firebase Console > Project Settings > Your apps > Web app
cp client/.env.example client/.env
# fill in the VITE_FIREBASE_* values

# Run everything locally against the emulator suite
npm run emulators        # Firestore, Auth, Functions, Storage, Hosting, Emulator UI
npm run client:dev       # in a second terminal — http://localhost:5173
```

The client auto-connects to the emulators in dev
(`VITE_USE_EMULATORS` in `client/.env`, defaults to `true`). Emulator UI is
at `http://localhost:4000` once `firebase emulators:start` is running,
showing Firestore data, Auth users, and function logs live.

### Bootstrap the first Master Admin

```bash
npm run functions:build
GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account.json \
  node functions/lib/scripts/bootstrapMasterAdmin.js you@yourorg.com
```

### Deploy

```bash
firebase deploy --only firestore:rules,storage:rules,functions,hosting
```

## What's built so far

- `functions/src/config` — Admin SDK singleton, Firestore collection name
  registry, shared domain types.
- `functions/src/lib` — `rbac.ts` (auth/tenant/role guards), `errors.ts`
  (HttpsError wrapper with stable `code` strings), `requestId.ts` (REQ-XXXXXXXX
  tracing IDs threaded through audit logs).
- `functions/src/modules/audit`, `modules/security` — the two logging
  services every future module calls into.
- `functions/src/modules/auth` — `registerOrganization` and `getMe` callables.
- `client/src/lib/firebase.ts` — SDK init + emulator auto-connect.
- `client/src/lib/api.ts` — typed wrappers around the callables.
- `client/src/context/AuthContext.tsx` — Firebase Auth state + resolved
  profile (memberships, platform role).
- `client/src/components/RouteGuards.tsx` — `RequireAuth`,
  `RequirePlatformAdmin`.
- Pages: landing, register (org onboarding), login, dashboard shell.

Both `functions` (`npx tsc --noEmit`) and `client` (`npm run build`)
typecheck and build clean.

## Roadmap — next phases

1. **Programmes module**: stepper-backed CRUD, slug generation, state
   machine (`DRAFT → SCHEDULED → REGISTRATION_OPEN → ACTIVE → COMPLETED`),
   Cloud Scheduler-backed function for server-authoritative countdown
   completion (Firebase's equivalent of a server-side worker).
2. **Public registration + attendance**: registration form engine driven by
   `programmeFields`, QR token issuance (`qrcode` package, already installed
   in `functions`), the three check-in methods, duplicate check-in
   protection (enforced via a deterministic Firestore doc ID:
   `${sessionId}_${registrationId}`, mirroring the unique-constraint trick
   used for org memberships).
3. **Automation engine + reporting**: Firestore-triggered functions
   (`onDocumentUpdated` on programme state changes) driving
   `finalize attendance → analytics → report → eligibility → credential
   issuance`, backed by an `automationJobs` collection.
4. **Credentials + verification**: canonicalization → SHA-256 → server-side
   HMAC/asymmetric signing (secret via Firebase Secret Manager, never in
   client code) → public `verifyCredential` HTTPS function → revocation flow.
5. **Apex Control Center**: `/admin/*` React routes + matching callables —
   org oversight, audit explorer, security dashboard, job monitor, system
   health.
6. **Frontend build-out**: programme stepper, participant tables, QR
   scanner (attendance), credential template upload + placeholder overlay,
   analytics charts (Recharts).

Tell me which phase to build next.
