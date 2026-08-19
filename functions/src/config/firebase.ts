import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

if (getApps().length === 0) {
  initializeApp();
}

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export { FieldValue, Timestamp };

// Firestore ignores `undefined` fields by default in the JS SDK, but we set
// this explicitly so accidental undefined writes fail loudly in dev rather
// than silently dropping a field in prod.
db.settings({ ignoreUndefinedProperties: false });
