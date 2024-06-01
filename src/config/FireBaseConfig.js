// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd-kNYd1GyCAULELhH3EgZpZHdcecrpu4",
  authDomain: "asper-80dfa.firebaseapp.com",
  projectId: "asper-80dfa",
  storageBucket: "asper-80dfa.appspot.com",
  messagingSenderId: "569497786789",
  appId: "1:569497786789:web:1f6e9548a4803b72ec304c",
  measurementId: "G-KCXJ66S24Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)


export { db };