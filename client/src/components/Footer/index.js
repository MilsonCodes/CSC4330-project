import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";

const useStyles = makeStyles(theme => ({

}));

//TODO: Craft the damn footer
export default function Footer(props) {
  const classes = useStyles()

  return (
    <div>
      <Container>
        <Row>
          <Col md="4" xs="12">
            <h1>FOOTER LOL</h1>
          </Col>
          <Col md="4" xs="12">

          </Col>
        </Row>
      </Container>
    </div>
  )
}