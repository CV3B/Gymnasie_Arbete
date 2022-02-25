import React, { useEffect, useState } from "react";

//* MUI imports *//
import { Paper, Button, Typography, Divider } from "@mui/material";

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

//* Firebase imports *//
import { auth, db, logout } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import AlertBar from "../Firebase/Firebase";

//* Other imports *//
import Calendar from "../Calendar/Calendar";
import Reset from "../Reset/Reset";
import BookingsDisplay from "../Calendar/Booking/BookingsDisplay"; 
import { useHistory } from "react-router";

//* CSS imports *//
import "./Dashboard.css";


function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState();
  const [alertOpen, setAlertOpen] = useState(false);

  const history = useHistory();


  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setName(pDoc.data()["name"]);
        // setIsAdmin(pDoc.data()["role"]["Admin"]);
      });

    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  // const handleAdminPanel = () => {
  //   if (isAdmin) {
  //     history.replace("/dashboard/admin_panel")
  //   } 
  // }

  function renderSwitch(selected) {
    switch(selected) {
      case "settings":
        return (<TestDisplay />);
      case "calendar":
        return (<CalendarDisplay />);
      case "accountSettings":
        return (<AccountSettings name={name} />);
      case "bookingsDisplay":
        return (<BookingsDisplay />);
      default:
        return(<CalendarDisplay />)
    }
  }
 
  useEffect(() => {
    if(loading) return;
    if(!user) return history.replace("/login");
    // if (!userRole.Admin) return history.replace("/");
    
    fetchUserData();
  }, [user, loading]); //? userRole


  return (
    <div className="first-dashboard-container">
      <div id="mySidenav" className="sidenav">
        <Button size="large" onClick={() => setSelectedDisplay("accountSettings") } startIcon={<AccountCircleIcon />} color="white" >{name[0]}.{name.split(" ").pop()}</Button>
        <Divider variant="middle" color="white" />
        <a><Button onClick={() => setSelectedDisplay("bookingsDisplay") } startIcon={<FormatListBulletedIcon />} color="white" >Bokningar</Button></a>
        <a><Button onClick={() => setSelectedDisplay("calendar") } startIcon={<CalendarTodayIcon />} color="white" >Kalender</Button></a>
        <a><Button onClick={() => setSelectedDisplay("settings") } startIcon={<SettingsIcon />} color="white" >Inställningar</Button></a>
        <div className="sidebar-footer" >
          <Divider variant="middle" color="white" />
          <Button onClick={() => logout} startIcon={<LogoutIcon />} color="white" >Logout</Button>
        </div>
      </div>
      <Paper elevation={12} className="dashboard">
          {renderSwitch(selectedDisplay)}
      </Paper>
      <AlertBar message={"An error occured while fetching user data"} open={alertOpen} setOpen={setAlertOpen} />
    </div>
  );
}

function TestDisplay() {
  return(
    <div>
      Under konstruktion
      {/* <button onClick={handleAdminPanel}>Admin</button> */}
    </div>
  )
}

function CalendarDisplay() {
  return(
    <Calendar editMode={true} />
  )
}

function AccountSettings(props) {
  return(
    <>
      <Typography variant="h4" sx={{ marginBottom: "40px", paddingTop: "20px"}} >{props.name}</Typography>
      <Reset />
    </>
  )
}

export default Dashboard;