import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap'
import Button from "../Form/SubmitButton"

export const MessageModal = props => {
  const { title, message, icon, onClose } = props

  const [modal, setModal] = useState(true);

  const toggle = () => {
    setModal(!modal)

    if(onClose) onClose()
  };
  
  return (
    <Modal isOpen={modal}>
      <ModalHeader>
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col className="ml-auto mr-auto">
              {icon}
            </Col>
            <Col className="ml-auto mr-auto">
              <h1>{title ? title : 'Notice'}</h1>
            </Col>
          </Row>
        </Container>
      </ModalHeader>
      <ModalBody>
        {message ? message : "This is a notice!"}
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