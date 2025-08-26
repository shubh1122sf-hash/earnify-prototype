
'use client';

import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    // This function doesn't return a user directly.
    // It redirects the page to Google's sign-in page.
    await signInWithRedirect(auth, provider);
    // No error object is needed here as errors are handled by getRedirectResult
  } catch (error: any) {
    console.error("Error initiating redirect sign-in:", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
