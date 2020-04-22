import React, { useState } from 'react'
import styled from "styled-components";
import clsx from 'clsx';
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import ContainerBox from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputIcon from '@material-ui/icons/Input';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { request } from "../../api/index";
import WorkingTogether from "../../assets/stockimages/WorkingTogether.jpg";
import SkyScraper from "../../assets/stockimages/Skyscraper.jpg"
import OfficeBuilding from "../../assets/stockimages/OfficeBuildingCrop.jpg"
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getStateFromZipCode } from '../../helpers/address'
import { history } from '../../helpers/history'
import ListingCard from "../../components/Card/Listing"
import SubmitButton from "../../components/Form/SubmitButton"
import { Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { ListingModal } from '../../components/Modal/ListingModal';

const useStyles = makeStyles(theme => ({

  Address: {
    'color': 'white',
    'font-size': '14px',
    'margin-left': '5px',
  },

  BoldAndBrash: {
    'font-weight': 'bold',
    'font-size': '18px',
  },

  box: {
    backgroundColor: 'white',
    'padding-top': '20px',
    'padding-bottom': '20px',
    'backdrop-filter': 'blur(4px)',
    borderRadius: '15px',
  },

  boxHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  darkbox: {
    //Slightly dark background
    background: 'rgba(0, 0, 0, 0.69)',
    //Blurs the background of the textbox
    'backdrop-filter': 'blur(4px)',
    'border-width': 'small',
    border: "2px solid rgba(0, 0, 0, 0.69)",
  },

  header: {
    color: 'white',
    position: 'relative',
    'text-align': 'center',
    'font-family': 'serif-voga',
    'font-size': 40,
  },

  IconAndText: {
    display: 'flex',
    'flex-direction': 'row',
  },

  imagebox: {
    //Slightly dark background
    background: 'rgba(189, 189, 189, 0.69)',
    //Blurs the background of the textbox
    'backdrop-filter': 'blur(4px)',
    'border-width': 'small',
    border: "2px solid rgba(0, 0, 0, 0.69)",
    borderRadius: '15px'
  },

  backgroundImg: {
    backgroundImage: "url(../../assets/stockimages/WorkingTogether.jpg)",
    backdropFilter: "blur(2px)"
  },

  imagewrapper: {

    display: 'block',
    width: '100%',
    height: 'auto',
    margin: 'auto',

    /* Add the blur effect */
    filter: 'blur(2px)',
  },

  largeIcon: {
    width: 60,
    height: 60,
  },

  subHeader: {
    color: 'white',
    position: 'relative',
    'text-align': 'center',
    'font-family': 'serif-voga',
    'font-size': 30,
  },

  row: {
    'margin-left': 'auto',
    'margin-right': 'auto',
    flexDirection: 'row',
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'space-evenly',
    'align-content': 'center',
  },
}));

const CompanyProfilePage = props => {
  const classes = useStyles();

  var [state, setState] = useState({
    company: null,
    error: null,
    editable: false,
    filtered: false,
    listings: null,
    showModal: false
  })

  const { user } = props

  if(state.error)
    history.push({ pathname: "/error", state: { error: state.error } })

  if(props.match.params.id && !state.company) {
    request("/company/" + props.match.params.id + "/", null, "GET", true)
    .then(res => setState({ ...state, company: res.data }))
    .catch(err => setState({ ...state, error: err }))
  } else if(!props.match.params.id && !state.company) {
    setState({ ...state, company: user.company, editable: user.manager })
  }

  if(!state.listings) {
    request("/listings/", null, "GET", true)
    .then(res => setState({ ...state, listings: res.data }))
    .catch(err => setState({ ...state, error: err }))
  }

  if(state.company && state.listings && !state.filtered) {
    var listings = state.listings.filter(listing => {
      return (listing.company === state.company.id && (!listing.internal_only || listing.internal_only && listing.company === user.company.id))
    })

    setState({ ...state, listings: listings, filtered: true })
  }

  console.log(state.company)
  console.log(state.listings)

  if(state.company && !state.company.address.state) {
    const zipCode = state.company.address.zip_code
    
    const updateCallback = st => {
      var newState = { ...state }
      newState.company.address.state = st;
      setState(newState)
    }

    getStateFromZipCode(zipCode, updateCallback, err => setState({ ...state, error: err }))
  }

  const CompanyName = "Company A";
  const CompanyDescription = 'He discovered a trick that was immensely hard to pull off.  It required ten angle perfect inputs, thirteen pixel perfect inputs, and alternating buttons every 60th of a second without pausing.  It took place in the last minute of the run, and he had to be there on the perfect frame, which meant completely perfect play up to that point.Additionally, not only was his position required to be right, but his subpixel position, which takes too long to manipulate and is essentially RNG(7 / 3000 chance) had to be right as well.In all, the trick saved around three tenths of a second. Obviously, it was worth going for it.';
  const State = "Washington";
  const PhoneNumber = "123-456-789";
  const Email = "fakeAddress@fakeDomain.com";
  /* DATA TO BE PUT IN VIA API LATER */

  const { company } = state

  return (
    <>
      <ListingModal show={state.showModal} hideCallback={show => setState({ ...state, showModal: show })} />
      {company ?
        <>
          <img src={WorkingTogether} className={classes.imagewrapper} />
          <div style={{ position: "absolute", width: "100%", top: 120 }}>
            <Container className="mt-4 mb-4">
              {/*-----------------------------COMPANY DESCRIPTION & CONTACT INFORMATION BOX------------------------------------*/}
              <Row>
                <Col md="8">
                  <ContainerBox className="ml-auto mr-auto" className={clsx(classes.box, classes.imagebox)}>
                    <h3>{company.name ? company.name : "No Name"}</h3>
                    <hr />
                    {/*---------------------------------------LOCATION----------------------------------------------*/}
                    {company.address.state && company.address.city ?
                      <Typography color="primary" className={classes.BoldAndBrash}>Location: {company.address.city}, {company.address.state}</Typography>
                    : null}
                    <br />
                    {/*---------------------------------------FIELD----------------------------------------------*/}
                    <Typography color="primary" className={classes.BoldAndBrash}>Field: Technology</Typography>

                    <br />
                    {/*-----------------------------CONTACT INFORMATION SUBHEADER------------------------------------*/}
                    <h2>Contact Information</h2>
                    <hr />
                    {/*---------------------------------------PHONE----------------------------------------------*/}
                    <div className={classes.IconAndText}>
                      <PhoneIcon style={{ 'margin-right': '5px' }} />
                      <Typography className={classes.BoldAndBrash}> Phone: {company.phone ? company.phone : "N/A"}</Typography>
                    </div>
                    <br />
                    {/*---------------------------------------EMAIL----------------------------------------------*/}
                    <div className={classes.IconAndText}>
                      <EmailIcon style={{ 'margin-right': '5px' }} />
                      <Typography className={classes.BoldAndBrash}>Email: {company.email ? company.email : "N/A"}</Typography>
                    </div>
                  </ContainerBox>
                </Col>
                <Col md="4" className="d-flex flex-column">
                  {/* Generates the send an application box */}
                  <ContainerBox
                    className={(classes.box, classes.imagebox) + " mt-auto mb-3"}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Input Icon */}
                    <InputIcon className={classes.largeIcon} style={{ 'padding-top': '13px' }} />
                    {/* Subtext */}
                    <Typography className={classes.BoldAndBrash} style={{ 'margin-bottom': '25px', width: 'auto' }}>
                      Send an Application
                    </Typography>
                  </ContainerBox>
                  {/* Generates the visit website box*/}
                  <ContainerBox
                    className={(classes.box, classes.imagebox)  + " mt-3 mb-auto"}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Link Icon */}
                    <InsertLinkIcon className={classes.largeIcon} />
                    {/* Subtext */}
                    <Typography className={classes.BoldAndBrash} style={{ 'margin-bottom': '25px' }}>
                      Visit Website
                    </Typography>
                  </ContainerBox>
                </Col>
              </Row>
              <br />
              <Row className="d-flex justify-content-center align-items-center">
                <Col md="6">
                  {/*-----------------------------IMAGE PLACEMENT------------------------------------*/}
                  <img src={OfficeBuilding} className={classes.box, classes.darkbox} style={{ width: '100%', height: 'auto', borderBottom: 0 }}/>
                  {/*-----------------------------IMAGE SUBTEXT (ADDRESS)------------------------------------*/}
                  <div className={classes.box, classes.darkbox}>
                    {/*------------------------------------ADDRESS CONTENT-------------------------------------*/}
                    <Typography className={classes.BoldAndBrash, classes.Address}>
                      {company.name ? company.name : "No Name"}
                    </Typography>
                    {company.address.address1 ? <Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
                      {company.address.address1}
                    </Typography > : null}
                    {company.address.address2 ? <Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
                      {company.address.address2}
                    </Typography > : null}
                    {company.address.city && company.address.state && company.address.zip_code ? <Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
                      {company.address.city} {company.address.state}, {company.address.zip_code}
                    </Typography> : null}
                  </div >
                </Col>
                <Col md="6">
                  {/*-----------------------------ABOUT THE COMPANY TEXTBOX------------------------------------*/}
                  {/* Provides a description of the company */}
                  <ContainerBox className={clsx(classes.box, classes.imagebox)}>
                    <h3>About this company</h3>
                    <hr />
                    {/* Company Description */}
                    <Typography color='primary'>
                      {company.description ? company.description : "No description"}
                    </Typography>
                  </ContainerBox>
                </Col>
              </Row>
              <br/>
              <Row>
                <ContainerBox className={clsx(classes.box, classes.imagebox)}>
                  <Row>
                    <Col md="4" className="d-flex align-items-center justify-content-start">
                      {user.manager ? <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUpload />}
                        onClick={e => setState({ ...state, showModal: true })}
                      >
                        Add Listing
                      </Button> : null}
                    </Col>
                    <Col md="4" className="text-center">
                      <h1>Listings</h1>
                    </Col>
                    <Col md="4" className="text-right d-flex align-items-center justify-content-end">
                      <h3 className="mt-auto mb-auto"><a href={`/search?keywords=${encodeURIComponent(company.name)}`}>See all...</a></h3>
                    </Col>
                  </Row>
                  <br/>
                  <br/>
                  <Row>
                    {state.filtered ?
                      <>
                        {state.listings.length > 0 ?
                          state.listings.map((listing, index) => (index < 3) ? (
                            <Col md="4" className="mb-2">
                              <ListingCard listing={listing} company={company} />
                            </Col>
                          ) : null)
                          :
                          <h3 style={{ color: 'white' }} className="text-center ml-auto mr-auto">No Results Found!</h3>
                        }
                      </>
                      :
                      <h3 style={{ color: 'white' }} className="text-center ml-auto mr-auto">Loading...</h3>
                    }
                  </Row>
                </ContainerBox>
              </Row>
            </Container>
          </div >
        </>
      :
        <div>
          <h1>Loading...</h1>
        </div>
      }
    </>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

export const CompanyProfile = connect(mapStateToProps)(CompanyProfilePage)