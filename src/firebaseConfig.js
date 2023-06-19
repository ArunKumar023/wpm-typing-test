import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBIG7hcKwATE_nJ-9ml3_cA_ELCf0T4pFw",
    authDomain: "typing-speed-e5fcc.firebaseapp.com",
    projectId: "typing-speed-e5fcc",
    storageBucket: "typing-speed-e5fcc.appspot.com",
    messagingSenderId: "384221129856",
    appId: "1:384221129856:web:11517ca8500df1f37e8a65",
    measurementId: "G-T7CJCYHDL1"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore(); // Corrected line

export { auth, db };