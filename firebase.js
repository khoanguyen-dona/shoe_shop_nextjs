// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "adidas-shop-d0636.firebaseapp.com",
  projectId: "adidas-shop-d0636",
  storageBucket: "adidas-shop-d0636.appspot.com",
  messagingSenderId: "56922540944",
  appId: "1:56922540944:web:297d1375a527459b528115",
  measurementId: "G-WZQJ949WQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
// const analytics = getAnalytics(app);