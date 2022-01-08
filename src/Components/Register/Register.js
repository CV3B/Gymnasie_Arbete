import React, { useEffect, useState } from "react";
import { Paper, Button, Typography, TextField } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../Firebase/Firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <Paper elevation={12} className="register">
      <div className="register-container">
        <Typography variant="h3" >Register</Typography>
        <TextField
          type="text"
          className="register-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          variant="standard"

        />
        <TextField
          type="text"
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
        {/* <button
          className="register__btn register__google"
        >
          Register with Google
        </button> */}

        <Typography className="register-item"  >
          Already have an account? <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>Login</Link> now.
        </Typography>
      </div>
    </Paper>
  );
}

export default Register;