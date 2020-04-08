import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Row, Col, Form, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { Card } from "@material-ui/core";
import { Warning } from "@material-ui/icons"
import Textbox from "../../components/Form/textbox"
import Checkbox from "../../components/Form/checkbox"
import Button from "../../components/Form/SubmitButton"
import { ErrorModal, MessageModal } from "../../components/Modal/index"
import { connect } from "react-redux";
import { fetchCompanies } from '../../redux/user/actions'
import { registerUser } from '../../redux/auth/actions'

const RegisterPage = props => {
  //TODO: Determine fields for register page
  const { companies, loading, error } = props

  if (!companies)
    props.dispatch(fetchCompanies())

  var [state, setState] = useState({
    form: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      company: 0,
      line1: "",
      line2: "",
      zip: "",
      city: "",
      country: "",
      manager: false,
      stakeholder: false
    },
    dropdown: false,
    showMessageModal: false
  });

  const toggle = () => {
    var newState = { ...state }
    newState.dropdown = !state.dropdown
    setState(newState)
  };

  const handleChange = (event, field) => {
    var newState = { ...state }
    newState.form[field] = event.target.value
    setState(newState)
  }

  const updateCompany = (index) => {
    var newState = { ...state }
    if(index === "Other")
      newState.form.company = -1
    else
      newState.form.company = index
    
    setState(newState)
  }

  const validateForm = form => {
    var hasEmpty = false

    Object.keys(form).forEach(elem => {
      if(typeof(form[elem]) == "string") {
        if(form[elem] === "") hasEmpty = true

        if(elem == "email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form[elem]))) hasEmpty = true
      }
    })

    return !hasEmpty
  }

  const onSubmit = event => {
    event.preventDefault()

    const { form } = state
    
    const data = {
      username: form.username,
      email: form.email,
      password: form.password,
      profile: {
        first_name: form.first_name,
        last_name: form.last_name,
        company: form.company + 1,
        address: {
          line1: form.line1,
          line2: form.line2,
          zip: form.zip,
          city: form.city,
          country: form.country
        },
        admin: false,
        manager: form.manager,
        stakeholder: form.stakeholder
      }
    }

    //TODO: IT'S TIME TO REGISTER SOMEONE :D
    if(validateForm(form))
      props.dispatch(registerUser(data))
    else
      setState({ ...state, showMessageModal: true })
  }

  const removeMessageModal = () => setTimeout(() => setState({ ...state, showMessageModal: false }), 500);


  return (
    <>
      {error && !loading ?
        <ErrorModal error={error} />
        : null
      }
      {state.showMessageModal ? 
        <MessageModal title="Notice!" message="One or more fields are not filled out!" onClose={removeMessageModal} icon={<Warning fontSize="large" color="error" />} />
        : null
      }
      <Container className="mt-5 mb-5">
        <Row>
          <Col md="8" className="ml-auto mr-auto">
            <Card>
              <Container className="mt-3 mb-3">
                <h2>Register</h2>
                <br />
                <Form className="form">
                  <h3 className="mt-md mb-sm">Employee Info</h3>
                  <Row>
                    <Col>
                      <Textbox
                        type="text"
                        label="First"
                        className="m-0"
                        handleChange={e => handleChange(e, "first_name")}
                      />
                    </Col>
                    <Col>
                      <Textbox
                        type="text"
                        label="Last"
                        className="m-0"
                        handleChange={e => handleChange(e, "last_name")}
                      />
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col className="d-flex align-items-center">
                      <label>Company:</label>
                      <Dropdown isOpen={state.dropdown} toggle={toggle} className="ml-2">
                        <DropdownToggle caret>
                          {!companies ?
                            "Loading..."
                            :
                            state.form.company != -1 ? companies[state.form.company].name : "Other"
                          }
                        </DropdownToggle>
                        <DropdownMenu>
                          {!companies ?
                            <DropdownItem header>Loading...</DropdownItem>
                            :
                            <>
                              {companies.map((elem, index) => <DropdownItem onClick={() => updateCompany(index)}>{elem.name}</DropdownItem>)}
                            </>
                          }
                          <DropdownItem onClick={() => updateCompany("Other")}>Other</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <br/>
                  <h3 className="mt-md mb-sm">Address</h3>
                  <br/>
                  <Textbox
                    type="text"
                    label="Address Line 1"
                    className="m-0"
                    handleChange={e => handleChange(e, "line1")}
                  />
                  <br/>
                  <Textbox
                    type="text"
                    label="Address Line 2"
                    className="m-0"
                    handleChange={e => handleChange(e, "line2")}
                  />
                  <br/>
                  <Textbox
                    type="text"
                    label="Zip Code"
                    className="m-0"
                    handleChange={e => handleChange(e, "zip")}
                  />
                  <br/>
                  <Textbox
                    type="text"
                    label="City"
                    className="m-0"
                    handleChange={e => handleChange(e, "city")}
                  />
                  <br/>
                  <Textbox
                    type="text"
                    label="Country"
                    className="m-0"
                    handleChange={e => handleChange(e, "country")}
                  />
                  <br/>
                  <h3 className="mt-md mb-sm">Account Info</h3>
                  <Textbox
                    type="text"
                    label="Username"
                    className="m-0"
                    handleChange={e => handleChange(e, "username")}
                  />
                  <br />
                  <Textbox
                    type="text"
                    label="Email"
                    className="m-0"
                    handleChange={e => handleChange(e, "email")}
                  />
                  <br />
                  <Textbox
                    type="password"
                    label="Password"
                    className="m-0"
                    handleChange={e => handleChange(e, "password")}
                  />
                  <br />
                  <p>
                    Already have an account? <a href="/login">Login here.</a>
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

function mapStateToProps(state) {
  const { loading, error } = state.auth
  const { loaded, entities } = state.user
  if(loaded && entities.companies)
    return { loading, error, companies: entities.companies }

  return { loading }
}

const Register = connect(mapStateToProps)(RegisterPage)
export { Register }