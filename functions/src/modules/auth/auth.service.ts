import { db, auth, FieldValue } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import { Errors } from "../../lib/errors.js";
import { logAudit } from "../audit/audit.service.js";
import type { RegisterOrganizationInput } from "./auth.schemas.js";

interface Ctx {
  uid: string;
  email: string;
  requestId: string;
}

export async function registerOrganization(input: RegisterOrganizationInput, ctx: Ctx) {
  const userRef = db.collection(Collections.users).doc(ctx.uid);
  const orgRef = db.collection(Collections.organizations).doc();
  const membershipRef = db.collection(Collections.organizationMembers).doc(`${orgRef.id}_${ctx.uid}`);

  await db.runTransaction(async (tx) => {
    const existingUser = await tx.get(userRef);
    if (existingUser.exists) {
      // This uid has already completed onboarding — don't let a retried
      // client call spin up a second organization for the same account.
      throw Errors.conflict("This account has already completed organization setup.");
    }

    const now = FieldValue.serverTimestamp();

    tx.set(orgRef, {
      name: input.organizationName,
      type: input.organizationType,
      country: input.country,
      email: ctx.email,
      phone: input.phone ?? null,
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });

    tx.set(userRef, {
      email: ctx.email,
      fullName: input.administratorName,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    tx.set(membershipRef, {
      organizationId: orgRef.id,
      userId: ctx.uid,
      role: "ORGANIZATION_OWNER",
      createdAt: now,
    });
  });

  // Custom claims give the client an immediate, cheap way to know "does this
  // user belong to at least one org" without a Firestore read on every page
  // load. The membership doc (checked in rbac.ts) remains the source of
  // truth for authorization — claims are a UX convenience, never trusted
  // for access control decisions server-side beyond platformRole.
  await auth.setCustomUserClaims(ctx.uid, { primaryOrganizationId: orgRef.id });

  await logAudit({
    requestId: ctx.requestId,
    actorId: ctx.uid,
    actorType: "ORGANIZATION_OWNER",
    organizationId: orgRef.id,
    action: "ORGANIZATION_CREATED",
    resourceType: "Organization",
    resourceId: orgRef.id,
    result: "SUCCESS",
  });

  return { organizationId: orgRef.id };
}
