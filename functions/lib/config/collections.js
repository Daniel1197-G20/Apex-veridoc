/**
 * Central registry of Firestore top-level collection names. Using constants
 * instead of raw strings everywhere avoids typos silently creating a new
 * collection.
 */
export const Collections = {
    users: "users",
    organizations: "organizations",
    organizationMembers: "organizationMembers",
    programmes: "programmes",
    programmeFields: "programmeFields",
    registrations: "registrations",
    attendanceSessions: "attendanceSessions",
    attendanceRecords: "attendanceRecords",
    credentialTemplates: "credentialTemplates",
    credentials: "credentials",
    credentialEvents: "credentialEvents",
    reports: "reports",
    exports: "exports",
    notifications: "notifications",
    auditLogs: "auditLogs",
    securityLogs: "securityLogs",
    systemEvents: "systemEvents",
    automationJobs: "automationJobs",
};
//# sourceMappingURL=collections.js.map