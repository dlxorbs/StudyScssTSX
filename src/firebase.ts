import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY as string,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN as string,
    projectId: process.env.REACT_APP_FB_PROJECT_ID as string,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET as string,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID as string,
    appId: process.env.REACT_APP_FB_API_ID as string,
    databaseURL: "https://chatproject-d1bbc-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); // Storage 모듈 초기화
const auth = getAuth(app); // Authentication 모듈 초기화
const database = getDatabase(app);

export { app, db, storage, auth, database };
