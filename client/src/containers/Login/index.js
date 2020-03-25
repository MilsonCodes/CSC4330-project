import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Card, CardHeader } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}))

const Login = props => {
    const classes = useStyles()

    var [state, setState] = useState({
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
                    <Col md="6" className="ml-auto mr-auto">
                        <Card>
                            <Container className="mt-3 mb-3">
                                <h2>Login</h2>
                                <br/>
                                <Form className="form">
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
                                        Don't have an account? <a href="/register">Register here.</a>
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

export default Login