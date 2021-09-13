import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import NavMenu from "./NavMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
      Overflow: "hidden",
    },
  },
  card: {
    display: "flex",
  },
  linkIcon: {
    color: theme.palette.stateBlue,
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      minWidth: "unset",
    },
  },
  linkText: {
    color: theme.palette.black,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 10,
    },
  },
  listItem: {
    borderRadius: 12,
    "&:hover": {
      borderRadius: 12,
      color: theme.palette.white + "!important",
      backgroundColor: theme.palette.lightSkyBlueHover + "!important",
    },
  },
  active: {
    backgroundColor: theme.palette.lightSkyBlue + "!important",
    borderRadius: 12,
    "& $linkText": {
      color: theme.palette.frenchViolet,
      fontWeight: "bold",
    },
  },
  topMenuBar: {
    height: "3em",
    display: "flex",
    justify: "center",
    alignContent: "center",
    padding: "1em",
    borderRadius: 12,
  },
  rightAligned: {
    marginLeft: "2em",
  },
  grow: {
    flexGrow: 1,
    background: "white",
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.topMenuBar}>
        <div className={classes.card}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <NavMenu user={props.user} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.grow} />
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
}
