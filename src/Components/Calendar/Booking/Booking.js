import React, { useEffect, useState } from 'react';

//* Mui imports *//
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Divider,
  TextField,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  IconButton
} from "@mui/material"

import DoneIcon from '@mui/icons-material/Done';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDayjs';

import { makeStyles } from '@mui/styles';

//* Firebase imports *//
import { collection, query, where, getDocs, addDoc  } from "firebase/firestore";
import AlertBar from '../../Firebase/Firebase';
import { auth, db } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//* Other imports *//
import emailjs from '@emailjs/browser';

import dayjs from "dayjs";

//* Compontenet funktionen skapar tillgängliga dagar för anvädare som vill boka tider *//
function Booking(props) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendAvailableDatesInformation = async () => {
    try {
      //* Modifierad funktion från "Calendar.js/isValidDay"
      const date1 = dayjs(props.value[0]).format("YYYY-MM-DD")
      const date2 = dayjs(props.value[1]).format("YYYY-MM-DD")
      const dateDiff = dayjs(date2).diff(dayjs(date1), "day")
      
      for (let i=0; i < dateDiff + 1; i++) {
        await addDoc(collection(db, "available-dates"), {
          date: dayjs(date1).add(i, "day").format("YYYY-MM-DD"),
          "available-times": {
            "12:00": 10,
            "12:10": 9,
            "12:20": 8,
            "12:30": 7,
          }
        });
      }
      
    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  const handleApply = () => {
    sendAvailableDatesInformation();
    props.setValue(props.value);
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" >Lägg till bokningsbara dagar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Lägg till dagar
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={props.value}
            onChange={(newValue) => {
              props.setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
          </LocalizationProvider>
          <Button onClick={handleApply}>Tillämpa</Button>
        </Box>
      </Modal>
      <AlertBar message={"An error occured while fetching available dates data"} open={alertOpen} setOpen={setAlertOpen} />
    </div>
  )
};

//* Style för "OpenBooking" element *//
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


//* Funktionen visar alla lediga tider vid det valda datumet *//
export function OpenBooking(props) {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [availableTimes, setAvailableTimes] = useState();
  const [isSubmited, setSubmit] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [quantityPeople, setQuantityPeople] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState();

  let newObj;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAvailableTimesData = async () => {
    try {
      const q = query(collection(db, "available-dates"), where("date", "==", props.date));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setAvailableTimes(pDoc.data()["available-times"])

      });

      //* Skapar ett objekt som hanterar checkboxes on/off tillstånd *//
      newObj = {...availableTimes};
      Object.keys(newObj).forEach(key => {
       newObj[key] = false;
      })

     setSelectedTimes(newObj);

      // console.log(availableTimes)
    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  useEffect(() => {
    if(loading) return;
    fetchAvailableTimesData();
    
  }, [loading]);

  return (
    <div>
      <IconButton onClick={handleOpen}>
      <AddCircleIcon color="primary" sx={{marginTop: "10px"}} />
        </IconButton>
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
              {props.date} - 120kr per gokart åk - ett gokart åk är 10min
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} component="span">
              <BookingStepper handleClose={handleClose} isSubmited={isSubmited} setSubmit={setSubmit} selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} availableTimes={availableTimes} date={props.date} quantityPeople={quantityPeople} setQuantityPeople={setQuantityPeople}  />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <AlertBar message={"An error occured while fetching available times data"} open={alertOpen} setOpen={setAlertOpen} />
    </div>
  )
}

//* Funktionen hanterar de valda tiderna *//
function RadioButtonsGroup(props) {
  const [availableSeats, setAvailableSeats] = useState([]);
  
  //TODO Fixa så att seatsValueConstraint fungerar, just nu uppdateras den inte när man trycker på checkboxarna
  const handleChange = (e) => {
    props.setSelectedTimes({
      ...props.selectedTimes,
      [e.target.name]: e.target.checked,
    });
    if(e.target.checked) {
      setAvailableSeats(prev => [...prev, props.availableTimes[e.target.name]]);

    } else {
      setAvailableSeats(availableSeats.filter(item => item !== props.availableTimes[e.target.name]));
    }
  };

  const maxSeatsConstraint = () => (isNaN(Math.min(...availableSeats)) ? 1 : Math.min(...availableSeats));

  //* För att man inte ska kunna boka över maxantal tillgänliga platser
  // const seatsValueConstraint = (value) => (value > Math.min(...availableSeats) ? setSeatsValue(Math.min(...availableSeats)) : setSeatsValue(value))

  const handleSeatsValue = (e) => {
    props.setQuantityPeople(e.target.value);
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="tider"
        name="radio-buttons-group"
        defaultValue={null}
      >
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
        defaultValue={1}
        InputProps={{ inputProps: { min: 1, max: maxSeatsConstraint() } }}
        onChange={(e)=> handleSeatsValue(e)}
      />
        
        { Object.keys(props.availableTimes).map((time) => (
          <div key={time} >
            <Divider />
            <FormControlLabel
              control={
                <Checkbox checked={props.selectedTimes[time]} onChange={handleChange} name={time} />
              }
              label={time}
            />
            <Typography sx={{ display: "inline"}} component="span" >Platser kvar: {props.availableTimes[time]}</Typography>
            <Divider />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}

//* Funktionen hanterar den personliga informationen som anvädaren matar in till hemsidan *//
function PersonalInformation(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [epost, setEpost] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [isSubmited, setSubmit] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  //* Sparar användarens valda tider i en array om tiden är vald *//
  let selectedTimes = [];
  Object.keys(props.selectedTimes).map((i, k) => {
    if(props.selectedTimes[i]) {
      selectedTimes.push(Object.keys(props.selectedTimes)[k]);
    }
  })
  
  const handleSubmit = () => {
    setSubmit(true);
    // console.log("clicked");
    setTimeout(function() {
      props.handleClose();

    }, 10000)
  }

  const sendPersonalInformation = async () => {
    try {
       await addDoc(collection(db, "booked-dates"), {
        firstName: firstName,
        lastName: lastName,
        email: epost,
        mobileNumber: mobileNumber,
        extraInfo: extraInfo,
        date: props.date,
        qPeople: props.quantityPeople,
        selectedTime: selectedTimes   
      });

    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  const confirmationMailData = {
    time: props.date + " " + selectedTimes.map(x => x),
    quantityPeople: props.quantityPeople,
    email: epost
  }

  const sendConfirmationMail = () => {
    emailjs.send('service_4pon2so', 'template_6azjfid', confirmationMailData, 'user_OvRVESz4UKcl3nNG4n3G7')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    })
  }

  useEffect(() => {
    //* Går inte att tabort "... == true", fungerar inte då *//
    if(isSubmited == true) {
      sendPersonalInformation();
      sendConfirmationMail();
    }
    
  }, [isSubmited]);

  if(!isSubmited) {  
    return (
      <div>
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
          required
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
          required
        />
        <TextField
          id="epost"
          type="email"
          label="Epost"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          size="small"
          sx={{ margin: 2}}
          onChange={e => setEpost(e.target.value)}
          required
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
          required
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
        <Button onClick={handleSubmit} variant="contained" sx={{margin: 2, width: "30.4%" }} color="secondary" >Skicka</Button>
        <AlertBar message={"An error occured while fetching data"} open={alertOpen} setOpen={setAlertOpen} />
      </div>
    )}
    return(
      <div style={{textAlign: "center"}}>
        <DoneIcon color="success" sx={{fontSize: "200px"}} />
        <Typography variant='h3' sx={{ color: 'success.main' }} component="span" >Skickat!</Typography> 
        <Typography paragraph component="span" >Bokningsbekräftelse har skickats till din mail</Typography>
      </div>
    )
}


//* Booking Stepper style *//
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

//* Stegens titlar *//
function getSteps() {
  return ['Tider', 'Din information'];
}

function getStepContent(props, stepIndex, isSubmited) {
  switch (stepIndex) {
    case 0:
      return (<RadioButtonsGroup selectedTimes={props.selectedTimes} setSelectedTimes={props.setSelectedTimes} availableTimes={props.availableTimes} setQuantityPeople={props.setQuantityPeople} />)
    case 1:
      return (<PersonalInformation handleClose={props.handleClose} isSubmited={props.isSubmited} selectedTimes={props.selectedTimes} date={props.date} quantityPeople={props.quantityPeople} />);
    default:
      return 'Unknown stepIndex';
  }
}

//* Funktionen hanterar alla steg under bokningen *// 
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

// const handleReset = () => {
//   setActiveStep(0);
// };

const handleSubmit = () => {
  props.setSubmit(true);
}

// const handleSubnNxt = (e) => {
//   handleNext();
//   handleSubmit();
  
// }

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
          <Typography className={classes.instructions} component="span" >Alla steg klara</Typography>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions} component="span">{getStepContent(props, activeStep, props.date)}</Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 2 ? (<Button variant="contained" color="primary" onClick={handleNext} >Next</Button>) : null }
            {/* {activeStep === steps.length - 1 ? (
            <Button id="submit-btn" variant="contained" color="primary" onClick={handleSubnNxt} >
              Submit
            </Button>) : null} */}
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Booking;