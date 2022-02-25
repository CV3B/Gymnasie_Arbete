import React from 'react';

//* MUI imports *//
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';

import { makeStyles } from '@mui/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';


import {Link} from "react-router-dom"

import './Footer.css';

const useStyles = makeStyles((theme) => ({
  textHover: {
    '&:hover': {
      transition: "0.3s",
      textDecoration: 'underline',
      color: "#1e88e5",

    },
  }
}));

function Footer(){
  const classes = useStyles();

  return(
    <Grid container alignItems="flex-end" sx={{marginTop: "10px"}}>
          <Grid className="footer" container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} >
              <Typography gutterBottom variant="h6" className={classes.textHover} >
                <Link to="/reset" style={{ textDecoration: 'none', color: "inherit" }} >Kontakta</Link>
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" className={classes.textHover} >
                <Link to="/reset" style={{ textDecoration: 'none', color: "inherit" }} >Boka</Link>
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" className={classes.textHover} >
                <Link to="/reset" style={{ textDecoration: 'none', color: "inherit" }} >Våra gokarts</Link>
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" className={classes.textHover} >
                <Link to="/om-oss" style={{ textDecoration: 'none', color: "inherit" }} >Om oss</Link>
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" className={classes.textHover} >
                <Link to="/reset" style={{ textDecoration: 'none', color: "inherit" }} >Frågor och svar</Link>
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
              <header as='h4' inverted>
                Extra
              </header>
              <p>
                Extra plats
              </p>
            </Grid>
            <Grid item xs={12}>
              <IconButton color="darkGrey">
                <FacebookIcon fontSize="large" />
              </IconButton>

              <IconButton color="darkGrey">
                <TwitterIcon fontSize="large"/>
              </IconButton>

              <IconButton color="darkGrey">
                <InstagramIcon fontSize="large"/>
              </IconButton>
            </Grid>
          </Grid>
      </Grid>
  );
}

export default Footer;