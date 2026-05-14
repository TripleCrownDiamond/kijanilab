import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  email: string;
  role: "admin" | "user";
  displayName: string;
};

export type TrainingRecord = {
  id: string;
  title: string;
  format: string;
  duration: string;
  level: string;
  createdAt?: unknown;
};

const requireDb = () => {
  if (!firebaseEnabled || !db) {
    throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables.");
  }
  return db;
};

export const upsertUserProfile = async (profile: UserProfile) => {
  const firestore = requireDb();
  await setDoc(
    doc(firestore, "users", profile.uid),
    {
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const getUserProfile = async (uid: string) => {
  const firestore = requireDb();
  const snapshot = await getDoc(doc(firestore, "users", uid));
  if (!snapshot.exists()) {
    return null;
  }
  return snapshot.data() as UserProfile;
};

export const fetchTrainings = async () => {
  const firestore = requireDb();
  const collectionRef = collection(firestore, "trainings");
  const snapshot = await getDocs(query(collectionRef, orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<TrainingRecord, "id">),
  }));
};

export const addTraining = async (payload: Omit<TrainingRecord, "id" | "createdAt">) => {
  const firestore = requireDb();
  await addDoc(collection(firestore, "trainings"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};
