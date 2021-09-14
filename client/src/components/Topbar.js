import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from '@material-ui/icons/AccountCircle';
import "./styles/Custom.css";
import logo from "./images/logo.jpg";
import { Button, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
  },
  content: {
    padding: 10,
    justifyContent: "center",
  },
  grow: {
    flexGrow: 1,
    background: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: fade(theme.palette.tuftsBlueHover, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.tuftsBlue,
  },
  searchButton: {
    color: theme.palette.tuftsBlue,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputRoot: {
    color: theme.palette.tuftsBlue,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileSideMenuItems: {
    marginTop: 24,
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    height: 40,
    marginRight: 40,
  },
  signIn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  signInMobile: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    marginRight: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  primaryButton: {
    height: 40,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menu: { marginTop: 50 },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  logoutIcon: {
    marginRight: 10,
  },
  profilepic: {
    borderRadius: 12,
  },
  profileMenu: {
    marginTop: 60,
    "& .MuiMenu-paper": {
      padding: 16,
      borderRadius: 12,
      boxShadow: "rgba(83, 144, 217, 0.6) 0px 4px 12px",
    },
  },
  notificationMenu: {
    marginTop: 60,
    "& .MuiMenu-paper": {
      minWidth: 300,
      padding: 16,
      borderRadius: 12,
      boxShadow: "rgba(83, 144, 217, 0.6) 0px 4px 12px",
    },
  },
  logOut: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    height: 40,
    marginTop: 16,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menuItem: {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: theme.spacing(2),
    borderRadius: 12,
    "&:hover": {
      borderRadius: 12,
      backgroundColor: theme.palette.lightSkyBlueHover + "!important",
    },
  },
  menuIcon: {
    display: "flex",
    color: theme.palette.stateBlue,
    marginRight: theme.spacing(2),
  },
  menuText: {
    color: theme.palette.black,
    fontWeight: 500,
  },
  topBarIcon: {
    color: theme.palette.stateBlue,
    marginLeft: 8,
    marginRight: 8,
  },
}));

export default function Topbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("userToken")
      ? sessionStorage.getItem("userToken")
      : null
  );
  const [searchString, setSearchString] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchString.trim().length !== 0) {
      history.push({
        pathname: "/searchResults",
        searchString: searchString,
      });
    }
  };

  const displaySearchButton = () => {
    if (searchString.trim().length > 0) {
      return <Button className={classes.searchButton}>Search</Button>;
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.grow}>
          <AppBar position="sticky">
            <Toolbar>
              <Link to="/">
                <img src={logo} alt="logo" className={classes.logo} />
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => handleSearchSubmit(e)}
                />
                {displaySearchButton()}
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {loggedIn ? (
                  <div>
                    <Link to="/profile">
                      <IconButton className={classes.primaryButton}>
                        <AccountBoxIcon />
                      </IconButton>
                    </Link>
                    <Link to="/prescription">
                      <Button className={classes.primaryButton}>
                        Upload Your Prescription
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        sessionStorage.removeItem("userToken");
                        setLoggedIn(false);
                        window.location = "/";
                      }}
                      className={classes.signIn}
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <Button className={classes.signIn}>Log In</Button>
                    </Link>
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </CardContent>
    </Card>
  );
}
