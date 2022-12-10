import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase, ref} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB0lUyu9YpWx9F7t2AVpD8hT901s_S_OUw",
  authDomain: "commerce-rolex.firebaseapp.com",
  projectId: "commerce-rolex",
  storageBucket: "commerce-rolex.appspot.com",
  messagingSenderId: "443190607129",
  appId: "1:443190607129:web:2436e74cda1d8b29a25988"
};

const app = initializeApp(firebaseConfig);
export const db =getDatabase();
export const auth = getAuth(app);
export default app;