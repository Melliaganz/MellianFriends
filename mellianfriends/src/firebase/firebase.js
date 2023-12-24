// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAGcgHz3SCfY4Wr-FqZg8a-LqVCHvcEcI",
  authDomain: "mellianfriends-2cd39.firebaseapp.com",
  projectId: "mellianfriends-2cd39",
  storageBucket: "mellianfriends-2cd39.appspot.com",
  messagingSenderId: "851873891051",
  appId: "1:851873891051:web:9388d467059f1324caf4ae",
  measurementId: "G-KV76YBG0ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
