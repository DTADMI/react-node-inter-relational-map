// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import env from "react-dotenv";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: env.REACT_FIREBASE_API_KEY,
    authDomain: env.REACT_FIREBASE_AUTH_DOMAIN,
    projectId: env.REACT_FIREBASE_PROJECT_ID,
    storageBucket: env.REACT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.REACT_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.REACT_FIREBASE_APP_ID,
    measurementId: env.REACT_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
