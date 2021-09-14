import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeRoundedIcon from "@material-ui/icons/DirectionsRun";
import WorkRoundedIcon from "@material-ui/icons/Favorite";
import BusinessRoundedIcon from "@material-ui/icons/Category";
import StoreIcon from "@material-ui/icons/Store";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

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
  horizontalRow: { display: "flex", flexDirection: "row", padding: 0 },
  spaced: { marginRight: "1em" },
}));

function NavMenu(props) {
  const classes = useStyles();
  var loadingPage;
  const loadingPath = window.location.pathname.split("/");
  const [defaultPage, setDefaultPage] = useState("/");
  const history = useHistory();
  if (window.location.pathname === "/") {
    loadingPage = "home";
  } else {
    loadingPage = loadingPath[1];
  }

  useEffect(() => {
    history.listen((location) => {
      const path = location.pathname.split("/");
      if (location.pathname === "/") {
        setDefaultPage("home");
      } else {
        setDefaultPage(path[1]);
      }
    });
  }, [history]);

  useEffect(() => {
    setSelectedIndex(defaultPage);
  }, [defaultPage]);

  useEffect(() => {
    setSelectedIndex(loadingPage);
  }, []);

  const [selectedIndex, setSelectedIndex] = React.useState(defaultPage);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    displayDefaultLinks();
  }, [props]);

  const displayDefaultLinks = () => {
    if (props.user === null) {
      return (
        <>
          <Link to="/" className={classes.spaced}>
            <ListItem
              button
              key="Health"
              selected={selectedIndex === "health"}
              onClick={(event) => handleListItemClick(event, "health")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.linkText}
                primary="Health and Wellness"
              />
            </ListItem>
          </Link>
          <Link to="/beauty" className={classes.spaced}>
            <ListItem
              button
              key="Beauty"
              selected={selectedIndex === "beauty"}
              onClick={(event) => handleListItemClick(event, "beauty")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <WorkRoundedIcon />
              </ListItemIcon>
              <ListItemText className={classes.linkText} primary="Beauty" />
            </ListItem>
          </Link>
          <Link to="/categories" className={classes.spaced}>
            <ListItem
              button
              key="Categories"
              selected={selectedIndex === "categories"}
              onClick={(event) => handleListItemClick(event, "categories")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <BusinessRoundedIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.linkText}
                primary="All Categories"
              />
            </ListItem>
          </Link>
          <Link to="/contact" className={classes.spaced}>
            <ListItem
              button
              key="Contact"
              selected={selectedIndex === "contact"}
              onClick={(event) => handleListItemClick(event, "contact")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <BusinessRoundedIcon />
              </ListItemIcon>
              <ListItemText className={classes.linkText} primary="Contact Us" />
            </ListItem>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" className={classes.spaced}>
            <ListItem
              button
              key="Health"
              selected={selectedIndex === "health"}
              onClick={(event) => handleListItemClick(event, "health")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.linkText}
                primary="Health and Wellness"
              />
            </ListItem>
          </Link>
          <Link to="/beauty" className={classes.spaced}>
            <ListItem
              button
              key="Beauty"
              selected={selectedIndex === "beauty"}
              onClick={(event) => handleListItemClick(event, "beauty")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <WorkRoundedIcon />
              </ListItemIcon>
              <ListItemText className={classes.linkText} primary="Beauty" />
            </ListItem>
          </Link>
          <Link to="/categories" className={classes.spaced}>
            <ListItem
              button
              key="Categories"
              selected={selectedIndex === "categories"}
              onClick={(event) => handleListItemClick(event, "categories")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <BusinessRoundedIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.linkText}
                primary="All Categories"
              />
            </ListItem>
          </Link>
          <Link to="/orders" className={classes.spaced}>
            <ListItem
              button
              key="Orders"
              selected={selectedIndex === "orders"}
              onClick={(event) => handleListItemClick(event, "orders")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText className={classes.linkText} primary="Orders" />
            </ListItem>
          </Link>
          <Link to="/contact" className={classes.spaced}>
            <ListItem
              button
              key="Contact"
              selected={selectedIndex === "contact"}
              onClick={(event) => handleListItemClick(event, "contact")}
              classes={{ selected: classes.active }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.linkIcon}>
                <BusinessRoundedIcon />
              </ListItemIcon>
              <ListItemText className={classes.linkText} primary="Contact Us" />
            </ListItem>
          </Link>
        </>
      );
    }
  };

  return <List className={classes.horizontalRow}>{displayDefaultLinks()}</List>;
}

export default NavMenu;
