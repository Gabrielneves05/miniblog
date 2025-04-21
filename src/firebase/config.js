import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIxLENQvxozbapDxHqBGMHD6x--hRAF-c",
  authDomain: "miniblog-a5afa.firebaseapp.com",
  projectId: "miniblog-a5afa",
  storageBucket: "miniblog-a5afa.firebasestorage.app",
  messagingSenderId: "211527648349",
  appId: "1:211527648349:web:3bfbeadc640da642f9b9b4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };