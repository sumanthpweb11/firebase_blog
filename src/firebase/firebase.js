import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlzBrvpHbhA4AOo_i0wWbA9ybw2C4E3p0",
  authDomain: "react-firebase-blog-6c2eb.firebaseapp.com",
  projectId: "react-firebase-blog-6c2eb",
  storageBucket: "react-firebase-blog-6c2eb.appspot.com",
  messagingSenderId: "5839204470",
  appId: "1:5839204470:web:5e892cb669367298d66f57",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
