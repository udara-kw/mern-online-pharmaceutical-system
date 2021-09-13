import React from "react";
import Grid from "@material-ui/core/Grid";
import HeroSection from "./components/HeroSection";
import "./styles/Home.css";

function Home(props) {
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
