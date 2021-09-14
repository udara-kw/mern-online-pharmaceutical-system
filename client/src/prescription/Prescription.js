import React, { useState, useRef } from "react";
import { useForm } from "react-hooks-helper";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Badge,
  IconButton,
  Avatar,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SnackBarAlert from "../components/SnackBarAlert";
import "./styles/Prescription.css";
import axios from "axios";
import BACKEND_URL from "../Config";
const jwt = require("jsonwebtoken");
const path = require("path");

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

function Prescription(props) {
  const classes = useStyles();

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

  var prescriptionDefaultData = {
    fullName: userData.fullName,
    email: userData.email,
    street: userData.address.street,
    city: userData.address.city,
    district: userData.address.district,
    note: "",
  };
  const [prescriptionData, setPrescriptionData] = useForm(
    prescriptionDefaultData
  );

  // File upload handler
  const fileInput = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const uploadPrescription = (e) => {
    e.preventDefault();
    const uploadData = {
      fullName: prescriptionData.fullName,
      email: prescriptionData.email,
      address: {
        street: prescriptionData.street,
        city: prescriptionData.city,
        district: prescriptionData.district,
      },
      note: prescriptionData.note,
      customer: userData.userId,
      dateSubmitted: new Date(),
    };
    axios
      .post(`${BACKEND_URL}/prescription/create`, uploadData)
      .then((res) => {
        if (res.data.success) {
          handleUploads(res.data.prescriptionId);
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to submit prescription!",
          });
          handleAlert();
        }
      });
  };

  const handleUploads = (prescriptionId) => {
    const data = new FormData();
    const image = selectedFile;
    data.append("prescriptionName", prescriptionId);
    data.append("prescriptionFile", image);
    axios
      .post(`${BACKEND_URL}/file`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          updateFileName(prescriptionId);
        } else {
          setAlertData({
            severity: "error",
            msg: "Prescription upload failed!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Image upload failed!",
          });
          handleAlert();
        }
      });
  };
  const updateFileName = (prescriptionId) => {
    const updateData = {
      prescriptionFileName: prescriptionId + path.extname(selectedFile.name),
    };
    axios
      .put(`${BACKEND_URL}/prescription/update/${prescriptionId}`, updateData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Prescription Uploaded!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to update file name!",
          });
          handleAlert();
        }
      });
  };
  return (
    <Grid
      item
      container
      xs={12}
      spacing={3}
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      {displayAlert()}
      <Grid item container xs={12}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="space-between"
              alignItems="center"
              style={{ maxWidth: "100%" }}
            >
              <Grid item xs={12} md={6} className={classes.text}>
                <Typography>
                  {!selectedFile ? (
                    <Avatar
                      variant="square"
                      style={{
                        width: 500,
                        height: 500,
                        borderRadius: 12,
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  ) : (
                    <Avatar
                      variant="square"
                      style={{
                        width: 500,
                        height: 500,
                        borderRadius: 12,
                      }}
                      src={URL.createObjectURL(selectedFile)}
                    />
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <form onSubmit={uploadPrescription}>
                  <Grid container>
                    <Grid item xs={12} align="left">
                      {!!selectedFile ? (
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={4} align="left">
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              badgeContent={
                                <IconButton
                                  onClick={() => {
                                    setSelectedFile(null);
                                  }}
                                  aria-label="delete"
                                  color="secondary"
                                >
                                  <RemoveCircleRoundedIcon />
                                </IconButton>
                              }
                              className={classes.addBadge}
                            >
                              <Avatar
                                variant="square"
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: 12,
                                }}
                                src={URL.createObjectURL(selectedFile)}
                              />
                            </Badge>
                          </Grid>
                          <Grid item xs={7} align="left">
                            <Typography>{selectedFile.name}</Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={4} align="left">
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              badgeContent={
                                <IconButton
                                  onClick={() => fileInput.current.click()}
                                  aria-label="delete"
                                  color="primary"
                                >
                                  <AddCircleRoundedIcon />
                                </IconButton>
                              }
                              className={classes.addBadge}
                            >
                              <Avatar
                                variant="square"
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: 12,
                                }}
                                onClick={() => fileInput.current.click()}
                              >
                                <AssignmentIcon />
                              </Avatar>
                            </Badge>
                          </Grid>
                          <Grid item xs={7} align="left">
                            <Typography>
                              Please upload your prescription
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <input
                      ref={fileInput}
                      name="selectedFile"
                      type="file"
                      onChange={changeHandler}
                      style={{ display: "none" }}
                    />
                    <Grid item md={6}>
                      <TextField
                        required
                        name="email"
                        onChange={setPrescriptionData}
                        value={prescriptionData.email}
                        label="Email"
                        type="email"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        required
                        name="fullName"
                        onChange={setPrescriptionData}
                        value={prescriptionData.fullName}
                        label="Full Name"
                        type="text"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="street"
                        onChange={setPrescriptionData}
                        value={prescriptionData.street}
                        label="Street"
                        type="text"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="city"
                        onChange={setPrescriptionData}
                        value={prescriptionData.city}
                        label="City"
                        type="text"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        required
                        name="district"
                        onChange={setPrescriptionData}
                        value={prescriptionData.district}
                        label="District"
                        type="text"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        multiline
                        rows={3}
                        name="note"
                        onChange={setPrescriptionData}
                        value={prescriptionData.note}
                        label="Note"
                        type="text"
                        fullWidth
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" className={classes.button}>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Prescription;
