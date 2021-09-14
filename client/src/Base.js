import { Container, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { env } from "process";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import SideDrawer from "./components/SideDrawer";
import Topbar from "./components/Topbar";

import ContactUs from "./contact/ContactUs";
import Home from "./home/Home";
import Dashboard from "./home/Dashboard";
import Orders from "./Orders/Orders";
import Profile from "./profile/profile";
import Prescription from "./prescription/Prescription";
import backgroundImage from "./images/background-image.jpg";
import SignInSide from "./signIn/components/SignInSide";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  sideDrawer: {
    minWidth: "17.9%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "16.66667%",
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mainGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  topBarGrid: {
    paddingTop: "22px !important",
    marginBottom: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

function Base() {
  const classes = useStyles();

  //Redirect user to signin page if not logged in
  const token = sessionStorage.getItem("userToken");

  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.email
      : null
  );

  useEffect(() => {
    loadDefault();
    loadCustomer();
  }, [role]);

  const loadDefault = () => {
    return (
      <>
        <Route path="/" exact>
          <Home userRole={role} />
        </Route>
        <Route path="/prescription" exact>
          <SignInSide />
        </Route>
        <Route path="/login" exact>
          <SignInSide />
        </Route>
        <Route path="/contact" exact>
          <ContactUs />
        </Route>
      </>
    );
  };

  const loadCustomer = () => {
    return (
      <>
        <Route path="/" exact>
          <Dashboard userRole={role} />
        </Route>
        <Route path="/prescription" exact>
          <Prescription />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/contact" exact>
          <ContactUs />
        </Route>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className="overlay">
        <Container maxWidth={false} className={classes.container}>
          <Grid
            container
            direction="row"
            spacing={3}
            className={classes.mainGrid}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              xs={12}
              spacing={3}
              className={classes.topBarGrid}
              direction="column"
              justify="space-between"
            >
              <Grid item sm={12}>
                <Topbar user={role} />
              </Grid>
              <Grid item xs={12}>
                <SideDrawer user={role} />
              </Grid>

              <Grid container direction="column" alignItems="center">
                {!role ? (
                  <Switch>{loadDefault()}</Switch>
                ) : (
                  <Switch>{loadCustomer()}</Switch>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Base;
