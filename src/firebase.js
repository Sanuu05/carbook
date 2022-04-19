// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbgtFLhQFnqQT4SZcQh_85Qkh49DUvBAo",
  authDomain: "card-8a0c1.firebaseapp.com",
  projectId: "card-8a0c1",
  storageBucket: "card-8a0c1.appspot.com",
  messagingSenderId: "424208404687",
  appId: "1:424208404687:web:e7f7e03cac9358525ba7ba",
  measurementId: "G-BMZZKL7FHX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);