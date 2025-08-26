
'use client';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  getAuth,
} from 'firebase/auth';
import { app } from './firebase';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    // This allows the popup to work correctly in the preview iframe
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Error signing in with Google popup:", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
