
'use client';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    // This can happen if the user closes the popup or due to other errors.
    console.error("Error during sign-in with popup:", error);
    // Alerting the user can be helpful for debugging in the preview environment.
    alert(`Sign-in failed. Check the console for details. Error: ${error.message}`);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
