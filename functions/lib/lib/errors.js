import { HttpsError } from "firebase-functions/v2/https";
/**
 * Thin wrapper so business logic can throw a domain error with a stable
 * `code` string (surfaced to the client in err.details.code) while still
 * mapping to a sane gRPC-style status for the callable transport.
 */
export class AppError extends HttpsError {
    constructor(code, message, status = "invalid-argument") {
        super(status, message, { code });
    }
}
export const Errors = {
    unauthenticated: (msg = "Authentication required.") => new AppError("UNAUTHENTICATED", msg, "unauthenticated"),
    forbidden: (msg = "You do not have permission to perform this action.") => new AppError("FORBIDDEN", msg, "permission-denied"),
    notFound: (msg = "Resource not found.") => new AppError("NOT_FOUND", msg, "not-found"),
    conflict: (msg) => new AppError("CONFLICT", msg, "already-exists"),
    validation: (msg) => new AppError("VALIDATION_ERROR", msg, "invalid-argument"),
};
//# sourceMappingURL=errors.js.map