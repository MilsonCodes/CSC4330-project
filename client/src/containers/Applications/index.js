import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Applications from '../../components/Card/Applications';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { request } from "../../api/index";
import CodeApplication from "../../assets/stockimages/CodeApplication.jpg";
import JobApplication from "../../assets/stockimages/JobApplication.jpg";

const useStyles = makeStyles({

	boxHeader: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},

	header: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'serif-voga',
		'font-size': 40,
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
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'serif-voga',
		'font-size': 30,
		maxWidth: '1500px',
	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'column',
		display: 'flex',
		maxWidth: '1500px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'allign-content': 'center',
	},
});

export const UserApplications = props => {

	const classes = useStyles();

	/* DATA TO BE PUT IN VIA API LATER */

	const Date = ['4/13/2020',
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

	var status;
	var i = -1;

	return (
		<div style={{ "backgroundImage": `url(${CodeApplication})` }}>
			<br />
			{/* Page header */}
			<h3 className={classes.header}>
				Application Page
			</h3>
			{/* Page Subheader */}
			<h5 className={classes.subHeader}>
				Here is a list of all applications you have submitted and their respective statuses.
				Good luck on your applications and we hope you and your potential employer can find even ground with each other.
			</h5>
			<br />

			{/* Page box that will contain the contents of all applications found.  Each one will be generated based upon the applications found by that user*/}

			<Container className={classes.row} style={{ backgroundColor: 'white', 'border-radius': '25px' }}>
				<div>
					<h1 className={classes.boxHeader}> Applications Received: </h1>
					<div className={classes.row}>

						{/* For each application found, generate a card giving out the details for each application */}
						{Business.map(Business => (
							i++ ,
							status = 'Status: ' + statuses[i],

							<Card className={classes.card} style={{ 'padding-bottom': '15px', 'border-style': 'hidden' }}>
								<Applications
									/* Business Name*/
									Business={Business}
									/* Status of application */
									subheader={'Status: ' + statuses[i]}
									/* What tyep of job the user was applying for */
									job={job[i]}
									/* The details of job, business, or application */
									FullDetails={FullDetails[i]}
									/* Date */
									Date={Date[i]}
									/* Salary */
									Salary={salary[i]}
								>
								</Applications>
							</Card>
						))
						}
					</div>
				</div>
			</Container>
			<br />
		</div>
	);
}