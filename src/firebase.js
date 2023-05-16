import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBN6lnMem0Kqg2p24CUr1Qxk-c6osZ0FwY",
    authDomain: "linkedin-clone-bca28.firebaseapp.com",
    projectId: "linkedin-clone-bca28",
    storageBucket: "linkedin-clone-bca28.appspot.com",
    messagingSenderId: "663620477950",
    appId: "1:663620477950:web:884f2f8c44e90b9b7216af",
    measurementId: "G-MRBJKS9CJM"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;
