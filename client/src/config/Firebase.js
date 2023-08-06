// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZAnJNI3kgCZ1RfYuujUvh7MuS4EcBMPM",
  authDomain: "fashion-web-store.firebaseapp.com",
  projectId: "fashion-web-store",
  storageBucket: "fashion-web-store.appspot.com",
  messagingSenderId: "413336123878",
  appId: "1:413336123878:web:606bc80fbc1e602563fe27",
  measurementId: "LWH9YHR7QW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }