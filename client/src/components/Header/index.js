import React from 'react'
import logo from "../../assets/img/ChaseYourDreams.png";
import { makeStyles } from "@material-ui/core";
import { Container, Row, Col, Navbar, NavbarBrand, NavLink, Nav } from "reactstrap";

const useStyles = makeStyles(theme => ({

}));

// This will contain our logo and navigation to other pages
// The logo links to the home page, other links do NOT work yet
// TODO: Make mobile friendly (this will need to be made mobile friendly)
// TODO: Make reactive with auth
export default function Header(props) {
  const classes = useStyles()

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