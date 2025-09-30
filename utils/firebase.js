// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_APIKEY  ,
  authDomain: "loginlms-ee65e.firebaseapp.com",
  projectId: "loginlms-ee65e",
  storageBucket: "loginlms-ee65e.firebasestorage.app",
  messagingSenderId: "984623549299",
  appId: "1:984623549299:web:51c3d5f03b4a2063219306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}