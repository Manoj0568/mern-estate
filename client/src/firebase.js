// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d424b.firebaseapp.com",
  projectId: "mern-estate-d424b",
  storageBucket: "mern-estate-d424b.appspot.com",
  messagingSenderId: "264776152203",
  appId: "1:264776152203:web:37b992158a589ee71b508e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);