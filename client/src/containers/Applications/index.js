import React, { useState } from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Applications from '../../components/Card/Applications';
import Card from '@material-ui/core/Card';
import { request } from "../../api/index";
import CodeApplication from "../../assets/stockimages/CodeApplication.jpg";
import JobApplication from "../../assets/stockimages/JobApplication.jpg";
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({

	boxHeader: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},

	header: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
	},

	imagewrapper: {
		display: 'block',
		width: '100%',
		height: 'auto',
		margin: 'auto',

		/* Add the blur effect */
		filter: 'blur(2px)',
	},

	subHeader: {
    'margin-left': '4rem',
		'margin-right': '4rem',
		color: 'white',
		position: 'relative',
		'text-align': 'center',
	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'column',
		display: 'flex',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'allign-content': 'center',
	},
}));

const UserApplicationsComp = props => {
  var [state, setState] = useState({
    applications: null,
    error: null
  })

  const { user } = props

	const classes = useStyles();

  /* DATA TO BE PUT IN VIA API LATER */

  //TODO: Remove filtering and use query when it is set up
  if(!state.applications && !state.error)
    request("/applications/", null, "GET", true)
    .then(res => {
      var applications = []

      for(let i = 0; i < res.data.length; i++) { 
        var app = res.data[i]

        if(app.Profile.id === user.user.id)
          applications.push(app)
      }

      setState({ ...state, applications: applications })
    })
    .catch(err => setState({ ...state, error: err }))

  if(state.error)
    console.log(state.error)

  console.log(state)

	const Dates = ['4/13/2020',
		'4/14/2020',
		'4/15/2020',];

	const FullDetails = ["The Communists are distinguished from the other working-class parties by this only: 1. In the national struggles of the proletarians of the different countries, they point out and bring to the front the common interests of the entire proletariat, independently of all nationality. 2. In the various stages of development which the struggle of the working class against the bourgeoisie has to pass through, they always and everywhere represent the interests of the movement as a whole.",
		"The Communists, therefore, are on the one hand, practically, the most advanced and resolute section of the working-class parties of every country, that section which pushes forward all others; on the other hand, theoretically, they have over the great mass of the proletariat the advantage of clearly understanding the line of march, the conditions, and the ultimate general results of the proletarian movement.",
		'The immediate aim of the Communists is the same as that of all other proletarian parties: formation of the proletariat into a class, overthrow of the bourgeois supremacy, conquest of political power by the proletariat.'];

	const job = ["I.T.",
		"Janitor",
		'Manager'];


	const Business = ["Business A",
		"Business B",
		'Business C'];

	const statuses = ['Accepted',
		'Pending',
		'Rejected'];

	const salary = ['$50000',
		'$2000',
		'$90000'];

  var date;

	return (
		<div style={{ backgroundImage: `url(${CodeApplication})`, backgroundRepeat: "repeat-y", minHeight: "100%" }}>
			<br />
			{/* Page header */}
			<h1 className={classes.header}>
				Application Page
			</h1>
			{/* Page Subheader */}
			<h3 className={classes.subHeader}>
				Here is a list of all applications you have submitted and their respective statuses.
				Good luck on your applications and we hope you and your potential employer can find even ground with each other.
			</h3>
			<br />

			{/* Page box that will contain the contents of all applications found.  Each one will be generated based upon the applications found by that user*/}

			<Container style={{ backgroundColor: 'white', 'border-radius': '25px' }}>
        <Row className="pt-3 mb-3 ml-auto mr-auto" style={{ width: "100%" }}>
				  <h1 className="ml-auto mr-auto text-center"> Applications: </h1>
        </Row>
				<Row>
          {/* For each application found, generate a card giving out the details for each application */}
          {state.applications && state.applications.length > 0 ?
            <>
              {state.applications.map(application => (
                date = new Date(application.date_submitted),
                <Col md="6" xs="12">
                  <Card className="mb-4" style={{ 'border-style': 'hidden' }}>
                    <Applications
                      /* Business Name*/
                      company={application.listing.company.name}
                      /* Status of application */
                      status={application.status}
                      /* Title of job position the user was applying for */
                      title={application.listing.title}
                      /* The details of job, business, or application */
                      description={application.listing.description}
                      /* Date Application Was Submitted */
                      submitDate={new Intl.DateTimeFormat('en-US').format(date)}
                      /* Salary */
                      salary={application.listing.salary ? application.listing.salary : "Unknown"}
                    >
                    </Applications>
                  </Card>
                </Col>
              ))}
            </>
            :
            <>
              {state.applications && state.applications.length == 0 ?
                <Col md="6" className="ml-auto mr-auto mt-5 mb-5 text-center">
                  <h1>No Applications Found</h1>
                  <h4>Go out and apply!</h4>
                </Col>
                :
                <Col md="4" className="ml-auto mr-auto mt-5 mb-5">
                  <h1 className="text-center">Loading...</h1>
                </Col>
              }
            </>
          }
				</Row>
			</Container>
			<br />
		</div>
	);
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

export const UserApplications = connect(mapStateToProps)(UserApplicationsComp)