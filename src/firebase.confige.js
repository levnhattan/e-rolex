import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0lUyu9YpWx9F7t2AVpD8hT901s_S_OUw",
  authDomain: "commerce-rolex.firebaseapp.com",
  projectId: "commerce-rolex",
  storageBucket: "commerce-rolex.appspot.com",
  messagingSenderId: "443190607129",
  appId: "1:443190607129:web:2436e74cda1d8b29a25988"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage = getStorage(app);

export default app;