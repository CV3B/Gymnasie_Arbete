import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function AdminPanel() {

  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserData = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setIsAdmin(data.roles.Admin);
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