import { db, FieldValue } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import { logger } from "firebase-functions/v2";
/** Never throws — logging failures must not break the request in flight. */
export async function logSecurityEvent(params) {
    try {
        await db.collection(Collections.securityLogs).add({
            ...params,
            severity: params.severity ?? "LOW",
            createdAt: FieldValue.serverTimestamp(),
        });
    }
    catch (err) {
        logger.error("Failed to write security log", { err, params });
    }
}
//# sourceMappingURL=security.service.js.map