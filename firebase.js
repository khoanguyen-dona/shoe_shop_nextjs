import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "adidas-shop-d0636.firebaseapp.com",
  projectId: "adidas-shop-d0636",
  storageBucket: "adidas-shop-d0636.appspot.com",
  messagingSenderId: "56922540944",
  appId: "1:56922540944:web:297d1375a527459b528115",
  measurementId: "G-WZQJ949WQH"
};

const app = initializeApp(firebaseConfig);

export default app

