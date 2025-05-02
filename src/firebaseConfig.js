// src/firebaseConfig.js - CORRECTED - Includes Firestore 'db' export
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,    // Needed by SignupLoginPage
    signOut,            // Needed by App for Navbar prop
    onAuthStateChanged  // Needed by App for listener
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <<< ADDED Firestore import BACK

// --- YOUR FIREBASE CONFIG OBJECT ---
// --- MAKE SURE THESE ARE CORRECT AND READ FROM .env ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// --- END READING variables ---

// Optional check
if (!firebaseConfig.apiKey) { console.error("CRITICAL ERROR: Firebase config not loaded!");}

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // <<< ADDED Firestore initialization BACK

console.log("Firebase App, Auth, Firestore Initialized");

// --- Export ALL necessary items INCLUDING db ---
export {
    auth,               // Auth service instance
    googleProvider,      // Google Provider instance
    signInWithPopup,     // Function for Google button
    signOut,             // Function for Sign Out button
    onAuthStateChanged,  // Function for Auth listener
    db                   // <<< ADDED Firestore instance export BACK
};