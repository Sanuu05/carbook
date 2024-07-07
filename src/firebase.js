// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFQWRnXYRIA1nifvlILVVWBOBIXTV8wok",
  authDomain: "cariva-d0014.firebaseapp.com",
  projectId: "cariva-d0014",
  storageBucket: "cariva-d0014.appspot.com",
  messagingSenderId: "764894151759",
  appId: "1:764894151759:web:e3b8a4d337eca08aeed63a",
  measurementId: "G-RWNW0EP7LP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);