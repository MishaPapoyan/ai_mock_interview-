import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getApps, initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPVD3zD6Vl2602r880OQ_Cbp3aQpEc318",
    authDomain: "prepwise-fad3f.firebaseapp.com",
    projectId: "prepwise-fad3f",
    storageBucket: "prepwise-fad3f.firebasestorage.app",
    messagingSenderId: "932438856882",
    appId: "1:932438856882:web:9378c9354cd3ada766e5ab",
    measurementId: "G-670DXQZ9DG"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApps();
export const auth = getAuth(app)
export const db = getFirestore(app)