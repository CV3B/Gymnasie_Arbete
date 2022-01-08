import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";
import { auth, db, logout } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Paper, Typography, Button } from '@mui/material';

import "./BookingsDisplay.css";

function BookingDisplay() {
  const [bookings, setBookings] = useState({});
  const [name, setName] = useState([]);
  const [email, setemail] = useState();
  const [mobileNumber, setmobileNumber] = useState();
  const [bookedDate, setbookedDate] = useState();


  const [user, loading, error] = useAuthState(auth);

  const fetchBookedData = async () => {
    try {
      const q = query(collection(db, "booked-dates"), where("date", "!=", ""))

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setBookings(prev => [prev, pDoc.data()])
        setName(prev => [...prev, pDoc.data().firstName +" "+ pDoc.data().lastName])
        
        console.log("AVILBLE BOOKINS", pDoc.data());
      });

    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };


  useEffect(() => {
      if (loading) return;
      fetchBookedData()

      // errorAlert()
  }, [loading]);
  return(
    // Object.keys(bookings.map((bookedData) => (
    //   <Paper className="bookings-paper">
    //     <Typography>{bookings[bookedData]}</Typography>
    //     <Button onClick={()=> console.log(bookings)}>AAAAA</Button>
    //   </Paper>
    // ))
    // )
    <div>
      <Button onClick={()=> console.log(name)}>AAAAA</Button>
    </div>
  )
}

export default BookingDisplay;