import React, { Component, useState } from 'react';
import { request } from "../../api/index";
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Container as ContainerBox, Button, Avatar, Typography, Card, CardHeader, CardMedia, CardActions, CardContent, FormControl } from "@material-ui/core"
import clsx from 'clsx';
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import FriendlyCatchUp from "../../assets/stockimages/FriendlyCatchUp.jpg"
import { Container, Row, Col } from 'reactstrap';
import { history } from '../../helpers/history'
import { connect } from 'react-redux';
import { getLocationDataFromZipCode } from '../../helpers/address';


//CSS styling
const useStyles = makeStyles({

	avatar: {
		backgroundColor: red[500],
	},

	box: {
		background: 'rgba(208, 208, 208, 0.4)',
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		width: 500,
	},

	card: {
		backgroundColor: '#D0D0D0',
		border: '4px solid black',
		borderWidth: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
    height: '100%',
    width: "100%",
		'justify-content': 'space-evenly',
	},

	card_bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},

	card_header: {
		fontSize: 14,
		left: '-60px',
		position: 'relative',
	},

	image: {
		margin: 'auto',
		height: 'auto'
	},

	header: {
		color: 'white',
		'font-family': 'Yanone Kaffeesatz',
		margin: 'auto'
	},

	row: {
		display: 'flex',
		flexDirection: 'row',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		maxWidth: '1000px',
		'margin-left': 'auto',
		'margin-right': 'auto',
	},
});

const ListingCard = props => {
  const classes = useStyles();

  const { listing } = props

  const getDateStr = date => {
    const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

    const getNumStr = num => num < 10 ? `0${num}` : num

    const timeStr = `${date.getHours()}:${getNumStr(date.getMinutes())}`

    return `Closes at: ${dateStr} ${timeStr}`
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="business" className={classes.avatar}>
            {listing.company.name.charAt(0)}
          </Avatar>
        }
        title={listing.company.name}
        subheader={getDateStr(new Date(listing.date))}
      />
      <CardContent>
        <Typography color="textWhite"> {listing.title} </Typography>
        <br />
        <Typography color="textSecondary"> {listing.description} </Typography>
      </CardContent>
      <br/>
      <br/>
      <CardActions style={{ position: 'absolute', bottom: 0 }}>
        <Button size="small" href={`/listing/${listing.id}`}>Learn More</Button>
      </CardActions>
    </Card>
  )
}

const SearchPage = props => {
	/*
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	*/

	//Job Search Page

  const classes = useStyles();
  
  const { user } = props

	/* Placeholder data */
	const options = ["Business A"];
	const desc = ["A's description", "B's description", "C's description", "D's description", "E's description"];

	//Determines size of the textboxes
	const TextBoxSize = 225;
  var i = -1;
  
  const [state, setState] = useState({
    listings: null,
    error: null,
    filtered: false,
    filteredListings: null,
    filter: {
      keywords: "",
      location: ""
    }
  })

  if(!state.listings && !state.error)
    request("/listings/", null, "GET", true)
    .then(res => setState({ ...state, listings: res.data }))
    .catch(err => setState({ ...state, error: err }))

  if(state.error)
    history.push({ pathname: "/error", state: { error: state.error } })

  console.log(state)

  const searchClick = async e => {
    setState({ ...state, filtered: false })

    const { keywords, location } = state.filter
    const { listings } = state
    var keywordsArr = keywords.split(", "), locationsArr = location.split(", ")

    var filteredListings = state.filteredListings

    const keywordFilter = listing => {
      for(let i = 0; i < keywordsArr.length; i++)
        if(listing.title.toLowerCase().includes(keywordsArr[i]) || listing.description.toLowerCase().includes(keywordsArr[i]))
          return true

      return false
    }

    const locFilter = listing => {
      const { address } = listing.company

      for(let i = 0; i < locationsArr.length; i++) {
        let loc = locationsArr[i]

        if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(loc)) {
          if(loc == address.zip_code)
            return true

          try {
            var locData = getLocationDataFromZipCode(loc)

            if(address.city.toLowerCase() == locData.city.toLowerCase())
              return true
          } catch(e) {
            //Meh just skip it
          }
        } else {
          if(loc.toLowerCase() == address.city.toLowerCase())
            return true
        }
      }

      return false
    }

    if(keywords != "" && keywordsArr.length > 0) {
      filteredListings = listings.filter(keywordFilter)
    }

    if(location != "" && locationsArr.length > 0) {
      if(filteredListings)
        filteredListings = filteredListings.filter(locFilter)
      else
        filteredListings = listings.filter(locFilter)
    }

    setState({ ...state, filtered: (keywords != "" || location != ""), filteredListings: filteredListings })
  }

	return (
		<Container className="mt-4">
      <Row>
        <Col md="6" className="mt-auto mb-auto">
          <h1 className={clsx(classes.header, classes.box) + " text-center"}>
            Let's Get Started!
          </h1>
          <br />
          <h2 className={clsx(classes.box, classes.header) + " text-center"}>
            Join us and begin the search for a not just a new employer
            but for a new way of life.
          </h2>
        </Col>
        <Col md="6">
          <img src={FriendlyCatchUp} className={classes.image} />
        </Col>
      </Row>
      <br/>
      <Row>
        <div className={clsx(classes.header, classes.box)} style={{ 'text-align': 'center', width: '50%' }}>
					<h3 style={{ color: 'white', 'text-align': 'center' }}><b>Search</b></h3>
					<h4 style={{ color: 'white', 'text-align': 'center' }}>
            It's simple.  For a quick search, just fill out the textboxes below and we'll best match you to your preferences,
            or scroll through the full list of jobs available to view!
            </h4>
				</div>
      </Row>
      <br/>
      <Row>
        <ContainerBox className={classes.row} fixed style={{ backgroundColor: 'white' }}>
          {/* Textbox for Keywords*/}
					<Textbox
						label="Keywords"
						variant="filled"
						backgroundColor='white'
            width={TextBoxSize}
            handleChange={e => setState({ ...state, filter: { ...state.filter, keywords: e.target.value } })}
					/>
					{/* Textbox for Location*/}
					<Textbox
						label="Location"
						variant="filled"
						backgroundColor='white'
            width={TextBoxSize}
            handleChange={e => setState({ ...state, filter: { ...state.filter, location: e.target.value } })}
					/>
					{/*<Textbox
						label="Salary"
						variant="filled"
						backgroundColor='white'
						width={TextBoxSize}
          />*/}
				</ContainerBox>
      </Row>
      <br/>
      <Row>
        <Col md="4" className="ml-auto mr-auto d-flex justify-content-center align-items-center">
          <div className="ml-auto mr-2">
            <SubmitButton
              width='100px'
              backgroundColor="#5C5959"
              variant="contained"
              color="secondary"
              handleClick={searchClick}
            >
            </SubmitButton>
          </div>
          <div className="mr-auto ml-2">
            <SubmitButton
              width='100px'
              backgroundColor="#5C5959"
              variant="contained"
              color="secondary"
              handleClick={e => setState({ ...state, filtered: false, filteredListings: null })}
            >
              Reset
            </SubmitButton>
          </div>
        </Col>
      </Row>
      <br/>
      <Row>
        <h4 className="text-center ml-auto mr-auto" style={{ color: 'white' }}>
					See What We Have To Offer Right Now!
				</h4>
      </Row>
      <br/>
      <Row>
        {state.listings && !state.filtered ? 
        state.listings.map(listing => (!listing.internal_only || (listing.internal_only && listing.company.id == user.company.id)) ? (
          <Col md="4" className="mb-2">
            <ListingCard listing={listing} />
          </Col>
        ) : null) 
        :
         <>
          {state.filtered ?
            <>
              {state.filteredListings.length > 0 ?
                state.filteredListings.map(listing => (!listing.internal_only || (listing.internal_only && listing.company.id == user.company.id)) ? (
                  <Col md="4" className="mb-2">
                    <ListingCard listing={listing} />
                  </Col>
                ) : null)
                :
                <h3 style={{ color: 'white' }} className="text-center ml-auto mr-auto">No Results Found!</h3>
              }
            </>
            :
            <h3 style={{ color: 'white' }} className="text-center ml-auto mr-auto">Loading...</h3>
          }
         </>
        }
      </Row>
      <br/>
      <br/>
		</Container>
	)
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

export const Search = connect(mapStateToProps)(SearchPage)