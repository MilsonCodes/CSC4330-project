import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Row, Col, Form } from "reactstrap";
import { Card } from "@material-ui/core";
import Textbox from "../../components/Form/textbox"
import Checkbox from "../../components/Form/checkbox"
import Button from "../../components/Form/SubmitButton"

export const Register = props => {
    //TODO: Determine fields for register page

    var [state, setState] = useState({
        form: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: ""
        }
    });

    const handleChange = (event, field) => {
        var newState = {...state}
        newState.form[field] = event.target.value
        setState(newState)
    }

    const onSubmit = event => {
        event.preventDefault()
        console.log(state)

        //TODO: IT'S TIME TO REGISTER SOMEONE :D
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
                                    <Textbox
                                                type="text"
                                                label="Username"
                                                className="m-0"
                                                handleChange={e => handleChange(e, "username")}
                                            />
                                    <br/>
                                    <Textbox
                                        type="text"
                                        label="Email"
                                        className="m-0"
                                        handleChange={e => handleChange(e, "email")}
                                    />
                                    <br/>
                                    <Textbox
                                        type="password"
                                        label="Password"
                                        className="m-0"
                                        handleChange={e => handleChange(e, "password")}
                                    />
                                    <br/>
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