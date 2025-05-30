import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9OtVgaginS96yDwZ7ItdUmi_rUO6seoc",
  authDomain: "propertymanagement-bca68.firebaseapp.com",
  projectId: "propertymanagement-bca68",
  storageBucket: "propertymanagement-bca68.firebasestorage.app",
  messagingSenderId: "825250569534",
  appId: "1:825250569534:web:320b662dc6603af1f4a06f",
  measurementId: "G-3ZRF6W7VDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;

// Initialize Analytics only in production
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export the Firebase services
export { app, auth, analytics, RecaptchaVerifier };
export default app;
