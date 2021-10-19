import React, { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Tooltip from '@mui/material/Tooltip';


import { makeStyles } from '@mui/styles';

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
  width: 600,
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
      console.log(availableTimes)
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
              {/* { Object.keys(availableTimes).map((time) => (
                <Typography>{time} - {availableTimes[time]}</Typography>
              )) } */}

              <BookingStepper availableTimes={availableTimes} date={props.date}/>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}



function RadioButtonsGroup(props) {
  const [selectedTime, setSelectedTime] = useState(Object.keys(props.availableTimes)[0])
  

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Gender</FormLabel> */}
      <RadioGroup
        aria-label="Tider"
        name="radio-buttons-group"
        defaultValue={selectedTime}
      >
        { Object.keys(props.availableTimes).map((time) => (
          <div>
            <Divider />
            <FormControlLabel value={time} control={<Radio />} label={time} sx={{ marginTop: 2 }} />
            {/* <Tooltip title="Platser kvar"> */}
              {/* <Typography sx={{ float: "right" }} >({props.availableTimes[time]})</Typography> */}
              <TextField
                id="standard-number"
                label="Platser"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                size="small"
                sx={{ margin: 2}}
                defaultValue={props.availableTimes[time]}
                InputProps={{ inputProps: { min: 0, max: props.availableTimes[time] } }}
              />
            <Divider />

            {/* </Tooltip> */}
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function PersonalInformation(props) {
  // const [personalInfo, setPersonalInfo] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [epost, setEpost] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [extraInfo, setExtraInfo] = useState("")
  const [user, loading, error] = useAuthState(auth);

  const sendPersonalInformation = async () => {
    try {
      await db.collection("booked-dates").add({
       firstName: firstName,
       lastName: lastName,
       email: epost,
       mobileNumber: mobileNumber,
       extraInfo: extraInfo,
       date: props.date,  
    });
      console.log("SEND DATA LOOL")
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

    useEffect(() => {
      if (loading) return;
      if (props.isSubmited) {
        console.log("aaaaaaa")
      }
      // sendPersonalInformation();
      console.log(props.isSubmited)
      
      // fetchAvailableDatesData();
    }, [props.isSubmited, loading]);
  return (
    <>
      {/* <Button onClick={() => console.log(props.isSubmited)}>PERSONALINFO</Button> */}
      <TextField
        id="firstname"
        label="Förnamn"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        id="lastname"
        label="Efternamn"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        id="epost"
        label="Epost"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={e => setEpost(e.target.value)}
      />
      <TextField
        id="mobile-number"
        label="Telefon nummer"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={e => setMobileNumber(e.target.value)}
      />
      <TextField
        id="extra-info"
        label="Extra information"
        multiline
        maxRows={4}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={e => setExtraInfo(e.target.value)}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function getSteps() {
  return ['Tider', 'Din information'];
}

function getStepContent(props, stepIndex, isSubmited) {
  console.log(isSubmited)
  switch (stepIndex) {
    case 0:
      return (<RadioButtonsGroup availableTimes={props.availableTimes} />)
    case 1:
      return (<PersonalInformation isSubmited={isSubmited} date={props.date} />);
    default:
      return 'Unknown stepIndex';
  }
}

function BookingStepper(props) {
const [activeStep, setActiveStep] = useState(0);
const [isSubmited, setSubmit] = useState(false)
const steps = getSteps();
const classes = useStyles();


const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleReset = () => {
  setActiveStep(0);
};

const handleSubmit = () => {
  setSubmit(true);
}

const handleSubnNxt = () => {
  handleNext();
  handleSubmit();
}

return (
  <div className={classes.root}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <div>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>All steps completed</Typography>
          {/* <PersonalInformation isSubmited={isSubmited} date={props.date} /> */}
          {/* <Button onClick={handleReset}>Reset</Button> */}
          {/* <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button> */}
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(props, activeStep, isSubmited, props.date)}</Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 2 ? (<Button variant="contained" color="primary" onClick={handleNext} >Next</Button>) : null }
              {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
              {/* Next */}
            
            {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubnNxt} >
              Submit
            </Button>) : null}
          </div>
        </div>
      )}
    </div>
  </div>
);
};


function AddValidDays(props) {

  if (isValidDay(props.days)) {
    console.log("aaaaa");
    return(
      <button>BOKA</button>
    )
  }
}

export default Booking;