import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVxVwD5jFOhCFQRo4Bwyh8v62bnI_c8Es",
    authDomain: "pentharas.firebaseapp.com",
    projectId: "pentharas",
    storageBucket: "pentharas.firebasestorage.app",
    messagingSenderId: "885613642615",
    appId: "1:885613642615:web:4c6af4c6438a1b0bf39772",
    measurementId: "G-10V59F0D4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth services for use in components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
