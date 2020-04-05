import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers, fetchProfile } from '../../redux/user/actions'
import { Container, Row, Col } from "reactstrap";
import { Card, Avatar } from "@material-ui/core";

const ProfilePage = props => {
    //TODO: Create profile page
    var [state, setState] = useState({
      profile: {},
      editable: false
    })

    const { user, loading, loaded, profile, users, match, dispatch } = props

    console.log(props)

    var userId = -1

    //TODO: Fix error page and fix profile erroring
    if(users.length > 0 && match.params.id)
      for(let i = 0; i < users.length; i++)
        if((users[i].username.toLowerCase() === match.params.id.toLowerCase()) || users[i].id == match.params.id)
          userId = users[i].id

    if(match.params.id) {
      if(users.length === 0 && !loading)
        dispatch(fetchUsers())

      if(users.length > 0 && !profile && !loading)
        dispatch(fetchProfile(userId))
    } else
      if(!profile && !loading) dispatch(fetchProfile(user.id))

    return (
        <>
          {loading || !profile ?
              <div>
                <h1>Loading...</h1>
              </div>
            :
              <Container>
                <Row className="d-flex justify-content-center">
                  <Col md="8">
                    <Card className="mt-5">
                      <Container className="mt-5 mb-5">
                        <Row className="d-flex justify-content-center align-items-center">
                          <Col md="4">
                            <Avatar className="ml-5 mr-auto" style={{ width:"150px", height: "150px", fontSize: "75px", border: "4px solid #a8a8a8" }}>{`${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`}</Avatar>
                          </Col>
                          <Col md="8">
                            <h1 className="mt-auto mr-auto">{`${profile.first_name} ${profile.last_name}`}</h1>
                            <h2 className="mt-2 mb-auto mr-auto">{profile.company.name}</h2>
                          </Col>
                        </Row>
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
  const { loading, loaded, profile, users } = state.user
  return { user, loading, loaded, profile, users }
}

export const Profile = connect(mapStateToProps)(ProfilePage)