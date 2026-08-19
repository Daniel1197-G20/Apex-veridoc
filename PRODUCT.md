# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Organization Owners & Administrators**: Educational institutions (Universities, Schools), Companies, NGOs, Training Organizations, and Conference Organizers managing multi-cohort programmes, tracking attendance, analyzing demographic metrics, and issuing accredited certificates.
2. **Programme Coordinators / Staff**: Day-to-day operators responsible for managing participant rosters, launching sessions, taking real-time attendance (QR code scan, pin, or roster check), and triggering credential issuance.
3. **Participants & Credential Holders**: Learners and attendees registering for programmes, checking into live sessions, and accessing tamper-proof digital credentials and badges.
4. **Third-Party Verifiers**: Employers, academic reviewers, and the public scanning QR codes or entering credential IDs to verify authenticity on the cryptographic verification portal.
5. **Apex Master Admins**: Platform operators managing tenant organizations, system health, audit logs, and security telemetry.

## Product Purpose

Apex Veridoc eliminates fragmented event and credential management by consolidating participant registration, live multi-method attendance tracking, demographic reporting, and cryptographically signed digital credentials into a unified multi-tenant platform. Success means zero duplicate check-ins, instant automated reporting, and 100% verifiable tamper-proof certificates without relying on paper or vulnerable PDF exports.

## Positioning

Unlike generic event tools (e.g. Eventbrite) or isolated credential engines (e.g. Credly), Apex Veridoc bridges the entire lifecycle: from custom-field registration and live multi-session attendance gating to server-authoritative SHA-256 HMAC cryptographic credential generation with instant public QR verification.

## Operating Context

- High-throughput check-ins during live events (mobile camera QR scanning, self check-in kiosks, manual coordinator override).
- Strict multi-tenant data isolation where organizations never cross-pollinate participant data or certificates.
- Automated eligibility pipelines (e.g. participant attended ≥ 80% of sessions → automatically qualify and issue certificate).
- Responsive web accessibility across desktop control dashboards, tablet registration stations, and mobile attendee devices.

## Capabilities and Constraints

- **Tenant Isolation**: Cloud Functions Admin SDK choke point (`requireOrgMembership`) with zero client-side Firestore access rules.
- **Attendance Engine**: Multi-mode check-in (Scanner QR, Session PIN, Roster Toggle) with deterministic deduplication (`${sessionId}_${registrationId}`).
- **Verifiable Credentials**: Cryptographic signature (SHA-256 HMAC / asymmetric signing) embedded in QR codes with instant public lookup (`/verify/:credentialId`).
- **Demographic & Analytics Reporting**: Cohort completion rates, attendance breakdowns, and exportable audit records.
- **Audit & Security Telemetry**: REQ-XXXXXXXX traceable audit logs, security event triggers, and system automation job tracking.

## Brand Commitments

- **Name**: Apex Veridoc
- **Visual Tone**: Precision, authority, high-trust cryptographic rigor, and modern dark-mode clarity.
- **Palette Direction**: Deep slate/charcoal foundations (`slate-950`/`slate-900`), crisp typography, precision borders (`slate-800`), vibrant cobalt/indigo accents (`indigo-500`/`indigo-400`), emerald verification states, and amber alerts.

## Evidence on Hand

- Fully functioning Firebase Emulators (Firestore, Auth, Functions, Storage).
- Production-ready Cloud Functions backend structure with RBAC, audit logging, and transactional organization registration.
- Active React + Vite + Tailwind CSS v4 frontend stack.

## Product Principles

1. **Cryptographic Integrity by Default**: Every credential, log, and attendance event is verifiable, immutable, and trace-backed.
2. **Speed in the Field**: Attendance workflows and scanner interfaces must operate with sub-second response times in high-traffic event scenarios.
3. **Absolute Tenant Partitioning**: Zero multi-tenant data leakage; every action is checked against authoritative server-side membership.
4. **Actionable Analytics**: Surface meaningful cohort progression and attendance velocity rather than vanity metrics.
5. **Frictionless Verification**: Anyone with a smartphone camera can instantly verify a certificate's authenticity without logging in or downloading an app.
