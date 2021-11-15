import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";


function AdminPanel() {

  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(true);

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setIsAdmin(pDoc.roles.Admin);
      });
      // console.log("FUNC ROLE: " + !data.roles.Admin);
      // console.log(data);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };
  
  useEffect(() => {
    if(loading) return;
    if(!isAdmin) return history.replace("/dashboard");

    fetchUserData()
  }, [isAdmin, loading]);

  return(
    <div>
      <h1>ADMIN PANEL</h1>
    </div>
  )
}

export default AdminPanel;