import { db, FieldValue } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import { logger } from "firebase-functions/v2";
/**
 * Writes an audit log entry. Never throws — a failure to log must not break
 * the primary business operation, but it's surfaced in Cloud Function logs
 * so it isn't silent.
 */
export async function logAudit(params) {
    try {
        await db.collection(Collections.auditLogs).add({
            ...params,
            createdAt: FieldValue.serverTimestamp(),
        });
    }
    catch (err) {
        logger.error("Failed to write audit log", { err, params });
    }
}
/** Convenience wrapper for actions performed by the automation engine. */
export function logSystemAudit(params) {
    return logAudit({ ...params, actorType: "SYSTEM", actorRole: "Apex Automation Engine" });
}
//# sourceMappingURL=audit.service.js.map