// client.ts
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {FirebaseApp, getApp, getApps, initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDPVD3zD6Vl2602r880OQ_Cbp3aQpEc318",
    authDomain: "prepwise-fad3f.firebaseapp.com",
    projectId: "prepwise-fad3f",
    storageBucket: "prepwise-fad3f.appspot.com",
    messagingSenderId: "932438856882",
    appId: "1:932438856882:web:9378c9354cd3ada766e5ab",
    measurementId: "G-670DXQZ9DG",
};

let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export const clientAuth = getAuth(app);
export const clientDb = getFirestore(app);
