import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SnackBarAlert from "../../components/SnackBarAlert";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hooks-helper";
import {  Redirect } from "react-router-dom";
import FloatCard from "../../components/FloatCard";
import axios from "axios";
import BACKEND_URL from "../../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
  },
  content: {
    padding: 10,
    justifyContent: "center",
    display: "grid",
    justifyItems: "center",
  },
  container: {
    width: "100%",
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  overlay: {
    minHeight: "100vh",
  },
  background: {
    backgroundColor: theme.palette.lightSkyBlue,
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
  },
  avatar: {
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 20,
    display: "contents",
  },
  submit: {
    width: "30%",
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    margin: " 5% 35% 5% 35%",
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  media: {
    height: "60vh",
    backgroundSize: "contain",
  },
  logo: {
    height: 40,
  },
  iconLogo: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  textField: {
    margin: 10,
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginBottom: 20,
    fontWeight: 500,
  },
  link: {
    cursor: "pointer",
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "end",
  },
  forgotPwd: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: 15,
    },
  },
  containedGrid: {
    margin: "1em",
  },
  signUp: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

function SignInSide() {
  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };
  const handleAlert = () => {
    setAlertShow(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  // Form data register
  const loginObject = {
    email: "",
    password: "",
  };
  const registrationObject = {
    fullname: "",
    email: "",
    mobile: "",
    dob: "2000-01-01",
    street: "",
    city: "",
    district: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setForm] = useForm(loginObject);
  const [registration, setRegistration] = useForm(registrationObject);
  const login = (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(`${BACKEND_URL}/api/signin`, loginData)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("userToken", res.data.token);
          const jwt = require("jsonwebtoken");
          const token = sessionStorage.getItem("userToken");
          const header = jwt.decode(token, { complete: true });
          if (header.payload) {
            window.location = "/";
          } else {
            setAlertData({
              severity: "error",
              msg: "Bad email or password!",
            });
            handleAlert();
          }
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setAlertData({
            severity: "error",
            msg: "Failed to connect with server!",
          });
          handleAlert();
        } else {
          setAlertData({
            severity: "error",
            msg: "Bad email or password!",
          });
          handleAlert();
        }
      });
  };
  const register = (e) => {
    e.preventDefault();
    const registerData = {
      name: registration.fullname,
      email: registration.email,
      mobile: registration.mobile,
      dob: new Date(registration.dob),
      address: {
        street: registration.street,
        city: registration.city,
        district: registration.district,
      },
      password: registration.password,
      password_confirmation: registration.confirmPassword,
      dateRegistered: new Date(),
    };
    axios
      .post(`${BACKEND_URL}/api/signup`, registerData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "You have successfully registered!",
          });
          handleAlert();
        } else {
          setAlertData({
            severity: "error",
            msg: "Error!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Erjhgror!",
          });
          handleAlert();
        }
      });
  };

  const classes = useStyles();

  if (sessionStorage.getItem("userToken")) {
    return <Redirect to="/" />;
  }

  return (
    <Card className={classes.root}>
      {displayAlert()}
      <CardContent className={classes.content}>
        <Grid
          container
          direction="row"
          spacing={3}
          justify="space-between"
          alignItems="center"
          style={{ maxWidth: "100%" }}
        >
          {/* Login Card */}
          <Grid item xs={12} sm={5} className={classes.containedGrid}>
            <FloatCard>
              <div className={classes.paper}>
                {/* Title */}
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  Log In
                </Typography>
                <Typography>
                  If you are already registered, please login directly here
                </Typography>

                {/* Login Form */}
                <form className={classes.form} onSubmit={login}>
                  <TextField
                    required
                    name="email"
                    onChange={setForm}
                    value={formData.email}
                    id="outlined-required"
                    label="Email Address"
                    type="email"
                    className={classes.textField}
                  />
                  <TextField
                    required
                    name="password"
                    onChange={setForm}
                    value={formData.password}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                  />

                  <Button type="submit" fullWidth className={classes.submit}>
                    Log In
                  </Button>
                </form>
              </div>
            </FloatCard>
          </Grid>

          {/* Register Card */}
          <Grid item xs={12} sm={6} className={classes.containedGrid}>
            <FloatCard>
              <div className={classes.paper}>
                {/* Title */}
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  Registration
                </Typography>

                {/* Registration Form */}
                <form className={classes.form} onSubmit={register}>
                  <TextField
                    required
                    name="fullname"
                    onChange={setRegistration}
                    value={registration.fullname}
                    label="Full Name"
                    type="fullname"
                    className={classes.textField}
                  />
                  <TextField
                    required
                    name="email"
                    onChange={setRegistration}
                    value={registration.email}
                    label="Email"
                    type="email"
                    autoComplete="current-password"
                    className={classes.textField}
                  />
                  <Grid container>
                    <Grid item md={6}>
                      <TextField
                        required
                        name="mobile"
                        onChange={setRegistration}
                        value={registration.mobile}
                        label="Mobile Number"
                        type="mobile"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="dob"
                        onChange={setRegistration}
                        value={registration.dob}
                        label="Date of Birth"
                        type="date"
                        className={classes.textField}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="street"
                        onChange={setRegistration}
                        value={registration.street}
                        label="Street"
                        type="street"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="city"
                        onChange={setRegistration}
                        value={registration.city}
                        label="City"
                        type="city"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="district"
                        onChange={setRegistration}
                        value={registration.district}
                        label="District"
                        type="district"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={6}>
                      <TextField
                        required
                        name="password"
                        onChange={setRegistration}
                        value={registration.password}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        required
                        name="confirmPassword"
                        onChange={setRegistration}
                        value={registration.confirmPassword}
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth className={classes.submit}>
                    Submit
                  </Button>
                </form>
              </div>
            </FloatCard>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SignInSide;
