import React from 'react'
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

export const CompanyProfile = props => {

  const classes = useStyles();

  const CompanyName = "Company A";
  const CompanyDescription = 'He discovered a trick that was immensely hard to pull off.  It required ten angle perfect inputs, thirteen pixel perfect inputs, and alternating buttons every 60th of a second without pausing.  It took place in the last minute of the run, and he had to be there on the perfect frame, which meant completely perfect play up to that point.Additionally, not only was his position required to be right, but his subpixel position, which takes too long to manipulate and is essentially RNG(7 / 3000 chance) had to be right as well.In all, the trick saved around three tenths of a second. Obviously, it was worth going for it.';
  const State = "Washington";
  const PhoneNumber = "123-456-789";
  const Email = "fakeAddress@fakeDomain.com";
  /* DATA TO BE PUT IN VIA API LATER */

  return (
    <>
    <img src={WorkingTogether} className={classes.imagewrapper} />
    <div style={{ position: "absolute", width: "100%", top: 120 }}>
      <Container className="mt-4 mb-4">
        {/*-----------------------------COMPANY DESCRIPTION & CONTACT INFORMATION BOX------------------------------------*/}
        <Row>
          <Col md="8">
            <ContainerBox className="ml-auto mr-auto" className={clsx(classes.box, classes.imagebox)}>
              <h3>{CompanyName}</h3>
              <hr />
              {/*---------------------------------------LOCATION----------------------------------------------*/}
              <Typography color="primary" className={classes.BoldAndBrash}>Location: {State}</Typography>
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
                <Typography className={classes.BoldAndBrash}> Phone: {PhoneNumber}</Typography>
              </div>
              <br />
              {/*---------------------------------------EMAIL----------------------------------------------*/}
              <div className={classes.IconAndText}>
                <EmailIcon style={{ 'margin-right': '5px' }} />
                <Typography className={classes.BoldAndBrash}>Email: {Email}</Typography>
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
                Send an application
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
                Ecolibrium Farms
              </Typography>
              <Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
                15410 Northeast 124th StreetRedmond
              </Typography >
              <Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
                WA 98052
              </Typography>
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
                {CompanyDescription}
              </Typography>
            </ContainerBox>
          </Col>
        </Row>
        <br/>
      </Container>
    </div >
    </>
  );
}