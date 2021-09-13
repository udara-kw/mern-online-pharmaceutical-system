import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import HeroImage from "../../components/lotties/heroimage";
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
  text: {
    alignSelf: "center",
    padding: "20px !important",
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
}));

function HeroSection() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HeroImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
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
            <Typography variant="h2" className={classes.h2}>
              Online Pharmacy
            </Typography>
            <Typography variant="h6" className={classes.h4}>
              The human body has been designed to resist an infinite number of
              changes and attacks brought about by its environment. The secret
              of good health lies in successful adjustment to changing stresses
              on the body
            </Typography>
            <Link to="/login">
              <Button className={classes.button}>Register Now</Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Lottie
              className={classes.lottie}
              options={defaultOptions}
              height={"inherit"}
              width={"inherit"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default HeroSection;
