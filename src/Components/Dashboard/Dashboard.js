import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import Alert from '@mui/material/Alert';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";
import { Paper, IconButton, Button, Typography, Divider } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Dashboard.css";
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Calendar from "../Calendar/Calendar";
import Reset from "../Reset/Reset";
import LogoutIcon from '@mui/icons-material/Logout';
import BookingsDisplay from "../Calendar/Booking/BookingsDisplay"; 


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState()
  const history = useHistory();
  let showUnauthorizedAlert = false;

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setName(pDoc.data()["name"]);
        setIsAdmin(pDoc.data()["role"]["Admin"]);
      });
      

    } catch (err) {
      console.error(err);
    }
  };

  const namnFunc = () => {
    if (isAdmin) {
      history.replace("/dashboard/admin_panel")
    } 
    
    // else {
    //   showUnauthorizedAlert = true;
    //   console.log(showUnauthorizedAlert);
    //   setTimeout(function(){ showUnauthorizedAlert = false; }, 5000);
    // }
  }

  // const errorAlert = () => {
  //   return showUnauthorizedAlert ? (<Alert variant="filled" severity="error">Du har inte tillgång till den här komponenten!</Alert>) : null
  // }


  function renderSwitch(selected) {
    switch(selected) {
      case "settings":
        return (<TestDisplay />);
      case "calendar":
        return (<CalendarDisplay />);
      case "accountSettings":
        return (<AccountSettings />);
      case "bookingsDisplay":
        return (<BookingsDisplay />);
      default:
        return(<div>Hej default</div>)
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    
    // errorAlert()
    fetchUserData();
  }, [user, loading]); //? userRole

  // if (!userRole.Admin) return history.replace("/");

  return (
    <div className="first-dashboard-container">
    <div id="mySidenav" class="sidenav">
    {/* <div className="dashtest"><AccountCircleIcon color="white" sx={{float: "left", }} /><Typography sx={{color: "#ffffff", marginBottom: "6px", textAlign: "left"}} ></Typography></div> */}
    <a><Button size="large" onClick={() => setSelectedDisplay("accountSettings") } startIcon={<AccountCircleIcon />} color="white" >{name[0]}.{name.split(" ").pop()}</Button></a>
      <Divider variant="middle" color="white" />
      <a><Button  onClick={() => setSelectedDisplay("bookingsDisplay") } startIcon={<FormatListBulletedIcon />} color="white" >Bokningar</Button></a>
      <a><Button onClick={() => setSelectedDisplay("calendar") } startIcon={<CalendarTodayIcon />} color="white" >Kalender</Button></a>
      <a><Button onClick={() => setSelectedDisplay("settings") } startIcon={<SettingsIcon />} color="white" >Inställningar</Button></a>
      <div className="sidebar-footer" >
        <Divider variant="middle" color="white" />
        <Button onClick={() => logout} startIcon={<LogoutIcon />} color="white" >Logout</Button>
      </div>
      

    </div>

    <Paper elevation={12} className="dashboard">
    
    

      {/* <div className="dashboard-container"> */}
        {renderSwitch(selectedDisplay)}
        
      {/* </div> */}
    </Paper>
    </div>
  );
}

function TestDisplay() {

  return(
    <div>
      Logged in as
        {/* <div>{name}</div> */}
        {/* <div>{user?.email}</div> */}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        {/* <button onClick={() => console.log(name[0])}>DEBUG</button> */}
        {/* <button onClick={namnFunc}>Admin</button> */}
    </div>
  )
}

function CalendarDisplay() {

  return(
    <Calendar editMode={true} />
  )
}

function AccountSettings() {

  return(
      <Reset />
  )
}

// function BookingsDisplay() {
  
//   return(
//     <></>
//   )
// }

export default Dashboard;