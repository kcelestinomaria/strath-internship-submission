// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTJAjeK7l7rbJrfKapkh9qOdL1Kgghte4",
  authDomain: "strath-intern-project.firebaseapp.com",
  projectId: "strath-intern-project",
  storageBucket: "strath-intern-project.appspot.com",
  messagingSenderId: "700482239655",
  appId: "1:700482239655:web:c26941dd6f953c4b162f82",
  measurementId: "G-GEZL0T0HL9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// export const storage = getStorage(app);
//export const database = getFirestore(app);