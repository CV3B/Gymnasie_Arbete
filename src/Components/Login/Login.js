import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button, Typography, Paper } from "@mui/material";


import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <Paper elevation={12} className="login">
      <div className="login-container">
        <Typography variant="h3" >LOGIN</Typography>
        {/* <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        /> */}
        <TextField
        id="email"
        label="Email"
        className="login-item"
        InputLabelProps={{
          shrink: true,
        }}
        value={email}
        variant="standard"
        placeholder="Email Address"
        size="large"
        onChange={e => setEmail(e.target.value)}
        sx={{ margin: "4px"}}
       />
        <TextField
        id="password"
        label="Lösenord"
        className="login-item"
        InputLabelProps={{
          shrink: true,
        }}
        type="password"
        value={password}
        variant="standard"
        placeholder="Lösenord"
        size="large"
        onChange={e => setPassword(e.target.value)}
        sx={{ margin: "4px"}}
      />
        {/* <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /> */}
        
        <Button
          className="login-item"
          onClick={() => signInWithEmailAndPassword(email, password)}
          variant="contained"
        >
          Login
        </Button>
        
        <div className="login-item">
          <Typography>
            <Link to="/reset" style={{ textDecoration: 'none', color: "inherit" }} >Forgot Password</Link>
          </Typography>
          {/* <Typography>
            Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: "inherit"}} >Register</Link> now.
          </Typography> */}
        </div>
        {/* <Button className="login__btn login__google" >
          Login with Google
        </Button> */}
        
      </div>
    </Paper>
  );
}

export default Login;