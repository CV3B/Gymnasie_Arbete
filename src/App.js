import './App.css';
import Calendar from './Components/Calendar/Calendar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HomeFeed from './Components/HomeFeed/HomeFeed';

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




const theme = createTheme({
  palette: {
    primary: {
      main: "#43a047",
      light: "#76d276",
      dark: "#00701c"
    },
    secondary: {
      main: "#e040fb",
      light: "#ff79ff",
      dark: "#aa00c7",
    }
  }
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Calendar /> */}
        {/* <Navbar />
        <HomeFeed />
        <Footer /> */}
        <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
  );
}



function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  const history = useHistory();

  const fetchUserData = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      setUserRole(!data.roles.Admin);
      // console.log(data.roles);
      // console.log(data);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user || userRole) return history.replace("/");
    //* if false and false => logout => true and false https://stackoverflow.com/questions/57853288/react-warning-maximum-update-depth-exceeded
    // console.log(userRole.Admin);

    fetchUserData();
  }, [user, loading]); //? userRole

  // if (!userRole.Admin) return history.replace("/");

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <button onClick={() => console.log(userRole)}>DEBUG</button>
      </div>
    </div>
  );
}

export default App;
