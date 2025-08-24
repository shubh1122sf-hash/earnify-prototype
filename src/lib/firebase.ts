
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "earnify-simulator",
  "appId": "1:175164373016:web:5344960ccd36dc98d4eb6d",
  "storageBucket": "earnify-simulator.firebasestorage.app",
  "apiKey": "AIzaSyCbMlgngCxOgTY8Qf-lnb4sIUD0-0gut0c",
  "authDomain": "earnify-simulator.firebaseapp.com",
  "messagingSenderId": "175164373016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
