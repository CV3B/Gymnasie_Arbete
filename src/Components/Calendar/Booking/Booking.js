import React, { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { auth, db, logout } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";


import { isValidDay } from '../Calendar';

function Booking(props) {

  return (
    <AddValidDays days={props.day} />
  )
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function OpenBooking(props) {
  const [user, loading, error] = useAuthState(auth);
  const [availableTimes, setTimes] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAvailableDatesData = async () => {
    try {
      const query = await db
        .collection("available-dates")
        .where("date", "==", props.date)
        .get();
      const data = await query.docs[0].data();
      setTimes(data["available-times"])

      console.log(data["available-times"]);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    
    // errorAlert()
    fetchAvailableDatesData();
  }, [loading]);

  return (
    <div>
      {/* <Button onClick={() => console.log(availableTimes)}>aaaa</Button> */}
      <Button onClick={handleOpen}>BOKA</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.date}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              { Object.keys(availableTimes).map(time => (
                <Typography>{time}</Typography>
              )) }
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

function AddValidDays(props) {

  if (isValidDay(props.days)) {
    console.log("aaaaa");
    return(
      <button>BOKA</button>
    )
  }
}

export default Booking;