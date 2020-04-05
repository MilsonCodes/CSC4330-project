import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Header/index"
import Footer from "../../components/Footer/index"
import { fetchUsers, fetchData } from '../../redux/user/actions'
import { connect } from "react-redux";

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
    backgroundColor: theme.palette.primary.main,
  }
}));

// This wraps the entire app and keeps the background and header constant
const Layout = props => {
  const classes = useStyles()

  return (
    <div className={classes.background + " d-flex flex-column"}>
      <Header style={{ flex: "none" }} />
      <div id="content" className="" style={{ flex: "auto" }}>
        {props.children}
      </div>
      <Footer style={{ flex: "none" }} />
    </div>
  );
};

function mapStateToProps(state) {
  return { }
}

const connectedLayout = connect(mapStateToProps)(Layout)
export { connectedLayout as Layout }