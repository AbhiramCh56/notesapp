import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Import deleteDoc and doc

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAhEBDy1WuOEz02hSX19KdORPO1qpWCN44",
  authDomain: "notes-6e481.firebaseapp.com",
  projectId: "notes-6e481",
  storageBucket: "notes-6e481.firebasestorage.app",
  messagingSenderId: "232719025748",
  appId: "1:232719025748:web:fb6bb342a3a19a9e184fc1",
  measurementId: "G-FM3CJMV10K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase Auth and Firestore functions
export {
  auth,
  db,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // Removed duplicate
  sendPasswordResetEmail,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc, // Export doc as well to use it with deleteDoc
};
