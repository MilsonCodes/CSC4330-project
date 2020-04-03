import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Row, Col, Form } from "reactstrap";
import { Card } from "@material-ui/core";
import Textbox from "../../components/Form/textbox"
import Checkbox from "../../components/Form/checkbox"
import Button from "../../components/Form/SubmitButton"
import { connect } from "react-redux";
import { loginUser } from '../../redux/auth/actions'
import { history } from '../../helpers/history'
import { fetchUsers } from "../../redux/user/actions";

const useStyles = makeStyles(theme => ({

}))

const Login = props => {
  const classes = useStyles()

  const { loading, loaded, loggedIn, usersLoaded } = props

  if(!usersLoaded)
    props.dispatch(fetchUsers())

  if (loggedIn)
    history.push('/profile')

  var [state, setState] = useState({
    form: {
      username: "",
      password: ""
    },
    showPassword: false
  });

  const handleChange = (event, field) => {
    var newState = { ...state }
    newState.form[field] = event.target.value
    setState(newState)
  }

  const showPassword = event => {
    var newState = { ...state }
    newState.showPassword = event.target.checked
    setState(newState)
  }

  const onSubmit = event => {
    event.preventDefault()

    const { dispatch } = props
    const { form } = state

    //TODO: LOG THAT SHIT IN BAY BAY
    if (form.username && form.password)
      dispatch(loginUser(form))
  }

  return (
    <>
      <Container className="mt-4 mb-4">
        <Row>
          <Col md="6" className="ml-auto mr-auto">
            <Card>
              <Container className="mt-3 mb-3">
                <h2>Login</h2>
                <br />
                <Form className="form">
                  <Textbox
                    type="text"
                    label="Username"
                    required
                    className="m-0"
                    handleChange={e => handleChange(e, "username")}
                  />
                  <br />
                  <Textbox
                    type={!state.showPassword ? "password" : "text"}
                    label="Password"
                    required
                    className="m-0"
                    handleChange={e => handleChange(e, "password")}
                  />
                  <br />
                  <Checkbox
                    label="Primary"
                    row="row"
                    options={['Show Password']}
                    onChange={showPassword}
                  />
                  <br />
                  <p>
                    Don't have an account? <a href="/register">Register here.</a>
                  </p>
                  <Button
                    handleClick={onSubmit}
                    size="small"
                    variant="outlined"
                    color="primary"
                  >
                    Submit
                                    </Button>
                </Form>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function matchStateToProps(state) {
  const { loading, loaded, error, loggedIn } = state.auth
  const { users } = state.user
  return { loading, loaded, error, loggedIn, usersLoaded: (users.length > 0 ? true : false) }
}

const connectedLoginPage = connect(matchStateToProps)(Login)
export { connectedLoginPage as Login }