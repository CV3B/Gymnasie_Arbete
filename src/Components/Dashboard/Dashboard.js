import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import Alert from '@mui/material/Alert';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  let showUnauthorizedAlert = false;

  const fetchUserData = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      setIsAdmin(data.roles.Admin);

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

  const errorAlert = () => {
    return showUnauthorizedAlert ? (<Alert variant="filled" severity="error">Du har inte tillgång till den här komponenten!</Alert>) : null
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    
    // errorAlert()
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
        <button onClick={() => console.log(showUnauthorizedAlert)}>DEBUG</button>
        <button onClick={namnFunc}>Admin</button>
        
      </div>
    </div>
  );
}

export default Dashboard;