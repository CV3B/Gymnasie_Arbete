import React from 'react';
//* MUI imports *//
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles } from '@mui/styles';

//* Image imports *//
import gokart_on_track from "../../Images/gokart_on_track.jpg";
import closeup_gokart from "../../Images/closeup_gokart.jpg";
import helemt from "../../Images/helemt.jpg";


import { BrowserRouter as Router, Link } from "react-router-dom";

import './HomeFeed.css';

const useStyles = makeStyles((theme) => ({
  paperBg: {
    background: "#1e88e5",
    height: "150px",
  },
  whiteTextColor: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  whiteBackgroundColor: {
    backgroundColor: "white",
    marginTop: "20px"
  },

}));



function HomeFeed() {
  const classes = useStyles();
  
  return(
    <div className="container">
      <div className="item">
        <img 
          src={gokart_on_track}
          className="top-img"
          alt="topImg"
        />
        <div className="btn-bg">
          <Typography gutterBottom variant={window.matchMedia("(max-width: 600px)").matches ? "h4" : "h3"} component="div" className='site-name' sx={{ color: "#ffc400", fontWeight: "bold",}} >GOKART ÖSTRAHAMNGATAN</Typography>
          <Typography gutterBottom variant="h5" component="div" className='site-name' sx={{ color: "#ffc400", fontWeight: "bold",}} >120kr per gokart åk - ett gokart åk är 10min</Typography>
          <Button className="big-img-btn" size="large" variant="contained" color="primary" component={Link} to="/bokning">BOKA HÄR</Button>
        </div>
      </div>

      <div className="item">
        <Paper className="container paper-bg" sx={{background: "#1e88e5"}} elevation={10} >
          <div className="contact-item">
            <IconButton color="white" sx={{marginTop: "5px"}} component={Link} to="/kontakta" >
              <LocationOnIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor}>ADRESS</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>Östrahamngatan 13</Typography>
          </div>
          <div className="contact-item">
            <IconButton color="white" sx={{marginTop: "5px"}} component={Link} to="/kontakta" >
              <LocalPhoneIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor}>TELEFON</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>0704123456</Typography>
          </div>
          <div className="contact-item">
            <IconButton color="white" sx={{marginTop: "5px"}} component={Link} to="/kontakta" >
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.whiteTextColor}>EMAIL</Typography>
            <Typography variant="subtitle1" className={classes.whiteTextColor}>gokart.gymnasiearbete@gmail.com</Typography>
          </div>
        </Paper>

      </div>

      <div className="item">
        <img 
          src={closeup_gokart}
          className="temp"
          alt="bottomLeftImg"
          id="bottomLeftImg"
        />
        <Button id="about-gokart-btn" className="small-img-btn" variant="contained" component={Link} to="/gokarts">Våra Gokarts</Button>
      </div>
      <div className="item">
        <img 
          src={helemt}
          className="temp"
          alt="bottomRightImg"
          id="bottomRightImg"
        />
        <Button id="faq-btn" className="small-img-btn" variant="contained" component={Link} to="/fragor-och-svar" >Frågor & Svar</Button>
      </div>
    </div>
  )
}

export default HomeFeed;