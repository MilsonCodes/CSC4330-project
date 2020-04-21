import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import Button from "../Form/SubmitButton"
import { connect } from 'react-redux'
import { request } from '../../api'
import Textbox from '../Form/textbox'
import Checkbox from "../Form/checkbox"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Chip, Avatar } from '@material-ui/core'

const Listing = props => {
  const { user, show, hideCallback } = props

  const [state, setState] = useState({
    modal: false,
    form: {
      title: "",
      description: "",
      committee: -1,
      company: user.company.id,
      internal_only: false,
      key_words: "",
      active: true,
      date: new Date()
    },
    committeeForm: {
      name: "",
      members: [],
      company: user.company.id
    },
    company: user.company,
    users: null,
    committees: null,
    filtered: false,
    error: null,
    dropdown: false,
    comDropdown: false,
    submitted: false,
    formError: false,
    message: ""
  });

  if(!state.users && !state.error) {
    request("/users/", null, "GET", true)
    .then(res => setState({ ...state, users: res.data }))
    .catch(err => setState({ ...state, error: err }))
  }

  if(!state.committees && !state.error) {
    request("/committee/", null, "GET", true)
    .then(res => setState({ ...state, committees: res.data }))
    .catch(err => setState({ ...state, error: err }))
  }

  if(state.users && state.committees && !state.filtered) {
    var users = state.users.filter(user => {
      return user.company.id === state.company.id && user.manager
    })

    var committees = state.committees.filter(committee => {
      return committee.company.id === state.company.id
    })

    setState({ ...state, users: users, committees: committees, filtered: true })
  }

  if(state.modal != show)
    setState({ ...state, modal: show })

  const toggle = () => {
    setState({ ...state, modal: !state.modal })
    if(hideCallback) hideCallback(!state.modal)
  }

  const toggleDrop = () => setState({ ...state, dropdown: !state.dropdown })
  const toggleComDrop = () => setState({ ...state, comDropdown: !state.comDropdown })

  console.log(state)

  const updateField = (field, val) => {
    var newState = { ...state }
    newState.form[field] = val
    setState(newState)
  }

  const updateCommittee = val => {
    var newState = { ...state }
    newState.form.committee = val
    setState(newState)
  }

  const updateCommitteeForm = (field, val) => {
    var newState = { ...state }
    newState.committeeForm[field] = val
    setState(newState)
  }

  const addUser = user => {
    var members = state.committeeForm.members

    if(!members.includes(user))
      members.push(user)
    
    updateCommitteeForm("members", members)
  }

  const removeUser = user => {
    var members = state.committeeForm.members

    for(let i = 0; i < members.length; i++)
      if(members[i] == user){
        members.splice(i, 1)
        break
      }

    updateCommitteeForm("members", members)
  }

  const convertToStr = arr => {
    var str = ""

    for(let i = 0; i < arr.length; i++)
      str += `${arr[i]}${i < arr.length - 1 ? ", " : ""}`

    return str
  }

  const keyDownKeyWords = e => {
    if(e.key === "Enter") {
      e.preventDefault()

      var keyWord = e.target.value, keyWords = state.form.key_words != "" ? state.form.key_words.split(", ") : []

      if(!keyWords.includes(keyWord)){
        keyWords.push(keyWord)
        updateField("key_words", convertToStr(keyWords))
      }

      e.target.value = null
    }
  }

  const deleteSkill = index => {
    var keyWords = state.form.key_words != "" ? state.form.key_words.split(", ") : []
    keyWords.splice(index, 1) 
    updateField("key_words", convertToStr(keyWords))
  }

  const submitListing = e => {
    if(state.submitted) {
      toggle()
      return
    }

    setState({ ...state, formError: false, message: "" })

    var { form, committeeForm } = state

    if(form.committee == -1) {
      if(committeeForm.name == "" || committeeForm.members == []) {
        setState({ ...state, formError: true, message: "Missing committee values!" })
        return
      }

      var trueMembers = []

      committeeForm.members.forEach(member => trueMembers.push(state.users[member].id))

      committeeForm.members = trueMembers

      request("/committee/", committeeForm, "POST", true)
      .then(res => {
        console.log(res)
        form.committee = res.data.id

        submitListingData(form)
      })
      .catch(err => {
        setState({ ...state, error: err, message: "Failed to make committee!" })
        return
      })
    } else {
      submitListingData(form)
    }
  }

  const submitListingData = form => {
    form.date = form.date.toISOString()

    if(form.title == ""
    || form.description == ""
    || form.key_words == "") {
      console.log(form)
      setState({ ...state, formError: true, message: "Missing listing values!" })
      return
    }

    request("/listings/", form, "POST", true)
    .then(res => {
      console.log(res)
      setState({ ...state, submitted: true, message: "Created listing!" })
    })
    .catch(err => {
      setState({ ...state, error: err, message: "Failed to make listing!" })
      return
    })
  }
  
  return (
    <Modal isOpen={state.modal}>
      <Container className="mt-4 mb-4">
        <Row className="d-flex justify-content-center">
          <h3>Create Listing</h3>
        </Row>
        <hr/>
        <Row>
          <Textbox
            type="text"
            label="Title"
            required
            variant="filled"
            className="ml-auto mr-auto mb-2"
            handleChange={e => updateField("title", e.target.value)}
          />
          <br/>
          <Textbox
            type="text"
            label="Description"
            required
            variant="filled"
            multiline="true"
            className="ml-auto mr-auto mb-2"
            handleChange={e => updateField("description", e.target.value)}
          />
        </Row>
        <Row>
          <Col md="10" className="d-flex align-items-center ml-auto mr-auto">
            <label>Committee:</label>
            <Dropdown isOpen={state.dropdown} toggle={toggleDrop} className="ml-2">
              <DropdownToggle caret>
                {!state.committees ?
                  "Loading..."
                  :
                  state.form.committee != -1 ? state.committees[state.form.committee].name : "New Committee"
                }
              </DropdownToggle>
              <DropdownMenu>
                {!state.committees ?
                  <DropdownItem header>Loading...</DropdownItem>
                  :
                  <>
                    {state.committees.map((elem, index) => <DropdownItem onClick={() => updateCommittee(index)}>{elem.name}</DropdownItem>)}
                  </>
                }
                <DropdownItem onClick={() => updateCommittee(-1)}>New Committee</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        {state.form.committee == -1 ? 
          <>
            <hr/>
            <Row>
              <Textbox
                type="text"
                label="Committee Name"
                required
                variant="filled"
                className="ml-auto mr-auto mb-2"
                handleChange={e => updateCommitteeForm("name", e.target.value)}
              />
            </Row>
            <Row>
              <Col md="10" className="d-flex align-items-center ml-auto mr-auto">
                <label>Select User to Add:</label>
                <Dropdown isOpen={state.comDropdown} toggle={toggleComDrop} className="ml-2">
                  <DropdownToggle caret>Users</DropdownToggle>
                  <DropdownMenu>
                    {!state.users ?
                      <DropdownItem header>Loading...</DropdownItem>
                      :
                      <>
                        {state.users.map((elem, index) => <DropdownItem onClick={() => addUser(index)}>{elem.first_name} {elem.last_name}</DropdownItem>)}
                      </>
                    }
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            {state.users && state.committeeForm.members.length > 0 ? <Row>
              <Col md="10" className="ml-auto mr-auto mt-2 mb-1">
                {state.committeeForm.members.map(i => (
                  <Chip
                    avatar={<Avatar>{state.users[i].first_name.charAt(0)}{state.users[i].last_name.charAt(0)}</Avatar>}
                    onDelete={() => removeUser(i)}
                    label={`${state.users[i].first_name} ${state.users[i].last_name}`}
                    className="mb-1 mr-1"
                  ></Chip>
                ))}
              </Col>
            </Row> : null}
            <hr/>
          </>
        :
          null
        }
        <Row>
          <Col md="10" className="ml-auto mr-auto">
            <Checkbox
              label="Primary"
              className="ml-4"
              row="row"
              options={['Internal Only']}
              onChange={e => updateField("internal_only", e.target.checked)}
            />
          </Col>
        </Row>
        <Row>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Col md="5" className="ml-auto">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label="Expiration Date"
                value={state.form.date}
                onChange={date => updateField("date", date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Col>
            <Col md="5" className="mr-auto">
              <KeyboardTimePicker
                id="time-picker"
                label="Expiration Time"
                value={state.form.date}
                onChange={date => updateField("date", date)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Col>
          </MuiPickersUtilsProvider>
        </Row>
        <hr/>
        <Row>
          <Textbox
            type="text"
            label="Key Words"
            required
            variant="filled"
            className="ml-auto mr-auto mb-2"
            onKeyDown={keyDownKeyWords}
          />
        </Row>
        <Row>
          <Col md="10" className="ml-auto mr-auto">
            {state.form.key_words != "" ?
              state.form.key_words.split(", ").map((keyWord, i) => (
                <Chip
                  label={keyWord}
                  onDelete={() => deleteSkill(i)}
                  className="mr-1"
                />
              )) : null}
          </Col>
        </Row>
        <hr/>
        <Row className="d-flex justify-content-end mr-2">
          <Col md="1"></Col>
          <Col md="5" className="text-center">
            {(state.submitted || state.error || state.formError) && state.message != "" ?
              <p style={{ color: (state.error || state.formError ? 'red' : 'green') }}>{state.message}</p>
            : null}
          </Col>
          <Col md="1"></Col>
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
              handleClick={submitListing}
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

export const ListingModal = connect(mapStateToProps)(Listing)