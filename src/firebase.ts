import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8p2wapITdBNoaBmIM9-Q0nQnYzcewwQI",
  authDomain: "book-library-9354e.firebaseapp.com",
  projectId: "book-library-9354e",
  storageBucket: "book-library-9354e.appspot.com",
  messagingSenderId: "779831543145",
  appId: "1:779831543145:web:6eaaea084fe0977f1e69f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);