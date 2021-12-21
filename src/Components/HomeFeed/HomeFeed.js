import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import gokart_on_track from "../../Images/gokart_on_track.jpg";
import closeup_gokart from "../../Images/closeup_gokart.jpg";
import helemt from "../../Images/helemt.jpg";

import { makeStyles } from '@mui/styles';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory 
} from "react-router-dom";

import './HomeFeed.css';
import { height } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  paperBg: {
    background: "#1e88e5",
    height: "150px",
    // width: "100px"
  }
}));

function HomeFeed() {
  const classes = useStyles()
  return(
    <div className="container">
      <div className="item">
        <img 
          src={gokart_on_track}
          className="top-img"
          alt="topImg"
        />
        <div className="btn-bg">
          <Typography gutterBottom variant="h3" component="div" sx={{ color: "#ffc400", fontWeight: "bold",}} >GOKART NAMN</Typography>
          <Button className="big-img-btn" variant="contained" color="primary" component={Link} to="/booking"><span className="aa">BOKA HÄR</span></Button>
        </div>
        
      </div>

      <div className="item">
        <Paper className="container paper-bg" sx={{background: "#1e88e5"}} elevation={10} >
          <div className="contact-item">
            <IconButton sx={{ color: "white" }} >
              <LocationOnIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>ADRESS</Typography>
            <Typography ariant="subtitle1" sx={{ color: "white" }}>GATENAMN 9</Typography>
          </div>
          <div className="contact-item">
            <IconButton sx={{ color: "white" }} >
              <LocalPhoneIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>TELEFON</Typography>
            <Typography ariant="subtitle1" sx={{ color: "white" }}>0704123456</Typography>
          </div>
          <div className="contact-item">
            <IconButton sx={{ color: "white" }} >
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>EMAIL</Typography>
            <Typography ariant="subtitle1" sx={{ color: "white" }}>info@contact.com</Typography>
          </div>
        </Paper>

      </div>


      {/* <Paper className={classes.paperBg} elevation={6} >aaa</Paper> */}


      <div className="item">
        <img 
          src={closeup_gokart}
          className="temp"
          alt="bottomRightImg"
          id="1bottomRightImg"
        />
        <Button id="about-gokart-btn" className="small-img-btn" variant="contained" component={Link} to="/gokarts">Våra Gokarts</Button>
      </div>
      <div className="item">
        <img 
          src={helemt}
          className="temp"
          alt="bottomRightImg"
          id="2bottomRightImg"
        />
        <Button id="faq-btn" className="small-img-btn" variant="contained">Frågor & Svar</Button>
      </div>
    </div>
  )
}

export default HomeFeed;