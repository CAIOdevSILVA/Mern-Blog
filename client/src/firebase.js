// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2df23.firebaseapp.com",
  projectId: "mern-blog-2df23",
  storageBucket: "mern-blog-2df23.appspot.com",
  messagingSenderId: "953404315633",
  appId: "1:953404315633:web:c53810f7c9a4085267d650"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);