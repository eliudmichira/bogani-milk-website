// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVx2m7wHYqZO6h5tlepAU6tYfEsrQF4KM",
  authDomain: "bogani.firebaseapp.com",
  projectId: "bogani",
  storageBucket: "bogani.appspot.com",
  messagingSenderId: "194724932476",
  appId: "1:194724932476:web:efb8ade8750a09d45952f9",
  measurementId: "G-BMHRYW03D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 