import React, { useEffect, useState } from 'react'
import logo from "../../assets/img/ChaseYourDreams.png";
import { makeStyles, Avatar } from "@material-ui/core";
import { Container, Row, Col, Navbar, NavbarBrand, NavLink, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from 'react-redux';
import { fetchData } from '../../redux/user/actions'
import { logoutUser } from '../../redux/auth/actions'

const useStyles = makeStyles(theme => ({

}));

// This will contain our logo and navigation to other pages
// The logo links to the home page, other links do NOT work yet
// TODO: Make mobile friendly (this will need to be made mobile friendly)
// TODO: Make reactive with auth
const HeaderComp = props => {
  const classes = useStyles()

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { loggedIn, loading, loaded, profile, user } = props

  useEffect(() => {
    if(loggedIn && !profile) props.dispatch(fetchData())
  })

  console.log(props)

  return (
    <>
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
                {loggedIn 
                ?
                  !loading && loaded && profile ?
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle tag="div">
                        <Avatar >{`${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`}</Avatar>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>{user.username}</DropdownItem>
                        <DropdownItem onClick={e => props.dispatch(logoutUser())}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  :
                    <p>Loading...</p>
                :
                  <>
                    <NavLink href="/login">Login</NavLink>
                  </>
                }
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );


};

function mapStateToProps(state) {
  const { loggedIn, user } = state.auth
  const { entities, loading, loaded, error } = state.user
  var profile = null
  if(loggedIn && loaded && entities.profiles) {
    entities.profiles.forEach(elem => {
      if(user.id == elem.user) profile = elem
    })

    return { loggedIn, loading, loaded, user, profile }
  } else
    return { loggedIn, loading, loaded, error }
}

const Header = connect(mapStateToProps)(HeaderComp)
export default Header