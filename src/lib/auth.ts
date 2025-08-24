
'use client';

import { 
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider);
};

export const signOut = async () => {
  try {
      await firebaseSignOut(auth);
  } catch (error) {
      console.error("Error signing out:", error);
  }
}
