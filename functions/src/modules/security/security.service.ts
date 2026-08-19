import { db, FieldValue } from "../../config/firebase.js";
import { Collections } from "../../config/collections.js";
import { logger } from "firebase-functions/v2";

type SecurityEventType =
  | "FAILED_LOGIN"
  | "RATE_LIMIT_TRIGGERED"
  | "UNAUTHORIZED_REQUEST"
  | "PERMISSION_DENIED"
  | "INVALID_SESSION"
  | "SUSPICIOUS_ACCESS"
  | "PASSWORD_RESET_REQUESTED"
  | "ACCOUNT_LOCKOUT";

interface SecurityEventParams {
  requestId?: string;
  eventType: SecurityEventType;
  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  userId?: string;
  organizationId?: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

/** Never throws — logging failures must not break the request in flight. */
export async function logSecurityEvent(params: SecurityEventParams): Promise<void> {
  try {
    await db.collection(Collections.securityLogs).add({
      ...params,
      severity: params.severity ?? "LOW",
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    logger.error("Failed to write security log", { err, params });
  }
}
