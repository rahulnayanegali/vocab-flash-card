import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDWpMKuyGKOeO9lIN2nQJkBngtH31Mnvso",
    authDomain: "vocab-flash-card-40223.firebaseapp.com",
    projectId: "vocab-flash-card-40223",
    storageBucket: "vocab-flash-card-40223.appspot.com",
    messagingSenderId: "148517469668",
    appId: "1:148517469668:web:73cd8ec29c37c544631bf1",
    measurementId: "G-GHBD93VKFQ"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}