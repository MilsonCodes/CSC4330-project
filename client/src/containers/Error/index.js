import React from "react";
import { Container, Row, Column } from 'reactstrap'
import { Card } from '@material-ui/core'
import { ErrorOutline } from "@material-ui/icons"
import { history } from "../../helpers/history";


export const Error = props => {
    //TODO: Create error page
    if(!props.location.state)
      history.push("/")

    const { error } = props.location.state

    const getMessageFromResponse = res => {
      var message = `Status ${res.status}:\n`

      Object.keys(res.data).forEach(elem => message += `\n${res.data[elem]}`)

      return message
    }

    return (
        <div style={{ height: "100%" }}>
          <Container>
            <Card className="mt-5">
              <Row className="mt-5 text-center">
                <ErrorOutline className="ml-auto mr-auto" color="error" style={{ fontSize: "150px" }} />
              </Row>
              <Row className="mt-2 text-center">
                <h1 className="ml-auto mr-auto">An error has occurred!</h1>
              </Row>
              <Row className="mt-2 mb-5 text-center">
                <p className="ml-auto mr-auto">{error.response ? getMessageFromResponse(error.response) : error.message}</p>
              </Row>
            </Card>
          </Container>
        </div>
    );
}