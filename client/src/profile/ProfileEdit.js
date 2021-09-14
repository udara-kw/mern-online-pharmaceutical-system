import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hooks-helper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SnackBarAlert from "../components/SnackBarAlert";
import "./styles/Profile.css";
import Lottie from "react-lottie";
import HeroImage from "../components/lotties/heroimage";
import Loading from "../components/Loading";
import axios from "axios";
import BACKEND_URL from "../Config";
const jwt = require("jsonwebtoken");
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
  textField: {
    alignSelf: "center",
    marginTop: "1em",
  },
  h2: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  h4: {
    color: theme.palette.black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  lottie: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  postJobSection: {
    minWidth: "100%",
  },
  featuredOrganizations: {
    minWidth: "100%",
  },
  rightSubColumn: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "fit-content",
      paddingTop: 24,
    },
  },
}));

function ProfileEdit(props) {
  const classes = useStyles();
  const token = sessionStorage.getItem("userToken");
  const userData = jwt.decode(token, { complete: true }).payload;

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

  const defaultData = {
    fullName: props.info.fullName,
    email: props.info.email,
    mobile: props.info.mobile,
    dob: props.info.dob.slice(0, 10),
    street: props.info.address.street,
    city: props.info.address.city,
    district: props.info.address.district,
  };
  const [formData, setForm] = useForm(defaultData);
  const updateProfile = (e) => {
    e.preventDefault();
    const updateData = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dob,
      address: {
        street: formData.street,
        city: formData.city,
        district: formData.district,
      },
    };
    axios
      .put(`${BACKEND_URL}/users/update/${userData.userId}`, updateData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Update Successful!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to update profile!",
          });
          handleAlert();
        }
      });
  };
  return (
    <form className={classes.form} onSubmit={updateProfile}>
      {displayAlert()}
      <Grid container>
        <Grid item md={12}>
          <TextField
            required
            name="fullName"
            onChange={setForm}
            value={formData.fullName}
            label="Full Name"
            type="text"
            className={classes.textField}
            fullWidth
          />{" "}
        </Grid>{" "}
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <TextField
            required
            name="email"
            onChange={setForm}
            value={formData.email}
            label="Email"
            type="email"
            autoComplete="current-password"
            className={classes.textField}
            fullWidth
          />{" "}
        </Grid>{" "}
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <TextField
            required
            name="mobile"
            onChange={setForm}
            value={formData.mobile}
            label="Mobile Number"
            type="text"
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            name="dob"
            onChange={setForm}
            value={formData.dob}
            label="Date of Birth"
            type="date"
            className={classes.textField}
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <TextField
            required
            name="street"
            onChange={setForm}
            value={formData.street}
            label="Street"
            type="street"
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            name="city"
            onChange={setForm}
            value={formData.city}
            label="City"
            type="city"
            className={classes.textField}
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            name="district"
            onChange={setForm}
            value={formData.district}
            label="District"
            type="district"
            className={classes.textField}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button type="submit" className={classes.button}>
        Update Profile
      </Button>
    </form>
  );
}

export default ProfileEdit;
