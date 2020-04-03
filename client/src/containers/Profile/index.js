import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers, fetchProfile } from '../../redux/user/actions'
import { Container, Row, Col } from "reactstrap";

const ProfilePage = props => {
    //TODO: Create profile page
    var [state, setState] = useState({
      profile: {},
      editable: false
    })

    const { user, loading, loaded, profile, users, match, dispatch } = props

    console.log(props)

    var userId = -1

    if(users.length > 0 && match.params.id)
      for(let i = 0; i < users.length; i++)
        if((users[i].username.toLowerCase() === match.params.id.toLowerCase()) || users[i].id == match.params.id)
          userId = users[i].id

    if(match.params.id) {
      if(users.length === 0 && !loading)
        dispatch(fetchUsers())

      if(users.length > 0 && !profile && !loading)
        dispatch(fetchProfile(userId))
    } else dispatch(fetchProfile(user.id))

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
                    <h1>{`${profile.first_name} ${profile.last_name}'s Profile`}</h1>
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