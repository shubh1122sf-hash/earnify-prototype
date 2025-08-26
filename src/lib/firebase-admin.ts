import { getAuth } from 'firebase-admin/auth';
import { getApps, getApp, initializeApp, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

// Server-side Firebase Admin
const adminApp = (): App => {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    credential: credential.applicationDefault(),
  });
};

const adminAuth = () => getAuth(adminApp());

export { adminAuth };
