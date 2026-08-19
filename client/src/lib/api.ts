import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";

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

export async function registerOrganization(
  input: RegisterOrganizationInput
): Promise<{ organizationId: string }> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be authenticated to register an organization.");
  }

  const uid = currentUser.uid;
  const email = currentUser.email || "";

  const userRef = doc(db, "users", uid);
  const orgCollection = collection(db, "organizations");
  const orgRef = doc(orgCollection);
  const membershipRef = doc(db, "organizationMembers", `${orgRef.id}_${uid}`);

  await runTransaction(db, async (tx) => {
    const existingUser = await tx.get(userRef);
    if (existingUser.exists()) {
      throw new Error("This account has already completed organization setup.");
    }

    const now = serverTimestamp();

    tx.set(orgRef, {
      name: input.organizationName,
      type: input.organizationType,
      country: input.country,
      email: email,
      phone: input.phone || null,
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });

    tx.set(userRef, {
      email: email,
      fullName: input.administratorName,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    tx.set(membershipRef, {
      organizationId: orgRef.id,
      userId: uid,
      role: "ORGANIZATION_OWNER",
      createdAt: now,
    });
  });

  return { organizationId: orgRef.id };
}

export async function getMe(): Promise<MeResponse> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User profile not found");
  }

  const userData = userSnap.data();

  const membersQuery = query(
    collection(db, "organizationMembers"),
    where("userId", "==", currentUser.uid)
  );
  const membersSnap = await getDocs(membersQuery);

  const memberships: Membership[] = membersSnap.docs.map((d) => ({
    organizationId: d.get("organizationId") as string,
    role: d.get("role") as string,
  }));

  return {
    uid: currentUser.uid,
    email: userData.email || currentUser.email || "",
    fullName: userData.fullName || "Administrator",
    platformRole: userData.platformRole || null,
    memberships,
  };
}
