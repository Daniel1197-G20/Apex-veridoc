export type PlatformRole = "APEX_MASTER_ADMIN" | "APEX_SUPPORT_ADMIN";

export type OrgRole =
  | "ORGANIZATION_OWNER"
  | "ORGANIZATION_ADMIN"
  | "FACILITATOR"
  | "ORGANIZATION_VIEWER";

export type ActorType =
  | PlatformRole
  | OrgRole
  | "PARTICIPANT"
  | "PUBLIC_VERIFIER"
  | "SYSTEM";

export type OrganizationType =
  | "UNIVERSITY"
  | "SCHOOL"
  | "COMPANY"
  | "NGO"
  | "CHURCH"
  | "TRAINING_ORGANIZATION"
  | "PROFESSIONAL_BODY"
  | "CONFERENCE_ORGANIZER"
  | "OTHER";

export type OrganizationStatus = "ACTIVE" | "SUSPENDED";

export type ProgrammeState =
  | "DRAFT"
  | "SCHEDULED"
  | "REGISTRATION_OPEN"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "ARCHIVED";

export type CredentialMode = "NONE" | "OPTIONAL" | "REQUIRED";

export type CredentialStatus = "ACTIVE" | "SUSPENDED" | "REVOKED" | "EXPIRED";

export type LogResult = "SUCCESS" | "FAILURE" | "PARTIAL_SUCCESS";

export interface OrganizationDoc {
  name: string;
  type: OrganizationType;
  country: string;
  email: string;
  phone?: string;
  status: OrganizationStatus;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface UserDoc {
  email: string;
  fullName: string;
  platformRole?: PlatformRole;
  isActive: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface OrganizationMemberDoc {
  organizationId: string;
  userId: string;
  role: OrgRole;
  createdAt: FirebaseFirestore.Timestamp;
}
