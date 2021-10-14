import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import './Footer.css';


function Footer(){

  return(
    <Grid container alignItems="flex-end">
          <Grid className="footer" container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                <h4 as='a'>Sitemap</h4>
                <h4 as='a'>Contact Us</h4>
                <h4 as='a'>Religious Ceremonies</h4>
                <h4 as='a'>Gazebo Plans</h4>
            </Grid>
            <Grid item xs={3}>
                <h4 as='a'>Banana Pre-Order</h4>
                <h4 as='a'>DNA FAQ</h4>
                <h4 as='a'>How To Access</h4>
                <h4 as='a'>Favorite X-Men</h4>
            </Grid>
            <Grid item xs={6}>
              <header as='h4' inverted>
                Footer header
              </header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid>
          </Grid>
      </Grid>
  )
}

export default Footer;