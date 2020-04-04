import React from "react";
import { Container, Row, Column } from 'reactstrap'
import { history } from "../../helpers/history";


export const Error = props => {
    //TODO: Create error page
    if(!props.location.state)
      //history.push("/")

    //Test state
    var state = {
      err: {
        message: "Test error"
      }
    }

    return (
        <div style={{ height: "100%" }}>
          <Container>
            <Row>

            </Row>
          </Container>
        </div>
    );
}