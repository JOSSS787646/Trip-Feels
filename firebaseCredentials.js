import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyntpXuHhmCESROsd7_L0gBX8u4eVIqig",
  authDomain: "tripfeels-ae5c7.firebaseapp.com",
  projectId: "tripfeels-ae5c7",
  storageBucket: "tripfeels-ae5c7.appspot.com",
  messagingSenderId: "216238387678",
  appId: "1:216238387678:web:04c505438ddf874aa1ad4f"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);