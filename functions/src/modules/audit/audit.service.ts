import { db, FieldValue } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import type { ActorType, LogResult } from "../../lib/types.js";
import { logger } from "firebase-functions/v2";

interface AuditParams {
  requestId?: string;
  actorId?: string;
  actorType: ActorType;
  actorRole?: string;
  organizationId?: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  result: LogResult;
  metadata?: Record<string, unknown>;
}

/**
 * Writes an audit log entry. Never throws — a failure to log must not break
 * the primary business operation, but it's surfaced in Cloud Function logs
 * so it isn't silent.
 */
export async function logAudit(params: AuditParams): Promise<void> {
  try {
    await db.collection(Collections.auditLogs).add({
      ...params,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    logger.error("Failed to write audit log", { err, params });
  }
}

/** Convenience wrapper for actions performed by the automation engine. */
export function logSystemAudit(
  params: Omit<AuditParams, "actorType" | "actorId" | "actorRole">,
): Promise<void> {
  return logAudit({ ...params, actorType: "SYSTEM", actorRole: "Apex Automation Engine" });
}
