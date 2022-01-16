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

import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


import Tooltip from '@mui/material/Tooltip';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import { makeStyles } from '@mui/styles';

import { auth, db, logout } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";

import { isValidDay } from '../Calendar';

//! "renderMode" är ett dåligt sätt att kalla funktioen för att "sendPersonalInformation" ska uppdateras, kommer inte på något bättre.

// TODO Bugg: Rendera in PersonligInfo vid submit button för att den ska uppdatera isSubmited variabeln i PersonligInfo och sen skicka det till databasen
// TODO Booking -> AddbookableDates?
// TODO Ta bort all kod om det föra alternativ systemet för tider
// TODO Antal personer vid bokning ska läggas till i en array ! ELLER INTE BARA ETT SÄTT ATT VÄLJA
function Booking(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendAvailableDatesInformation = async () => {
    try {
      // let arrValidDays = [];
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
      // alert("An error occured while fetching user data");
    }
  };

  const handleApply = () => {
    sendAvailableDatesInformation()
    props.setValue(props.value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Lägg till dagar(bättre namn)</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Button onClick={()=> console.log(dayjs(props.value[0]).format("YYYY-MM-DD"), dayjs(props.value[1]).format("YYYY-MM-DD"))}>aaaaaaa</Button>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
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
          <Button onClick={handleApply}>Apply</Button>
        </Box>
      </Modal>
    </div>
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
  const [open, setOpen] = useState(false);
  const [availableTimes, setAvailableTimes] = useState()
  const [isSubmited, setSubmit] = useState(false)

  const [quantityPeople, setQuantityPeople] = useState(0);
  const [selectedTime, setSelectedTime] = useState();
  let newObj;
  // const getNewAvailableTimesState = () => {

  //    = {...availableTimes};
  
  //   Object.keys(newObj).forEach(key => {
  //     newObj[key] = false;
  //   })
  
  //   return newObj;
  // }

  const [selectedTimes123, setSelectedTimes123] = useState()

  const handleOpen = () => { 
    setOpen(true);
    // props.fetchAvailableDatesData();
  }
  const handleClose = () => setOpen(false);

  const fetchAvailableTimesData = async () => {
    try {
      const q = query(collection(db, "available-dates"), where("date", "==", props.date));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setAvailableTimes(pDoc.data()["available-times"])

        console.log("AVILBLE TIM", pDoc.data()["available-times"]);
      });

     newObj = {...availableTimes};

     Object.keys(newObj).forEach(key => {
      newObj[key] = false;
     })

     setSelectedTimes123(newObj)

      console.log(availableTimes)
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchAvailableTimesData()
    
    // errorAlert()
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
      <Button onClick={()=> console.log(selectedTimes123)}>BOKA</Button>
              <BookingStepper isSubmited={isSubmited} setSubmit={setSubmit} selectedTimes123={selectedTimes123} setSelectedTimes123={setSelectedTimes123} availableTimes={availableTimes} date={props.date} quantityPeople={quantityPeople} setQuantityPeople={setQuantityPeople} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}



function RadioButtonsGroup(props) {

  const handleChange = (event) => {
    props.setSelectedTimes123({
      ...props.selectedTimes123,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Gender</FormLabel> */}
      <RadioGroup
        aria-label="Tider"
        name="radio-buttons-group"
        defaultValue={null}
      >
      <Button onClick={()=> console.log(props)}>DDDDDDDD</Button>
        
        { Object.keys(props.availableTimes).map((time) => (
          <div>

            <Divider />
            {/* <FormControlLabel value={time} onChange={e => props.setSelectedTime(e.target.value)} control={<Radio />} label={time} sx={{ marginTop: 2 }} /> */}
            <FormControlLabel
              control={
                <Checkbox checked={props.selectedTimes123[time]} onChange={handleChange} name={time} />
              }
              label={time}
            />
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
                defaultValue={0}
                InputProps={{ inputProps: { min: 0, max: props.availableTimes[time] } }}
                onChange={e => props.setQuantityPeople(e.target.value) }
              />
              <Typography sx={{ display: "inline"}}>/ {props.availableTimes[time]}</Typography>
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

  let selectedTimes = [];
  if(props.renderMode) {
    Object.keys(props.selectedTimes123).map((i, k) => {
      // console.log("INDEX", i, k);
      // console.log("Key", props.selectedTimes123[i])
      if(props.selectedTimes123[i]) {
        selectedTimes.push(Object.keys(props.selectedTimes123)[k])
      }
    })
  }

  let date = props.date 

  const data = {
    firstName,
    lastName,
    epost,
    mobileNumber,
    extraInfo,
    date
  }

  const sendPersonalInformation = async () => {
    try {
       await addDoc(collection(db, "booked-dates"), {
        firstName: firstName,
        lastName: lastName,
        email: epost,
        mobileNumber: mobileNumber,
        extraInfo: extraInfo,
        // date: date,
        // qPeople: props.quantityPeople,
        // selectedTime: selectedTimes   
      });

    //   await db.collection("booked-dates").add({
    //    firstName: firstName,
    //    lastName: lastName,
    //    email: epost,
    //    mobileNumber: mobileNumber,
    //    extraInfo: extraInfo,
    //    date: props.date,  
    // });
      console.log("SEND DATA LOOL")
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  // let endLoop = false;
  // if(!props.renderMode && !endLoop){ 
  //   sendPersonalInformation() 
  //   endLoop = true;
  // }

    useEffect(() => {
      // if (loading) return;
      console.log("USEEFFECTCCCCCCCCC")
      // Måste vara == true, fungarar inte utan
      // "props.isSubmited" fungerar inte här
      if (props.renderMode == false) {

        console.log("aaaaaaa")
        sendPersonalInformation()
      }
      // sendPersonalInformation();
      console.log(props.isSubmited)
      
      // fetchAvailableDatesData();
    }, [props.isSubmited, props.renderMode]);
  if(props.renderMode) {  
  return (
    <>
      <Button onClick={()=> console.log(data)} >AAAAAAAAAAAA</Button>
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
  )}
  return(null)
}


//* Booking Stepper *//

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
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA",props)
  switch (stepIndex) {
    case 0:
      return (<RadioButtonsGroup selectedTimes123={props.selectedTimes123} setSelectedTimes123={props.setSelectedTimes123} availableTimes={props.availableTimes} setQuantityPeople={props.setQuantityPeople} setSelectedTime={props.setSelectedTime} />)
    case 1:
      return (<PersonalInformation renderMode={true} isSubmited={props.isSubmited} selectedTimes123={props.selectedTimes123} isSubmited={isSubmited} date={props.date} quantityPeople={props.quantityPeople} selectedTime={props.selectedTime} />);
    default:
      return 'Unknown stepIndex';
  }
}


//* För att expandera till ett system där det går att välja flera tider att boka *//
// const getNewAvailableTimesState = (props) => {

//   let newObj = {...props.availableTimes};

//   Object.keys(newObj).forEach(key => {
//     newObj[key] = false;
//   })

//   return newObj;
// }


function BookingStepper(props) {
const [activeStep, setActiveStep] = useState(0);
const steps = getSteps();
const classes = useStyles();




// const listtest = () => {
//   let l = {}
//   Object.keys(props.availableTimes).map((time) =>  l = {time: false**-} ))

// }

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
  props.setSubmit(true);
}

const handleSubnNxt = (e) => {
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
      <Button onClick={()=> console.log(props.isSubmited)}>AAAAAA</Button>
      <Button onClick={()=> console.log(props)}>BBBBBB</Button>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>All steps completed</Typography>
          {/* <PersonalInformation isSubmited={isSubmited} date={props.date} /> */}
          {/* <Button onClick={handleReset}>Reset</Button> */}
          <PersonalInformation renderMode={false} />

          {/* <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button> */}
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(props, activeStep, props.date)}</Typography>
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
            <Button id="submit-btn" variant="contained" color="primary" onClick={handleSubnNxt} >
              Submit
            </Button>) : null}
          </div>
        </div>
      )}
    </div>
  </div>
);
};




export default Booking;