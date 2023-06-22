import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLjrDnDllJz2FVK-XJIRqzaoFudDS7y0M",
  authDomain: "fir-test-3821e.firebaseapp.com",
  projectId: "fir-test-3821e",
  storageBucket: "fir-test-3821e.appspot.com",
  messagingSenderId: "968985338681",
  appId: "1:968985338681:web:5864176d511741bd137ee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;