import React, { useEffect } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Twitter, Facebook, Instagram } from "@material-ui/icons"
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../../assets/img/ChaseYourDreams.png";
import { connect } from "react-redux";
import { fetchUserProfile } from '../../redux/user/actions'
import { history } from "../../helpers/history"

const useStyles = makeStyles(theme => ({
  footer: {
    borderTop: "2px solid white"
  }
}));

//TODO: Adjust footer navlink based on user information
const FooterProp = props => {
  const classes = useStyles()

  const { loggedIn, loading, loaded, userProfile, user, error } = props
  const profile = userProfile

  useEffect(() => {
    if(loggedIn && !profile) props.dispatch(fetchUserProfile(user.id))
  })

  if(profile) console.log(profile)

  if(error) return history.push({ pathname: `/${error.response.status}`, state: { error }})

  return (
    <div className={classes.footer}>
      <Container className="mt-3 mb-3">
        <Row>
          <Col md="3" xs="6">
            <a href="/">
              <img src={logo} style={{ width: 150, filter: "invert(100%)" }} />
            </a>
          </Col>
          <Col md="6" xs="12" className="d-flex align-items-center">
            <Nav className="ml-auto mr-auto">
              {loggedIn && loaded && profile ?
              <>
                <NavItem>
                  <NavLink href="/profile">Profile</NavLink>
                </NavItem>
                {profile.company > 0 ? 
                  <NavItem>
                    <NavLink href="/company">Company Profile</NavLink>
                  </NavItem> : null
                }
                {profile.manager ? 
                  null
                  :
                  <NavItem>
                    <NavLink href="/applications">Applications</NavLink>
                  </NavItem>
                }
                {profile.admin > 0 ? 
                  <NavItem>
                    <NavLink href="/admin">Admin</NavLink>
                  </NavItem> : null
                }
                <NavItem>
                  <NavLink href="/logout">Logout</NavLink>
                </NavItem>
              </>
                :
              <>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
              </>
              }
            </Nav>
          </Col>
          <Col md="3" xs="6" className="d-flex align-items-center">
            <Nav className="ml-auto mr-auto">
              <IconButton color="secondary" href="">
                <Twitter />
              </IconButton>
              <IconButton color="secondary" href="">
                <Facebook />
              </IconButton>
              <IconButton color="secondary" href="">
                <Instagram />
              </IconButton>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function mapPropsToState(state) {
  const { loggedIn, user } = state.auth
  const { userProfile, loading, loaded, error } = state.user
  return { loggedIn, user, userProfile, loading, loaded, error }
}

const Footer = connect(mapPropsToState)(FooterProp)
export default Footer