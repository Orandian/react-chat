// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaC6nbkyTKSMRNv7AoKZcQyH3LXMVYUAA",
  authDomain: "fir-chat-5c6fb.firebaseapp.com",
  projectId: "fir-chat-5c6fb",
  storageBucket: "fir-chat-5c6fb.appspot.com",
  messagingSenderId: "388675293428",
  appId: "1:388675293428:web:96bd3eb73c981d49a90ea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with browser persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});

// Alternatively, you can use getAuth for simpler cases
// const auth = getAuth(app);
// auth.setPersistence(browserLocalPersistence);

const db = getFirestore(app);

const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");

export { auth, db, userRef, roomRef };
