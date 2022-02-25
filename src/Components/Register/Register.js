import React, { useEffect, useState } from "react";

//* Firebase imports *//
import { auth, registerWithEmailAndPassword } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AlertBar from "../Firebase/Firebase";

//* Other imports *//
import { Paper, Button, Typography, TextField } from "@mui/material";

import { Link, useHistory } from "react-router-dom";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [alertOpen, setAlertOpen] = useState(false);

  const history = useHistory();

  const register = () => {
    if(!name) setAlertOpen(true);
    registerWithEmailAndPassword(name, email, password);

  };

  useEffect(() => {
    if(loading) return;
    if(user) history.replace("/dashboard");
    
  }, [user, loading]);

  return (
    <Paper elevation={12} className="register">
      <div className="register-container">
        <Typography variant="h3" >REGISTER</Typography>
        <TextField
          type="text"
          className="register-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          variant="standard"
        />
        <TextField
          type="email"
          className="register-item"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          variant="standard"

        />
        <TextField
          type="password"
          className="register-item"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          variant="standard"

        />
        <Button variant="contained" className="register-item" onClick={register} >
          Register
        </Button>
        <Typography className="register-item" >
          <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>Already have an account? Login now.</Link> 
        </Typography>
      </div>
      <AlertBar message={"Please enter name"} open={alertOpen} setOpen={setAlertOpen} />
    </Paper>
  );
}

export default Register;