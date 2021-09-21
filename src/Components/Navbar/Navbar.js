import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './Navbar.css';
import tempLogo from "../../Images/tempLogo.jpg"
import transitions from '@material-ui/core/styles/transitions';

function TopLogo() {
  return(
    <Container fixed sx={{ postion: "fixed", }} className="logo">
			<img 
				src={tempLogo}
				alt="Logo"
			/>
    </Container>
  )
}

function Navbar() {
	const [scrolled, setScrolled] = React.useState(false);

	const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

	useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

	let navbarClasses=['navbar'];
  if(scrolled){
    navbarClasses.push('scrolled');
  }



  return(
		<Box>
			<TopLogo />
    	<nav >
				{/* <Slide in={scrolled} style={{ transformOrigin: '0 0 0' }}{...(scrolled ? { timeout: 1000 } : { timeout: 500 })}> */}
				<div className={navbarClasses.join(" ") } >
					<Grow in={scrolled} style={{ transformOrigin: '0 0 0' }}{...(scrolled ? { timeout: 1000 } : { timeout: 500 })}>
						<img 
							src={tempLogo}
							className="logo-img"
							// style={{ display: scrolled ? "block" : "none" }}
							alt="temp-logo"
						/>
					</Grow>
					{/* <Stack > */}
					{/* <Grid container className="buttons" spacing={3} justifyContent="center" alignItems="center"> */}
						<Grid item><Button variant="text" color="inherit">BUTTON</Button></Grid>
						<Grid item><Button variant="text" color="inherit">BUTTON</Button></Grid>
						<Grid item><Button variant="text" color="inherit">BUTTON</Button></Grid>
					{/* </Grid> */}
					{/* </Stack> */}
				</div>
				{/* </Slide> */}
    	</nav>
		</Box>
  )
}

export default Navbar;