


import firebase from"firebase/app"
//import { getStorage } from "firebase/storage";

//import * as firebase from 'firebase';


// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAiTV_auiA53DMRTSOQRPrBwbuhQ0c36L4",
    authDomain: "whiskey-business-36392.firebaseapp.com",
    projectId: "whiskey-business-36392",
    storageBucket: "whiskey-business-36392.appspot.com",
    messagingSenderId: "880790822468",
    appId: "1:880790822468:web:879816dc26d8779a9ea611"
  };

firebase.initializeApp(firebaseConfig);
// const storage = getStorage(firebase)

export default firebase;

