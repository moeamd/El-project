// firebase.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPa1OC6LZGybNrCHg3z5X4IYvnNZOUovM",
  authDomain: "react-project-71613.firebaseapp.com",
  projectId: "react-project-71613",
  storageBucket: "react-project-71613.appspot.com",
  messagingSenderId: "723934840527",
  appId: "1:723934840527:web:0a22738c3343354fb419ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export everything you may need
export {
  app,
  db,
  auth,
  storage,
  // Firestore
  collection, getDocs, addDoc, setDoc, updateDoc, deleteDoc, doc,
  // Auth
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendEmailVerification, updateProfile, signOut, onAuthStateChanged,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  GithubAuthProvider, updatePassword, sendPasswordResetEmail,
  // Storage
  ref, uploadBytes, getDownloadURL, deleteObject
};
