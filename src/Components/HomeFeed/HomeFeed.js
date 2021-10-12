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

import './HomeFeed.css';

function HomeFeed() {

  return(
    <Box sx={{ flexGrow: 1}}>
      <Stack className="container">
        <Grid item xs={12} >
          <img 
            src={gokart_on_track}
            className="top-img"
            alt="topImg"
          />
          <div className="btn-bg">
            <Typography gutterBottom variant="h3" component="div" sx={{ color: "#ffc400"}} ><Box className="company-name">GOKART NAMN</Box></Typography>
            <Button className="big-img-btn" variant="contained" color="primary">BOKA HÄR</Button>
          </div>
        </Grid>
      </Stack>
      <Stack direction="row">
        <Grid item xs={12}>
          {/* <Paper elevation={6} sx={{height: 150, marginTop: 2, marginBottom: 2, backgroundColor: "#1e88e5"}}  > */}
          <div className="paper-bg">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              > 
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>             
                  <IconButton sx={{ color: "white" }} >
                    <LocationOnIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="h6" sx={{ color: "white" }}>ADRESS</Typography>
                  <Typography ariant="subtitle1" sx={{ color: "white" }}>GATENAMN 9</Typography>
                </Grid>
                <Divider orientation="vertical" />
                <Grid item>
                  <IconButton sx={{ color: "white" }} >
                    <LocalPhoneIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="h6" sx={{ color: "white" }}>TELEFON</Typography>
                  <Typography ariant="subtitle1" sx={{ color: "white" }}>0704123456</Typography>
                </Grid>
                <Grid item> 
                  <IconButton sx={{ color: "white" }} >
                    <EmailIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="h6" sx={{ color: "white" }}>EMAIL</Typography>
                  <Typography ariant="subtitle1" sx={{ color: "white" }}>info@contact.com</Typography>
                </Grid>
              </Grid>
              </Stack>
            </div>
          {/* </Paper> */}
        </Grid>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
        <Grid item xs={6}>
          <img 
            src={closeup_gokart}
            className="temp"
            alt="bottomRightImg"
          />
          <Button className="small-img-btn" variant="contained">Våra Gokarts</Button>
        </Grid>
        <Grid item xs={6}>
          <img 
            src={helemt}
            className="temp"
            alt="bottomRightImg"
          />
          <Button className="small-img-btn" variant="contained">Frågor & Svar</Button>
        </Grid>
      </Stack>
    </Box>
  )
}

export default HomeFeed;