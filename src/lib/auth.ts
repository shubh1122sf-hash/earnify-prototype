'use client';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    // We are switching back to signInWithPopup as the redirect flow is proving
    // too complex and error-prone in this specific i-frame environment.
    // The previous issues with domain authorization should now be resolved,
    // making this the more reliable method.
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    // This will help diagnose issues like "auth/popup-closed-by-user"
    // or network errors.
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
