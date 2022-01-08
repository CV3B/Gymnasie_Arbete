import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword as signInEmailPassword, sendPasswordResetEmail as sendResetEmail, signOut  } from "firebase/auth";
import { collection, addDoc  } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXlvrVJq32hv4954_U6THh49WYzdZ4NzM",
  authDomain: "gymn-arbt.firebaseapp.com",
  projectId: "gymn-arbt",
  storageBucket: "gymn-arbt.appspot.com",
  messagingSenderId: "863156492639",
  appId: "1:863156492639:web:cf6bc4d2c9801231413eea",
  measurementId: "G-W9Z3EL9TQV"
};

// Initialize Firebase t
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await signInEmailPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user)
      addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
      });
      // ...
    })
    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await sendResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
