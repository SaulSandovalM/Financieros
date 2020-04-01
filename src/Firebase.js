import * as firebase from 'firebase';
 
const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCHqETPxLP-prWVWZ6bUWHd7s7opA08ipk",
  authDomain: "financieros-78cb0.firebaseapp.com",
  databaseURL: "https://financieros-78cb0.firebaseio.com",
  projectId: "financieros-78cb0",
  storageBucket: "financieros-78cb0.appspot.com",
  messagingSenderId: "712636670485",
  appId: "1:712636670485:web:55882922e3918cff38241c",
  measurementId: "G-S9335SB3LS"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
