import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXYRkl35waTF00iOo79X0p4gmdxbei1gY",
  authDomain: "refit-ea6dd.firebaseapp.com",
  projectId: "refit-ea6dd",
  storageBucket: "refit-ea6dd.appspot.com",
  messagingSenderId: "301926229929",
  appId: "1:301926229929:web:e2a5a627ddcdf2eb4c46b8",
  measurementId: "G-MZPV027YNS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
