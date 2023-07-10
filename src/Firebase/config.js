import firebase  from "firebase/app";
import 'firebase/firestore';
 import 'firebase/auth'
 import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDs-CAZVWjHJt2ajcDHGo6ViGuwSRCX6l8",
    authDomain: "muso-omar.firebaseapp.com",
    projectId: "muso-omar",
    storageBucket: "muso-omar.appspot.com",
    messagingSenderId: "827038261013",
    appId: "1:827038261013:web:9d170c97db409af6e6131c"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore();
const projrctAuth = firebase.auth();
const projrctStorage = firebase.storage();


//tiemStamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export {projectFirestore, projrctAuth, timestamp, projrctStorage}