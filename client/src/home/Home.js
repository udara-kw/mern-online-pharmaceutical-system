import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import HeroSection from "./components/HeroSection";
import "./styles/Home.css";

const useStyles = makeStyles((theme) => ({
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

function Home(props) {
  const classes = useStyles();

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
      <Grid item container xs={12}>
        <HeroSection />
      </Grid>
    </Grid>
  );
}

export default Home;
