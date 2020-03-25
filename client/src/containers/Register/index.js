import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Card, CardHeader } from "@material-ui/core";

const Register = props => {
    //TODO: Determine fields for register page

    var [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (event, field) => {
        var newState = {...state}
        newState[field] = event.target.value
        setState(newState)
    }

    const onSubmit = event => {
        event.preventDefault()
        console.log(state)
    }

    return (
        <> 
            <Container className="mt-4 mb-4">
                <Row>
                    <Col md="8" className="ml-auto mr-auto">
                        <Card>
                            <Container className="mt-3 mb-3">
                                <h2>Register</h2>
                                <br/>
                                <Form className="form">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>First Name</Label>
                                                <Input
                                                    type="name"
                                                    name="first_name"
                                                    placeholder="First"
                                                    onChange={e => handleChange(e, "first_name")}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>Last Name</Label>
                                                <Input
                                                    type="name"
                                                    name="last_name"
                                                    placeholder="Last"
                                                    onChange={e => handleChange(e, "last_name")}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="myemail@email.com"
                                            onChange={e => handleChange(e, "email")}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            onChange={e => handleChange(e, "password")}
                                        />
                                    </FormGroup>
                                    <br/>
                                    <p>
                                        Already have an account? <a href="/login">Login here.</a>
                                    </p>
                                    <br/>
                                    <Button onClick={onSubmit}>Submit</Button>
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Register