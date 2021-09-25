import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

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
        <Stack>
          <Grid item xs={12}>
            <img 
              src={gokart_on_track}
              className="top-img"
              alt="topImg"
            />
          </Grid>
        </Stack>
        <Stack>
          <Grid item xs={12}>
            <Paper elevation={6} sx={{height: 150, marginTop: 1, marginBottom: 2,}} style={{backgroundColor: "white"}} >Hitta</Paper>
          </Grid>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
        <Grid item xs={6}>
          <img 
            src={closeup_gokart}
            className="temp"
            alt="bottomRightImg"
          />
        </Grid>
        <Grid item xs={6}>
          <img 
            src={helemt}
            className="temp"
            alt="bottomRightImg"
          />
        </Grid>
        </Stack>
    </Box>
  )
}

export default HomeFeed;