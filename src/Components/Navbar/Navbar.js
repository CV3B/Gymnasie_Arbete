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
				<div className={navbarClasses.join(" ") } >
					<Grow in={scrolled} style={{ transformOrigin: '0 0 0' }}{...(scrolled ? { timeout: 1000 } : { timeout: 500 })}>
						<img 
							src={tempLogo}
							className="logo-img"
							alt="temp-logo"
						/>
					</Grow>
					<Slide direction="left" in={true} timeout={400}>
					<div className="btns">
						<Button id="nav-button" variant="text" color="inherit">BUTTON</Button>
						<Button id="nav-button" variant="text" color="inherit">BUTTON</Button>
						<Button id="nav-button" variant="text" color="inherit">BUTTON</Button>
					</div>
					</Slide>
				</div>
    	</nav>
		</Box>
  )
}

export default Navbar;