import React from "react";
import styled from "styled-components";
import logo from "../../assets/ChaseYourDreams.png";
import { AppBar, Toolbar, Button, makeStyles, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  background: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    backgroundColor: theme.palette.primary.main
  }
}));

// This will contain our logo and navigation to other pages
// The logo links to the home page, other links do NOT work yet
let Header = () => {
  return (

    <AppBar
      position="static"  
    >
      <Toolbar>
        <a href="/home">
          <img src={logo} style={{ width: "80%", filter: "invert(100%)" }} />
        </a>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

// This wraps the entire app and keeps the background and header constant
// Don't edit this component
const Layout = props => {
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Header></Header>
      {props.children}
    </div>
  );
};

export default Layout;
