import React from "react";
import logo from "../../assets/img/ChaseYourDreams.png";
import { makeStyles } from "@material-ui/core";
import { Container, Row, Col, Navbar, NavbarBrand, NavLink, Nav } from "reactstrap";

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
// TODO: Make mobile friendly (this will need to be made mobile friendly)
// TODO: Make reactive with auth
let Header = props => {
  return (
    <Navbar color="bg-transparent" expand="lg">
      <Container>
        <Row style={{ width: "100%" }}>
          <Col md="4" xs="6">
            <NavbarBrand>
              <a href="/home">
                <img src={logo} style={{ width: 150, filter: "invert(100%)" }} />
              </a>
            </NavbarBrand>
          </Col>
          <Col md="4" xs="6" className="ml-md-auto d-flex justify-content-end">
            <Nav className="mt-auto mb-auto">
              <NavLink href="/login">Login</NavLink>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

//TODO: Craft the damn footer
let Footer = props => {
  return (
    <Container>
      <Row>
        <Col md="4" xs="12">
          <h1>FOOTER LOL</h1>
        </Col>
        <Col md="4" xs="12">

        </Col>
      </Row>
    </Container>
  )
}

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
