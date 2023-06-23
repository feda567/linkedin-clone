import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6srLj0v0ihDgeevwIcBmLtwOSTb34fTA",
  authDomain: "linked-b69a1.firebaseapp.com",
  databaseURL: "https://linked-b69a1-default-rtdb.firebaseio.com",
  projectId: "linked-b69a1",
  storageBucket: "linked-b69a1.appspot.com",
  messagingSenderId: "350555393292",
  appId: "1:350555393292:web:c0695cf3d7ac7a99e9cd29",
  measurementId: "G-GQY3T8MKVG"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;
