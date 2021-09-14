import { Button, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";
import download from "downloadjs";
const jwt = require("jsonwebtoken");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.whiteHover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  activeChip: {
    backgroundColor: theme.palette.green,
    color: theme.palette.black,
  },
  inactiveChip: {
    backgroundColor: theme.palette.lightRed,
    color: theme.palette.black,
  },
  button: {
    backgroundColor: theme.palette.red,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    "&:hover": {
      backgroundColor: theme.palette.redHover,
      color: "white",
    },
  },
  category: {
    alignSelf: "left",
    backgroundColor: theme.palette.tagYellow,
  },
  location: {
    backgroundColor: theme.palette.tagYellow,
  },
}));

export default function CustomizedTables() {
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
  const [state, setState] = useState({
    allOrders: [],
  });
  const allOrders = state.allOrders;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/prescription/getAllByCustomer/${userData.userId}`)
      .then((res) => {
        if (res.data.success) {
          setState({
            allOrders: res.data.existingData,
          });
        }
      });
  }, [allOrders]);

  const downloadPrescription = async (fileName) => {
    const response = await axios.get(`${BACKEND_URL}/file/${fileName}`, {
      responseType: "blob",
    });
    const file = new Blob([response.data]);
    return download(file, fileName, "image/png");
  };

  const deletePrescription = (id, dateSubmitted) => {
    if (checkDeletable(dateSubmitted)) {
      axios
        .delete(`${BACKEND_URL}/prescription/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            setAlertData({
              severity: "success",
              msg: "Order Deleted!",
            });
            handleAlert();
          }
        })
        .catch((err) => {
          if (err) {
            setAlertData({
              severity: "error",
              msg: "Failed to delete order",
            });
            handleAlert();
          }
        });
    } else {
      setAlertData({
        severity: "error",
        msg: "You have exceeded the maximum period for order deletion",
      });
      handleAlert();
    }
  };

  const checkDeletable = (dateSubmitted) => {
    const diffDays = parseInt(
      (new Date() - new Date(dateSubmitted)) / (1000 * 60 * 60 * 24),
      10
    );
    if (diffDays > 1) {
      return false;
    } else {
      return true;
    }
  };

  return allOrders.length ? (
    <TableContainer component={Paper}>
      {displayAlert()}
      <Table className={classes.table} aria-label="customized table">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "35%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell align="center">Requested Date</StyledTableCell>
            <StyledTableCell align="center">Prescription</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.fullName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.note}</StyledTableCell>
              <StyledTableCell align="center">
                {row.dateSubmitted?.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  onClick={() => downloadPrescription(row.prescriptionFileName)}
                >
                  Download Prescription
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={() => deletePrescription(row._id, row.dateSubmitted)}
                  endIcon={<DeleteIcon />}
                  disabled={!checkDeletable(row.dateSubmitted)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Loading />
  );
}
