import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBD7lVj2oRhMuT8FpaRmlLrwve070C6FBk",
  authDomain: "link-2e2f2.firebaseapp.com",
  projectId: "link-2e2f2",
  storageBucket: "link-2e2f2.appspot.com",
  messagingSenderId: "16869879774",
  appId: "1:16869879774:web:517d8e942c9d8c1485774f",
  measurementId: "G-9EV12W0LRL"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;
