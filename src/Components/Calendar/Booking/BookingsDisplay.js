import React, { useEffect, useState } from 'react';

//* Firebase imports *//
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AlertBar from "../../Firebase/Firebase";

//* Mui imports *//
import MUIDataTable from "mui-datatables";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//* CSS imports *//
import "./BookingsDisplay.css";

function BookingDisplay() {
  const [bookedDate, setBookedDate] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [mobileNumber, setMobileNumber] = useState([]);
  const [quantityPeople, setQuantityPeople] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [extraInfo, setExtraInfo] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [alertOpen, setAlertOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(true);

  const columns = [
    { 
      name: 'bookedDate', 
      label: 'Bokat datum', 
    },
    { 
      name: 'name', 
      label: 'Namn',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'mobileNumber',
      label: 'Mobilnummer',
    },
    {
      name: 'quantityPeople',
      label: 'Antal personer',
    },
    {
      name: 'selectedTime',
      label: 'Tider',
    },
    {
      name: 'extraInfo',
      label: 'Extra information',
    },
  ];
  
  function createData(pBookedDate, pName, pEmail, pMobileNumber, pQuantityPeople, pSelectedTime, pExtraInfo) {
    return { bookedDate: pBookedDate, name: pName, email: pEmail, mobileNumber: pMobileNumber, quantityPeople: pQuantityPeople, selectedTime: pSelectedTime, extraInfo: pExtraInfo };
  }

  const data = bookedDate.map((i, k) => {
    return createData(bookedDate[k], name[k], email[k], mobileNumber[k], quantityPeople[k], (selectedTime[k] + " "), extraInfo[k])
  })

  

  const fetchBookedData = async () => {
    try {
      const q = query(collection(db, "booked-dates"), where("date", "!=", "")) // För att lättare kunna se alla bokingar ska det vara: where("date", "==", "currentDate") men har inte igång nu, för att lättare visa hur det fungerar. Detta kommer också hämta datan snabbare.

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setBackdropOpen(true);
        setBookedDate(prev => [...prev, pDoc.data().date]);
        setName(prev => [...prev, pDoc.data().firstName +" "+ pDoc.data().lastName]);
        setEmail(prev => [...prev, pDoc.data().email]);
        setMobileNumber(prev => [...prev, pDoc.data().mobileNumber]);
        setQuantityPeople(prev => [...prev, pDoc.data().qPeople]); 
        setSelectedTime(prev => [...prev, pDoc.data().selectedTime]);
        setExtraInfo(prev => [...prev, pDoc.data().extraInfo]);

      });
      setBackdropOpen(false);

    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  //* Används för att senare kunna redera rader i MUIDataTable, som sedan raderar den raden i databasen *//
  // const handleOnRowsDelete = (e) => {
  //   console.log(e)
  // }

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: '656px',
    // onRowsDelete: (e)=> handleOnRowsDelete(e),
  };

  useEffect(() => {
    if(loading) return;

    fetchBookedData();
  }, [loading]);
  return(
  <>
    <MUIDataTable
      title={"Bookings List"}
      data={data}
      columns={columns}
      options={options}
      
    />
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <AlertBar message={"An error occured while fetching booking data"} open={alertOpen} setOpen={setAlertOpen} />
  </>
  );
}

export default BookingDisplay;