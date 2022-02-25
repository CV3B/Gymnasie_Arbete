import React from "react";

//* Components imports *//
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
import Login from './Components/Login/Login';
import Reset from './Components/Reset/Reset';
import Register from './Components/Register/Register';

//* React router dom imports *//
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//* Mui imports *//
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { Paper } from '@mui/material';

//* Css imports *//
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';


//* Inställningar: det går att ändra på tiderna som är till andra tider och ta bort tider

// TODO "" ''
// TODO imports if() if () ID NAM ... - ...

//* Färg temat för hemsidan *//
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
    },
    darkGrey: {
      main: "#474747"
    }
  }
});

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
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/" >
                <HomeFeed/>
              </Route>
              <Route exact path="/login" >
                <Login />
              </Route>
              <Route exact path="/reset" >
                <Reset />
              </Route>
              <Route exact path="/register" component={Register} />
              <Route exact path="/bokning" >
                <Calendar editMode={false} />
              </Route>
              <Route exact path="/kontakta" >
                <PaperBackground text={
                  <Contact />
                } />
              </Route>
              <Route exact path="/om-oss" >
                <AboutUs />
              </Route>
              <Route exact path="/gokarts" >
                <PaperBackground text={
                  <AboutGokarts />
                } />
              </Route>
              <Route exact path="/fragor-och-svar" >
                <Faq />
              </Route>
              <Route exact path="/banor" >
                <PaperBackground text={
                  <TrackInfo />
                } />
              </Route>
              <Route exact path="/dashboard" >
                <Dashboard />
              </Route>
              <Route exact path="/dashboard/admin_panel" component={AdminPanel} />
            </Switch>
            <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
