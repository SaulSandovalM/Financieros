import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyB9DS5C2-i0Kln08gXchjwKpkdtaBP2xQ0",
  authDomain: "well-be-7e1c0.firebaseapp.com",
  projectId: "well-be-7e1c0",
  storageBucket: "well-be-7e1c0.appspot.com",
  messagingSenderId: "196121131699",
  appId: "1:196121131699:web:061b32193d0437a5ba8ec6",
  measurementId: "G-P4471PHJ36",
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
