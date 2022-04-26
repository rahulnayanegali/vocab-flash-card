// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWpMKuyGKOeO9lIN2nQJkBngtH31Mnvso",
  authDomain: "vocab-flash-card-40223.firebaseapp.com",
  projectId: "vocab-flash-card-40223",
  storageBucket: "vocab-flash-card-40223.appspot.com",
  messagingSenderId: "148517469668",
  appId: "1:148517469668:web:73cd8ec29c37c544631bf1",
  measurementId: "G-GHBD93VKFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);