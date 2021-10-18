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

              <BookingStepper availableTimes={availableTimes} />
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

function PersonalInformation() {
  const [personalInfo, setPersonalInfo] = useState({})

  const handleChange = (e, {firstname, value}) => {
    setPersonalInfo({[firstname]: value})
  }
  return (
    <>
      <Button onClick={() => console.log(personalInfo)}>PERSONALINFO</Button>
      <TextField
        id="firstname"
        label="Förnamn"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <TextField
        id="mobile-number"
        label="Epost"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <TextField
        id="mobile-number"
        label="Extra information"
        multiline
        maxRows={4}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        size="small"
        sx={{ margin: 2}}
        onChange={handleChange}
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

function getStepContent(props, stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<RadioButtonsGroup availableTimes={props.availableTimes} />)
    case 1:
      return (<PersonalInformation />);
    default:
      return 'Unknown stepIndex';
  }
}

function BookingStepper(props) {
const [activeStep, setActiveStep] = useState(0);
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
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(props, activeStep, props.items, props.onRemoveItem)}</Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
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