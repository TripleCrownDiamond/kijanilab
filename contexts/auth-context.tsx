"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, firebaseEnabled } from "@/lib/firebase";
import { getUserProfile, upsertUserProfile, type UserProfile } from "@/lib/firestore";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  firebaseEnabled: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const nextProfile = await getUserProfile(nextUser.uid);
        if (nextProfile) {
          setProfile(nextProfile);
        } else {
          const fallbackProfile: UserProfile = {
            uid: nextUser.uid,
            email: nextUser.email ?? "",
            displayName: nextUser.displayName ?? "Nouveau membre",
            role: "user",
          };
          await upsertUserProfile(fallbackProfile);
          setProfile(fallbackProfile);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      firebaseEnabled,
      login: async (email, password) => {
        if (!auth) {
          throw new Error("Firebase non configure");
        }
        await signInWithEmailAndPassword(auth, email, password);
      },
      register: async (name, email, password) => {
        if (!auth) {
          throw new Error("Firebase non configure");
        }
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        if (credentials.user) {
          await updateProfile(credentials.user, { displayName: name });
          await upsertUserProfile({
            uid: credentials.user.uid,
            email,
            displayName: name,
            role: "user",
          });
        }
      },
      logout: async () => {
        if (!auth) {
          throw new Error("Firebase non configure");
        }
        await signOut(auth);
      },
    }),
    [user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
