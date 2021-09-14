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

function Orders(props) {
  const classes = useStyles();
  const token = sessionStorage.getItem("userToken");
  const userData = jwt.decode(token, { complete: true }).payload;

  const [userDetails, setUserDetails] = useState();

  const getUserDetails = async () => {
    await axios.get(`${BACKEND_URL}/users/${userData.userId}`).then((res) => {
      if (res.data.success) {
        setUserDetails(res.data.user);
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const defaultData = {
    name: userDetails?.fullName,
    email: "",
    street: "",
    city: "",
    district: "",
    mobile: "",
    dob: "2000-01-01",
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HeroImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [formData, setForm] = useForm(defaultData);
  const updateProfile = (e) => {
    e.preventDefault();
  };

  const ProfileEdit = () => {
    if (userDetails) {
      return (
        <form className={classes.form} onSubmit={updateProfile}>
          <Grid container>
            <Grid item md={12}>
              <TextField
                required
                name="fullname"
                onChange={setForm}
                value={formData.fullname}
                label="Full Name"
                type="fullname"
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
                type="mobile"
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

          <Button type="submit" fullWidth className={classes.submit}>
            Submit
          </Button>
        </form>
      );
    } else {
      return <Loading />;
    }
  };
  return (
    <Grid item container xs={12} spacing={3} direction="column">
      {console.log(userDetails)}
      <Grid item container xs={12}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid
              container
              direction="row"
              spacing={3}
              style={{ maxWidth: "100%" }}
            >
              <Grid item xs={6}>
                <Lottie
                  className={classes.lottie}
                  options={defaultOptions}
                  height={"inherit"}
                  width={"inherit"}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography variant="h5">Edit Profile</Typography>
                </Grid>
                <ProfileEdit />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Orders;
