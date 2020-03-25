import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Header/index"
import Footer from "../../components/Footer/index"

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
    overflow: "auto",
    margin: 0,
    padding: 0,
    backgroundColor: theme.palette.primary.main
  }
}));

// This wraps the entire app and keeps the background and header constant
const Layout = props => {
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Header />
      <div id="content" className="">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
