import React, { useEffect, useState } from "react";

//* Firebase imports *// 
import { auth, db } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import AlertBar from "../Firebase/Firebase";

//* React router imports *//
import { useHistory } from "react-router";

//* Det går bara att kommer åt detta element om anvädaren har rolen "admin" *//
function AdminPanel() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(true);

  const history = useHistory();

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setIsAdmin(pDoc.roles.Admin);
      });
      
    } catch (err) {
      console.error(err);
      setAlertOpen(true)
    }
  };
  
  useEffect(() => {
    if(loading) return;
    if(!isAdmin) return history.replace("/dashboard");

    fetchUserData()
  }, [isAdmin, loading]);

  console.log(error)
  return(
    <div>
      <h1>ADMIN PANEL</h1>
      <AlertBar message={"An error occured while fetching user data"} open={alertOpen} setOpen={setAlertOpen} />
    </div>
  )
}

export default AdminPanel;