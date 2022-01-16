import './App.css';
import Calendar from './Components/Calendar/Calendar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HomeFeed from './Components/HomeFeed/HomeFeed';
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminPanel from './Components/AdminPanel/AdminPanel';
import AboutGokarts from "./Components/OtherPages/AboutGokarts/AboutGokarts";
import Faq from "./Components/OtherPages/Faq/Faq";
import TrackInfo from "./Components/OtherPages/TrackInfo/TrackInfo";
import AboutUs from "./Components/OtherPages/AboutUs/AboutUs";
import Contact from './Components/OtherPages/Contact/Contact';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Components/Login/Login';
import Reset from './Components/Reset/Reset';
import Register from './Components/Register/Register';
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { Paper } from '@mui/material';
// import theme from './Components/Theme/';

//! TA BORT
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "./Components/Firebase/Firebase";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// TODO Titta på alla CSS namn så att det inte finns två av samma
// TODO Link är bara på ett eller flera ord, istället för hela meningen (Login, Register)
////  Skicka mail via kontakt sidan
////  DB spara antal personer samt visa de i "Bokningar", sök ruta?
//? Sök ruta i Bokingar
// TODO Beställa x antal åk 
// TODO Rensa DB ifall tom eller x dagar
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5",
      light: "#6ab7ff",
      dark: "#005cb2"
    },
    secondary: {
      main: "#ffc400",
      light: "#fff64f",
      dark: "#c79400",
    },
    white: {
      main: "#ffffff"
    }
  }
});

/*
light
main #454F4F
dark #394141
*/

function PaperBackground(props){

  const { text } = props

  return(
    <Paper elevation={12} sx={{padding: "20px", margin: "10px"}}>
      {text}
    </Paper>
  )
}

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Calendar /> */}
        {/* <HomeFeed /> */}
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/" >
                <HomeFeed/>
                {/* <Footer /> */}
              </Route>
              <Route exact path="/login" >
                <Login />
              </Route>
              <Route exact path="/reset" >
                <Reset />
              </Route>
              <Route exact path="/register" component={Register} />
              <Route exact path="/booking" >
              <PaperBackground text={
                  <Calendar editMode={false} />
                } />
                
              </Route>
              <Route exact path="/contact" >
                <PaperBackground text={
                  <Contact />
                } />
              </Route>
              <Route exact path="/about_us" >
                <AboutUs />
              </Route>
              <Route exact path="/gokarts" >
                <PaperBackground text={
                  <AboutGokarts />
                } />
              </Route>
              <Route exact path="/faq" >
                <Faq />
              </Route>
              <Route exact path="/tracks" >
                <PaperBackground text={
                  <TrackInfo />
                } />
              </Route>
              <Route exact path="/dashboard" >
                <Dashboard />
              </Route>
              <Route exact path="/dashboard/admin_panel" component={AdminPanel} />
            </Switch>
            {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
