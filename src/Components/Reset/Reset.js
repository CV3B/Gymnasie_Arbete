import React, { useState, useEffect } from "react";
import { auth, db, logout, sendPasswordResetEmail } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { TextField, Button, Typography, Paper } from "@mui/material";

import "./Reset.css";


function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    
  }, [loading]);
  return (
    <Paper elevation={12} className="reset">
      <div className="reset-container">
      <Typography variant="h3" >Reset password</Typography>
      <TextField
        id="reset-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="reset-item"
        variant="standard"
        placeholder="Email Address"
      />
      <Button className="reset-item" variant="contained" onClick={() => sendPasswordResetEmail(email)}>Reset password</Button>
      </div>
    </Paper>
  );
};

export default Reset;