import "./Contact.css";
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { ClassNames } from "@emotion/react";
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';
import SubjectIcon from '@mui/icons-material/Subject';
import TitleIcon from '@mui/icons-material/Title';
// import EmailIcon from '@mui/icons-material/Email';
// function Map() {
//   const [viewport, setViewport] = useState({
//     longitude: 57.71,
//     latitude: 11.97,
//     zoom: 14
//   });
//   return (
//     <ReactMapGL {...viewport} width="100px" height="100px" onViewportChange={setViewport} />
//   );
// }

const TOKEN = "pk.eyJ1IjoiY3YzYiIsImEiOiJja3hmN3ZjeTcwdjQ0MnVxdjJsZWtvZjNqIn0.XtmeioOaO0zN6KL7pHBuDw";

function Map() {
  const [viewport, setViewport] = useState({
    longitude: 57.71,
    latitude: 11.97,
    zoom: 8,
    
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={TOKEN}
    >
      <Marker latitude={11.97} longitude={57.71} offsetLeft={-20} offsetTop={-10}>
        <div>Gokart</div>
      </Marker>
    </ReactMapGL>
  );
}

const useStyles = makeStyles((theme) => ({
  multilineColor:{
    color:'white',
  },
  whiteTextColor: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  whiteBackgroundColor: {
    backgroundColor: "white",
    marginTop: "20px"
  }
}));



function Contact() {
  const classes = useStyles()

  return(
    <>
     <div className="contact-page-container">
       <div className="contact-page-item ">
        {/* <Map /> */}
       <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2131.4562110928696!2d11.964519616094407!3d57.70870804692339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff366aa6a6c99%3A0x5df17fc3a64d3501!2s%C3%96stra%20Hamngatan%2013%2C%20411%2010%20G%C3%B6teborg!5e0!3m2!1ssv!2sse!4v1640041353258!5m2!1ssv!2sse" width="99%" height="100%" allowfullscreen="" loading="lazy" frameBorder="0"></iframe>
       </div>
       {/* <div className="contact-page-item contact-page-paper"> 

       </div> */}
       <div className="contact-page-item" style={{borderRadius: "7px"}}>
         <div className="contact-social">
           <IconButton color="white">
            <FacebookIcon fontSize="large" />
           </IconButton>

           <IconButton color="white">
            <TwitterIcon fontSize="large"/>
           </IconButton>

           <IconButton color="white">
            <InstagramIcon fontSize="large"/>
           </IconButton>
         </div>
         <div className="contact-form">
         <Divider variant="middle" className={classes.whiteBackgroundColor} sx={{ marginBottom: "20px"}}/>

           <Typography paragraph className={classes.whiteTextColor}>Kontakta</Typography>
           <TextField
            id="email"
            label="Email"
            variant="outlined"
            className="contact-input"
            margin="dense"
            color="white"
            focused 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="white" />
                </InputAdornment>
              ),
              className: classes.multilineColor
            }}
            // sx={{padding: "8px"}}
           />
           <TextField
            id="subject"
            label="Titel"
            variant="outlined"
            className="contact-input"
            margin="dense"
            color="white"
            focused 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="white" />
                </InputAdornment>
              ),
              className: classes.multilineColor
            }}
            // sx={{padding: "8px"}}
           />
           <TextField
            id="message"
            label="Meddelande"
            variant="outlined"
            className="contact-input contact-message-form"
            multiline
            rows={4}
            margin="dense"
            color="white"
            focused 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubjectIcon color="white" />
                </InputAdornment>
              ),
              className: classes.multilineColor
            }}
            // sx={{margin: "20px"}}
           />
           
           <Button className="contact-input contact-submit" variant="contained" color="secondary" sx={{marginTop: "10px"}}>
             Skicka
           </Button>
           <Divider variant="middle" className={classes.whiteBackgroundColor} />

         </div>
         <div className="contact-page-find-us-btn">
            <IconButton color="secondary" >
              <LocationOnIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor}>ADRESS</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>GATENAMN 9</Typography>
            <Divider variant="middle" className={classes.whiteBackgroundColor} />
          </div>
          <div className="contact-page-find-us-btn">
            <IconButton color="secondary" >
              <LocalPhoneIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor}>TELEFON</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>0704123456</Typography>
            <Divider variant="middle" className={classes.whiteBackgroundColor} />
          </div>
          <div className="contact-page-find-us-btn">
            <IconButton color="secondary" >
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor} >EMAIL</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>info@contact.com</Typography>
            <Divider variant="middle" className={classes.whiteBackgroundColor} />
          </div>
       </div>
     </div>
  </>
  )
}

export default Contact;