import { db } from "../config/firebase.js";
import { Collections } from "../config/collections.js";
import { Errors } from "./errors.js";
import { logSecurityEvent } from "../modules/security/security.service.js";
/** Confirms the request carries a Firebase Auth token and returns the uid/email. */
export function requireAuth(req) {
    if (!req.auth) {
        throw Errors.unauthenticated();
    }
    return {
        uid: req.auth.uid,
        email: req.auth.token.email ?? "",
        platformRole: req.auth.token.platformRole,
    };
}
export function requirePlatformAdmin(req) {
    const user = requireAuth(req);
    if (!user.platformRole) {
        void logSecurityEvent({
            eventType: "UNAUTHORIZED_REQUEST",
            severity: "HIGH",
            userId: user.uid,
            metadata: { reason: "platform_admin_required" },
        });
        throw Errors.forbidden("Apex platform admin access required.");
    }
    return user;
}
/**
 * Tenant isolation choke point. Looks up the caller's membership doc for
 * the target organization directly (not from a custom claim, which can go
 * stale) and throws FORBIDDEN if none exists. Every org-scoped callable
 * must go through this before touching Firestore.
 */
export async function requireOrgMembership(req, organizationId) {
    const user = requireAuth(req);
    const membershipId = `${organizationId}_${user.uid}`;
    const snap = await db.collection(Collections.organizationMembers).doc(membershipId).get();
    if (!snap.exists) {
        void logSecurityEvent({
            eventType: "UNAUTHORIZED_REQUEST",
            severity: "HIGH",
            userId: user.uid,
            organizationId,
            metadata: { reason: "no_membership_for_org" },
        });
        throw Errors.forbidden("You do not have access to this organization.");
    }
    const role = snap.get("role");
    return { user, role };
}
export function assertOrgRole(role, allowed, context) {
    if (!allowed.includes(role)) {
        void logSecurityEvent({
            eventType: "PERMISSION_DENIED",
            severity: "MEDIUM",
            userId: context.uid,
            organizationId: context.organizationId,
            metadata: { requiredRoles: allowed, actualRole: role },
        });
        throw Errors.forbidden("Insufficient permissions for this action.");
    }
}
//# sourceMappingURL=rbac.js.map