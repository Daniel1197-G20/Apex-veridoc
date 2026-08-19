import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

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

export interface RegisterOrganizationInput {
  organizationName: string;
  organizationType: OrganizationType;
  country: string;
  phone?: string;
  administratorName: string;
}

export interface Membership {
  organizationId: string;
  role: string;
}

export interface MeResponse {
  uid: string;
  email: string;
  fullName: string;
  platformRole: string | null;
  memberships: Membership[];
}

const registerOrganizationCallable = httpsCallable<RegisterOrganizationInput, { organizationId: string }>(
  functions,
  "registerOrganization",
);

const getMeCallable = httpsCallable<void, MeResponse>(functions, "getMe");

export async function registerOrganization(input: RegisterOrganizationInput) {
  const res = await registerOrganizationCallable(input);
  return res.data;
}

export async function getMe() {
  const res = await getMeCallable();
  return res.data;
}
