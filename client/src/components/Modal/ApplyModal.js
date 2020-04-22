import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap'
import { ErrorOutline } from '@material-ui/icons'
import Button from "../Form/SubmitButton"
import { connect } from 'react-redux'
import { request } from '../../api'

const Apply = props => {
  const { show, hideCallback, user, listing } = props

  const [state, setState] = useState({
    modal: show,
    error: null,
    testForApp: false,
    hasAppAlready: false,
    submitted: false,
    message: ""
  });

  if(show != state.modal && show == true)
    setState({ ...state, modal: show, testForApp: false, hasAppAlready: false, message: "" })

  if(!state.testForApp) {
    request("/listings/" + listing + "/applications", null, "GET", true)
    .then(res => {
      var apps = res.data

      for(let i = 0; i < apps.length; i++)
        if(apps[i].profile.id == user.id) {
          setState({ ...state, testForApp: true, hasAppAlready: true, message: "Already have application!" })
          break
        }
    })
    .catch(err => console.log(err))
  }

  const toggle = () => {
    setState({ ...state, modal: !state.modal })
    if(hideCallback) hideCallback(!state.modal)
  }

  const submitApp = () => {
    if(state.submitted || state.hasAppAlready) {
      toggle()
      return
    }

    setState({ ...state, formError: false, message: "" })

    request("/applications/", { profile: user.id, listing: listing }, "POST", true)
    .then(res => setState({ ...state, submitted: true, message: "Submitted application!" }))
    .catch(err => setState({ ...state, error: err, message: "Failed to submit!" }))
  }
  
  console.log(state)

  return (
    <Modal isOpen={state.modal}>
      <Container className="mt-4 mb-4">
        <h2 className="w-100 text-center">Submit an Application!</h2>
        <Row>
          <Col md="10" className="ml-auto mr-auto text-center">
            <p>
              You're well on your way to potentially finding the new
              job that you may have always wanted! To finish the application
              process, click Submit below! That's it!
            </p>
          </Col>
        </Row>
        <hr/>
        <Row className="d-flex justify-content-end mr-2">
          <Col md="1"></Col>
          <Col md="6" className="text-center">
            {(state.submitted || state.error || state.hasAppAlready) && state.message != "" ?
              <p style={{ color: (state.error || state.hasAppAlready ? 'red' : 'green') }}>{state.message}</p>
            : null}
          </Col>
          <Col md="2">
            <Button
              handleClick={toggle}
              size="small"
              variant="outlined"
              color="primary"
            >
              Close
            </Button>
          </Col>
          <Col md="2">
            <Button
              handleClick={submitApp}
              size="small"
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          </Col>
          <Col md="1"></Col>
        </Row>
      </Container>
    </Modal>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

export const ApplyModal = connect(mapStateToProps)(Apply)