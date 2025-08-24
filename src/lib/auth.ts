
'use client';

import { 
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error during sign-in redirect:", error);
    throw error;
  }
};

export const handleRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            return result.user;
        }
        return null;
    } catch (error) {
        console.error("Error handling redirect result:", error);
        return null;
    }
}

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
}
