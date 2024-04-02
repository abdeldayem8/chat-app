import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgWUM1ewFDcABvqf8W-jMrIvvgdM5Qcjc",
    authDomain: "chat-app-12f5c.firebaseapp.com",
    projectId: "chat-app-12f5c",
    storageBucket: "chat-app-12f5c.appspot.com",
    messagingSenderId: "540355744553",
    appId: "1:540355744553:web:ccd8b8549cb1194759dd38",
    measurementId: "G-E6FDYB2E6W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export  const auth= getAuth(app);
