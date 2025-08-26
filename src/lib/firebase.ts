import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// This is a public configuration and is safe to expose.
// Security is enforced by Firebase Security Rules.
const firebaseConfig = {
  "projectId": "earnify-simulator",
  "appId": "1:175164373016:web:5344960ccd36dc98d4eb6d",
  "storageBucket": "earnify-simulator.firebasestorage.app",
  "apiKey": "AIzaSyCbMlgngCxOgTY8Qf-lnb4sIUD0-0gut0c",
  "authDomain": "earnify-simulator.firebaseapp.com",
  "messagingSenderId": "175164373016"
};

// Initialize Firebase and export instances
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
