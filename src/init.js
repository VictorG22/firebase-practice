// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ8pPq3ILHLStpRNN7zL1_WakuF22crzQ",
  authDomain: "fir-practice-8acef.firebaseapp.com",
  projectId: "fir-practice-8acef",
  storageBucket: "fir-practice-8acef.firebasestorage.app",
  messagingSenderId: "86746902597",
  appId: "1:86746902597:web:d9152603734cd5cfeaf32c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();