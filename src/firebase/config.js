// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQFQYBRbPoZQAPlc2DH9Gdo3MO8LyT96A",
  authDomain: "chat-realtime-82f91.firebaseapp.com",
  projectId: "chat-realtime-82f91",
  storageBucket: "chat-realtime-82f91.appspot.com",
  messagingSenderId: "170948443767",
  appId: "1:170948443767:web:91b0eab5fa8591e0d39072",
  measurementId: "G-L1XZ9C5V70",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

const analytics = getAnalytics(app);
const db = app.firestore();
export { db, auth };
export default firebase;
