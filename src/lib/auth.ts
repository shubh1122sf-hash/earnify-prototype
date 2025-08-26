
'use client';

import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSignOut,
  getAuth,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error: any) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
