import { onCall } from "firebase-functions/v2/https";
import { db } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import { requireAuth } from "../../lib/rbac.js";
import { Errors } from "../../lib/errors.js";
import { newRequestId } from "../../lib/requestId.js";
import { registerOrganizationSchema } from "./auth.schemas.js";
import { registerOrganization } from "./auth.service.js";
/**
 * Called immediately after the client creates a Firebase Auth account
 * (email+password) for a new organization signup. Requires the caller to
 * already be authenticated (i.e. called right after createUserWithEmailAndPassword).
 */
export const registerOrganizationFn = onCall(async (req) => {
    const requestId = newRequestId();
    const user = requireAuth(req);
    const input = registerOrganizationSchema.parse(req.data);
    const result = await registerOrganization(input, {
        uid: user.uid,
        email: user.email,
        requestId,
    });
    return { success: true, data: result, requestId };
});
/**
 * Returns the caller's profile plus all organization memberships, so the
 * client can render the right portal (org dashboard vs Apex Control Center)
 * without guessing from custom claims alone.
 */
export const getMeFn = onCall(async (req) => {
    const user = requireAuth(req);
    const userSnap = await db.collection(Collections.users).doc(user.uid).get();
    if (!userSnap.exists) {
        throw Errors.notFound("User profile not found.");
    }
    const membershipsSnap = await db
        .collection(Collections.organizationMembers)
        .where("userId", "==", user.uid)
        .get();
    const memberships = membershipsSnap.docs.map((d) => ({
        organizationId: d.get("organizationId"),
        role: d.get("role"),
    }));
    return {
        success: true,
        data: {
            uid: user.uid,
            email: userSnap.get("email"),
            fullName: userSnap.get("fullName"),
            platformRole: user.platformRole ?? null,
            memberships,
        },
    };
});
//# sourceMappingURL=auth.functions.js.map