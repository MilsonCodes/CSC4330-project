import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../../redux/user/actions'
import { Container, Row, Col } from "reactstrap";
import { Card, Avatar, Chip } from "@material-ui/core";
import { request } from "../../api";
import { history } from "../../helpers/history";
import { getStateFromZipCode } from '../../helpers/address'

const ProfilePage = props => {
    //TODO: Create profile page
    var [state, setState] = useState({
      profile: null,
      error: null,
      editable: false
    })

    const { user, loading, users, match, dispatch } = props

    console.log(props)

    var userId = -1

    //TODO: Fix error page and fix profile erroring
    if(users.length > 0 && match.params.id)
      for(let i = 0; i < users.length; i++)
        if((users[i].username.toLowerCase() === match.params.id.toLowerCase()) || users[i].id == match.params.id)
          userId = users[i].id

    if(match.params.id && !state.profile) {
      if(users.length === 0 && !loading)
        dispatch(fetchUsers())

      if(users.length > 0 && !state.profile) {
        request("/users/?user=" + userId, null, "GET", true)
        .then(res => setState({ profile: res.data[0] }))
        .catch(err => setState({ error: err }))
      }
    } else if(!match.params.id && !state.profile) setState({ profile: user, editable: true })

    if(state.error)
      history.push({ pathname: "/error", state: { error: state.error } })

    if(state.profile && !state.profile.address.state) {
      const zipCode = state.profile.address.zip_code
      
      const updateCallback = st => {
        var newState = { ...state }
        newState.profile.address.state = st;
        setState(newState)
      }
  
      getStateFromZipCode(zipCode, updateCallback, err => setState({ ...state, error: err }))
    }

    return (
        <>
          {!state.profile ?
              <div>
                <h1>Loading...</h1>
              </div>
            :
              <Container>
                <Row className="d-flex justify-content-center">
                  <Col md="10">
                    <Card className="mt-5">
                      <Container className="mt-5 mb-5">
                        <Row className="d-flex justify-content-center align-items-center">
                          <Col md="3">
                            <Avatar className="ml-auto mr-0" style={{ width:"150px", height: "150px", fontSize: "75px", border: "4px solid #a8a8a8" }}>{`${state.profile.first_name.charAt(0)}${state.profile.last_name.charAt(0)}`}</Avatar>
                          </Col>
                          <Col md="9">
                            <h1 className="mt-auto mb-0 mr-auto">{`${state.profile.first_name} ${state.profile.last_name}`}</h1>
                            <h2 className="mt-2 mb-0 mr-auto">{state.profile.company.name != "None" ? state.profile.company.name : "External Organization"}</h2>
                            {state.profile.address.city && state.profile.address.state ?
                              <h4 className="mt-2 mb-auto mr-auto">{`${state.profile.address.city}, ${state.profile.address.state}`}</h4>
                            : null}
                          </Col>
                        </Row>
                        {state.profile.bio && state.profile.bio != "" ? 
                        <>
                          <br />
                          <hr className="ml-auto mr-auto" style={{ width: "90%", borderTopWidth: "2px" }} />
                          <br />
                          <Row>
                            <Col md="10" className="ml-auto mr-auto">
                              <h3><i>Bio</i></h3>
                              <p className="mt-2">{state.profile.bio}</p>
                            </Col>
                          </Row> 
                        </>
                        : 
                        <>
                          {state.editable ?
                            <>
                              <br />
                              <hr className="ml-auto mr-auto" style={{ width: "90%", borderTopWidth: "2px" }} />
                              <br />
                              <Row>
                                <Col md="6" className="ml-auto mr-auto mt-5 mb-5 text-center">
                                  <h1>No Bio Found!</h1>
                                  <h4><i>Go to <a href="/settings">Settings</a> and add one!</i></h4>
                                </Col>
                              </Row>
                            </>
                            : null}
                        </>
                        }
                        {state.profile.skills && state.profile.skills != "" ?
                        <>
                          <br />
                          <hr className="ml-auto mr-auto" style={{ width: "90%", borderTopWidth: "2px" }} />
                          <br />
                          <Row>
                            <Col md="10" className="ml-auto mr-auto">
                              <h3><i>Skills</i></h3>
                              {state.profile.skills.split(", ").map(skill => (
                                console.log(skill),
                                <Chip variant="outlined" size="small" label={skill} className="mr-2" />
                              ))}
                            </Col>
                          </Row> 
                        </>
                        : 
                        <>
                        {state.editable ?
                          <>
                            <br />
                            <hr className="ml-auto mr-auto" style={{ width: "90%", borderTopWidth: "2px" }} />
                            <br />
                            <Row>
                              <Col md="6" className="ml-auto mr-auto mt-5 mb-5 text-center">
                                <h1>No Skills Found!</h1>
                                <h4><i>Go to <a href="/settings">Settings</a> and add some!</i></h4>
                              </Col>
                            </Row>
                          </>
                          : null}
                        </>
                        }
                      </Container>
                    </Card>
                  </Col>
                </Row>
            </Container>}
        </>
    );
}

function mapStateToProps(state) {
  const { user } = state.auth
  const { loading, loaded, users } = state.user
  return { user, loading, loaded, users }
}

export const Profile = connect(mapStateToProps)(ProfilePage)