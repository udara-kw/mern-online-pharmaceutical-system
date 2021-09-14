import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useForm } from "react-hooks-helper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./styles/Profile.css";
import Lottie from "react-lottie";
import HeroImage from "../components/lotties/heroimage";
import Loading from "../components/Loading";
import ProfileEdit from "./ProfileEdit";
import SnackBarAlert from "../components/SnackBarAlert";
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
  deleteButton: {
    backgroundColor: theme.palette.red,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.redHover,
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
  marginContent: {
    padding: "2em",
  },
  deleteForm: {
    marginTop: "2.5em",
  },
  dialogbuttons: {
    color: "red",
  },
}));

function Orders(props) {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HeroImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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

  const passwordChangeFormDefault = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwordChangeFormData, setPasswordChangeForm] = useForm(
    passwordChangeFormDefault
  );
  const checkValidPassword = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/check-password`, {
        userId: userData.userId,
        password: passwordChangeFormData.currentPassword,
      })
      .then((res) => {
        if (res.data.success) {
          changePassword();
        } else {
          setAlertData({
            severity: "error",
            msg: "Wrong password!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Error!",
          });
          handleAlert();
        }
      });
  };
  const changePassword = async () => {
    if (
      passwordChangeFormData.newPassword ===
      passwordChangeFormData.confirmPassword
    ) {
      axios
        .post(`${BACKEND_URL}/api/change-password/`, {
          userId: userData.userId,
          newPassword: passwordChangeFormData.newPassword,
        })
        .then((res) => {
          if (res.data.success) {
            setAlertData({
              severity: "success",
              msg: "Password Changed!",
            });
            handleAlert();
          }
        })
        .catch((err) => {
          if (err) {
            setAlertData({
              severity: "error",
              msg: "Server Error!",
            });
            handleAlert();
          }
        });
    } else {
      setAlertData({
        severity: "error",
        msg: "Passwords do not match each other!",
      });
      handleAlert();
    }
  };

  // Dialog Box Stuff
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [deletePassword, setDeletePassword] = useState("");
  const deleteAccount = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/check-password`, {
        userId: userData.userId,
        password: deletePassword,
      })
      .then((res) => {
        if (res.data.success) {
          setOpen(true);
        } else {
          setAlertData({
            severity: "error",
            msg: "Wrong password!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Error!",
          });
          handleAlert();
        }
      });
  };
  const confirmDeletion = () => {
    axios
      .delete(`${BACKEND_URL}/users/delete/${userData.userId}`)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.removeItem("userToken");
          window.location = "/";
          setAlertData({
            severity: "success",
            msg: "Deleted!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Faled to Delete!",
          });
          handleAlert();
        }
      });
  };
  return (
    <Grid item container xs={12} spacing={3} direction="column">
      {displayAlert()}
      <Grid item container xs={12}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid
              container
              direction="row"
              spacing={3}
              style={{ maxWidth: "100%" }}
              className={classes.marginContent}
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
                  <Typography variant="h5" style={{ marginTop: "1em" }}>
                    Edit Profile
                  </Typography>
                </Grid>
                {userDetails ? <ProfileEdit info={userDetails} /> : <Loading />}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" style={{ marginTop: "1em" }}>
                  Change Password
                </Typography>
                <form onSubmit={checkValidPassword}>
                  <Grid container>
                    <Grid item md={12}>
                      <TextField
                        required
                        name="currentPassword"
                        onChange={setPasswordChangeForm}
                        value={passwordChangeFormData.currentPassword}
                        label="Current Password"
                        type="password"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="newPassword"
                        onChange={setPasswordChangeForm}
                        value={passwordChangeFormData.newPassword}
                        label="New Password"
                        type="password"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="confirmPassword"
                        onChange={setPasswordChangeForm}
                        value={passwordChangeFormData.confirmPassword}
                        label="Confirm New password"
                        type="password"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Button type="submit" className={classes.button}>
                        Change Password
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography variant="h5" style={{ marginTop: "1em" }}>
                    Delete Account
                  </Typography>
                  <form onSubmit={deleteAccount} className={classes.deleteForm}>
                    <Grid container>
                      <Grid item md={12}>
                        <Typography>
                          In order to delete your account, you must first
                          provide your current password
                        </Typography>
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          required
                          name="deletePassword"
                          onChange={(e) => setDeletePassword(e.target.value)}
                          value={deletePassword}
                          label="Current Password"
                          type="password"
                          className={classes.textField}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Button type="submit" className={classes.deleteButton}>
                          Delete Account
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-details-form"
          fullWidth
          className={classes.dialogBox}
        >
          <DialogTitle id="edit-details-form">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are going to permanently delete your account. Please confirm
              to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={confirmDeletion}
              color="primary"
              className={classes.dialogbuttons}
            >
              Confirm and Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default Orders;
