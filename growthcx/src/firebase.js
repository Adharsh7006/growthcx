import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDxf4R-9Zy-n2X8uOZ2QlAvwF8pJVTJRJI",
    authDomain: "fir-login-acef9.firebaseapp.com",
    projectId: "fir-login-acef9",
    storageBucket: "fir-login-acef9.appspot.com",
    messagingSenderId: "1036027928804",
    appId: "1:1036027928804:web:58ff4f628618ed5a9a0cf1",
    measurementId: "G-QMPBQML2TP"
  };
  const app=initializeApp(firebaseConfig)
  const auth=getAuth()
  const db=getFirestore(app)
  export {app,auth,db}