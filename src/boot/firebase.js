// Firebase App (the core Firebase SDK) is always required and must be listed first
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDn0gc-AHQqIuT-nJHK7-E1JC_ZZxhBXVI",
  authDomain: "smartchatapp-56d5a.firebaseapp.com",
  projectId: "smartchatapp-56d5a",
  storageBucket: "smartchatapp-56d5a.appspot.com",
  messagingSenderId: "1008143256347",
  appId: "1:1008143256347:web:1016e6f21f5d0edbe4e1be",
  measurementId: "G-TXN0MTTPT7"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebase.database();

export { firebaseAuth, firebaseDb };
