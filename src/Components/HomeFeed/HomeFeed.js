import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import imgGokart01 from "../../Images/mainfeed_gokart01.jpg";

import './HomeFeed.css';

//TODO Fixa överlappande HomeFeed till Navbaren för att centrera nav knapparna

function HomeFeed() {

  return(
    <Box sx={{ flexGrow: 1}}>
        <Stack>
          <Grid item xs={12}>
            <img 
              src={imgGokart01}
              className="top-img"
              alt="topImg"
            />
          </Grid>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
        <Grid item xs={6}>
          <Paper className="temp" style={{backgroundColor: "black"}} ></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="temp" style={{backgroundColor: "black"}}></Paper>
        </Grid>
        </Stack>
    </Box>
  )
}

export default HomeFeed;