// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPCH6zBXs8pES1UpGFIXM66ZaJN50ZSUc",
  authDomain: "flightapp-365f5.firebaseapp.com",
  projectId: "flightapp-365f5",
  storageBucket: "flightapp-365f5.appspot.com",
  messagingSenderId: "847078310414",
  appId: "1:847078310414:web:b133642314141cd9e8725f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
