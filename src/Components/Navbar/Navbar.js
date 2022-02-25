import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Link, } from "react-router-dom";

import tempLogo from "../../Images/tempLogo.jpg"

import './Navbar.css';

function TopLogo() {
	if(!window.matchMedia("(max-width: 600px)").matches){
		return(
			<Container fixed sx={{ postion: "fixed", }} className="logo"> 
			<Link to="/">
				<img 
					src={tempLogo}
					alt="Logo"
				/>
			</Link>
			</Container>
		)
	} else return(null)
  
}

function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
    const offset = window.scrollY;
		if(!window.matchMedia("(max-width: 600px)").matches) {
			if(offset > 200){
				setScrolled(true);
	
			}
			else {
				setScrolled(false);
	
			}
		}
    
  }

	const handleMedia = () => {
		if(window.matchMedia("(max-width: 600px)").matches){
			setScrolled(true);
			
		}
	}

	useEffect(() => {
    window.addEventListener('scroll', handleScroll)
		handleMedia()

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
				<div className="nav-container">

					<Grow in={scrolled} style={{ transformOrigin: '0 0 0' }}{...(scrolled ? { timeout: 1000 } : { timeout: 500 })}>
						<Link to="/"> 
						<img 
							src={tempLogo}
							className="logo-img"
							alt="temp-logo"
						/>
						</Link>
					</Grow>
						<div className="nav-btns">
							<Button id="nav-button" component={Link} to="/gokarts" variant={scrolled ? "text" : "contained"} color={scrolled ? "inherit" : "primary"}>Gokarts</Button>
							<Button id="nav-button" component={Link} to="/banor" variant={scrolled ? "text" : "contained"} color={scrolled ? "inherit" : "primary"}>Banor</Button>
							<Button id="nav-button" component={Link} to="/kontakta" variant={scrolled ? "text" : "contained"} color={scrolled ? "inherit" : "primary"}>Kontakta</Button>
						</div>
					</div>
				</div>
    	</nav>
		</Box>
  )
}

export default Navbar;