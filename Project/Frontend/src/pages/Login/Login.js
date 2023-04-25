import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import { Link, redirect } from "react-router-dom";

const Login = ({ handleChange }) => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          return navigate("/");
        } else {
          return navigate("/myposts");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "88%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  const boxStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Grid item xs={12} sm={6} md={3}></Grid>
            {/* <Avatar style={avatarStyle}>
              
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <h1>Educational App</h1> */}
            {/* <Box sx={boxStyle}> */}
            <Typography
              variant="h5"
              align="center"
              style={{ fontWeight: 600, marginBottom: 20 }}
            >
              Educational <span style={{ color: "blue" }}>App</span>
            </Typography>
            {/* </Box> */}
            {/* <h2>Sign in</h2> */}
            {isLoginError ? (
              <Alert severity="error" sx={{ margin: "1em" }}>
                Invalid Login Credentials!
              </Alert>
            ) : null}
          </Grid>
          <form onSubmit={handleSignin}>
            <TextField
              variant="filled"
              label="Username"
              name="username"
              value={details.username}
              required
              onChange={changeHandler}
              placeholder="Enter username"
              fullWidth="true"
              margin="10 px"
            ></TextField>
            <TextField
              variant="filled"
              label="Password"
              name="password"
              value={details.password}
              required
              placeholder="Enter password"
              type="password"
              onChange={changeHandler}
              fullWidth="true"
            ></TextField>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth="true"
              style={buttonStyle}
            >
              Sign in
            </Button>
          </form>
          <Typography>
            <Link to="/pc">Forgot Password?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account?
            <Link href="#" onClick={() => handleChange("event", 1)}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
