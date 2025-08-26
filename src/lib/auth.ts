
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
    // Using signInWithPopup to avoid iframe restrictions
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Error signing in with Google popup:", error);
    // Handle specific errors, like popup closed by user
    if (error.code === 'auth/popup-closed-by-user') {
      // You can optionally show a message to the user
    }
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
