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
import Register from './Components/Register/Register';
import {ThemeProvider, createTheme} from "@mui/material/styles";
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
//* Få skaer att popa ut från skärmen (HomeFeed Contact tre delarna popar ut)

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
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/booking" >
                <Calendar ISNAMN={false} />
              </Route>
              <Route exact path="/contact" >
                <Contact />
              </Route>
              <Route exact path="/about_us" >
                <AboutUs />
              </Route>
              <Route exact path="/gokarts" >
                <AboutGokarts />
              </Route>
              <Route exact path="/faq" >
                <Faq />
              </Route>
              <Route exact path="/tracks" >
                <TrackInfo />
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
