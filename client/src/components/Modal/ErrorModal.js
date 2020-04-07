import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap'
import { ErrorOutline } from '@material-ui/icons'
import Button from "../Form/SubmitButton"

export const ErrorModal = props => {
  const { error } = props

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);
  
  return (
    <Modal isOpen={modal}>
      <ModalHeader>
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col className="ml-auto mr-auto">
              <ErrorOutline fontSize="large" color="error" />
            </Col>
            <Col className="ml-auto mr-auto">
              <h1>{error.response.status}</h1>
            </Col>
          </Row>
        </Container>
      </ModalHeader>
      <ModalBody>
        {error.response.data.detail}
      </ModalBody>
      <ModalFooter>
        <Button
          handleClick={toggle}
          size="small"
          variant="outlined"
          color="primary"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}