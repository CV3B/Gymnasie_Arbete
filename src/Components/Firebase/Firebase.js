import { forwardRef } from 'react';

//* Firebase imports *//
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword as signInEmailPassword, sendPasswordResetEmail as sendResetEmail, signOut  } from "firebase/auth";
import { collection, addDoc  } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore'

//* MUI imports *//
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// GÖM DETTA
const firebaseConfig = {
  apiKey: "AIzaSyBXlvrVJq32hv4954_U6THh49WYzdZ4NzM",
  authDomain: "gymn-arbt.firebaseapp.com",
  projectId: "gymn-arbt",
  storageBucket: "gymn-arbt.appspot.com",
  messagingSenderId: "863156492639",
  appId: "1:863156492639:web:cf6bc4d2c9801231413eea",
  measurementId: "G-W9Z3EL9TQV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await signInEmailPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    // alert(err.message);
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
    // alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await sendResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

//* Kan användas i framtiden för att ta bort data från databasen för bättre prestanda 
// const clearDatabaseDocument = async () => {
//   try {
    
//     await deleteDoc(doc(db, "booked-dates", "DC"));
//     await deleteDoc(doc(db, "available-dates", "DC"));


//   } catch(err) {
//     console.error(err);
//     alert(err.message);
//   }
// }

// Firebase
// match /collection/{document} {
//   allow read: if resource.data.expirationTimestamp > request.time.date();
// }


export default function AlertBar(props) {

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}


export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
