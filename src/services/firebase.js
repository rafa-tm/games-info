import { initializeApp } from "firebase/app";
import {
    browserSessionPersistence,
    //connectAuthEmulator, 
    getAuth,
    setPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAytg2MdD5YC9cZvUg3yCIbS0QfhLYos6M",
    authDomain: "helpful-cipher-381400.firebaseapp.com",
    projectId: "helpful-cipher-381400",
    storageBucket: "helpful-cipher-381400.appspot.com",
    messagingSenderId: "31260638605",
    appId: "1:31260638605:web:6daf5d7c3d1f828ac091c4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099");
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(firebaseApp);