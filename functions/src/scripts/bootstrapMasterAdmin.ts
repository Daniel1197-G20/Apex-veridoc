/**
 * Bootstraps the first APEX_MASTER_ADMIN. Intentionally NOT a callable
 * function — the spec explicitly forbids a hidden bypass credential or
 * self-serve path to platform-admin power (see section 46 of the build
 * spec). Run this manually, locally, with a service account key that has
 * Firebase Admin access:
 *
 *   npm run build
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json \
 *     node lib/scripts/bootstrapMasterAdmin.js someone@yourorg.com
 *
 * The target user must already have a Firebase Auth account (create one via
 * the Firebase console or `firebase auth:import` first).
 */
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const auth = getAuth();
const db = getFirestore();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node bootstrapMasterAdmin.js <email>");
    process.exit(1);
  }

  const user = await auth.getUserByEmail(email);

  await auth.setCustomUserClaims(user.uid, { platformRole: "APEX_MASTER_ADMIN" });

  await db.collection("users").doc(user.uid).set(
    {
      email,
      platformRole: "APEX_MASTER_ADMIN",
      isActive: true,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  console.log(`${email} (${user.uid}) is now APEX_MASTER_ADMIN.`);
  console.log("They must sign out and back in for the new custom claim to take effect.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
