
'use client';

import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    // signInWithRedirect will navigate the user to the Google sign-in page.
    // There is no return value to await here.
    await signInWithRedirect(auth, provider);
  } catch (error: any) {
    console.error("Error signing in with Google:", error.message);
    // You might want to show a toast or message to the user here.
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
