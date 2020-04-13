import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DropDown from "../../components/Form/dropdown";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Applications from '../../components/Card/Applications';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CheckboxApp from "../../components/Form/checkbox";
import Textbox from "../../components/Form/textbox";


//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	avatar: {
		backgroundColor: red[500],
	},

	box: {

		border: '2px solid grey',
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		'padding-bottom': '30px',
		width: 500,
		background: 'rgba(88, 88, 88, 0.4)',
	},

	card: {

		flexWrap: 'wrap',
		borderWidth: 1,
		height: '100%',
		width: '1400px',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
		'padding-bottom': '3px',
		border: '4px solid black',
	},

	card_header: {

		fontSize: 14,
		position: 'relative',
		left: '-60px',

	},

	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

	header: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'Calibri',
		'font-size': 40,
	},

	subHeader: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'Calibri',
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
		'padding-bottom': '10px',
		'padding-top': '10px',
	},
	

});

export const Test = props => {

	const classes = useStyles();

	const options = ["Business A",
					"Business B",
					'Business C'];

	const job = ["I.T.",
				"Janitor",
				'Manager'];

	const FullDetails = ["The Communists are distinguished from the other working-class parties by this only: 1. In the national struggles of the proletarians of the different countries, they point out and bring to the front the common interests of the entire proletariat, independently of all nationality. 2. In the various stages of development which the struggle of the working class against the bourgeoisie has to pass through, they always and everywhere represent the interests of the movement as a whole.",
						"The Communists, therefore, are on the one hand, practically, the most advanced and resolute section of the working-class parties of every country, that section which pushes forward all others; on the other hand, theoretically, they have over the great mass of the proletariat the advantage of clearly understanding the line of march, the conditions, and the ultimate general results of the proletarian movement.",
						'The immediate aim of the Communists is the same as that of all other proletarian parties: formation of the proletariat into a class, overthrow of the bourgeois supremacy, conquest of political power by the proletariat.'];

	const Date = ['4/13/2020',
				'4/14/2020',
				'4/15/2020',];

	const statuses = ['Accepted',
					'Unsent',
					'Rejected'];

	var status;
	var i = -1;
	return (
		<div>
			<h3 className={classes.header}>
				Application Page
			</h3>
			<h5 className={classes.subHeader}>
				Here is a list of all applications you have submitted and their respective statuses.
				Good luck on your applications and we hope you and your potential employer can find even ground with each other.
			</h5>
			<br />
			<Container className={classes.row} style={{ backgroundColor: 'white' }}>

				<div>
					<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}> Applications Received: </h1>
					<div className={clsx(classes.step, classes.row)}>
						{options.map(options => (
							i++ ,
							status = 'Status: ' + statuses[i],
							
							<Card className={classes.card}>
								<Applications
									title={options}
									subheader={'Status: ' + statuses[i]}
									job={job[i]}
									FullDetails={FullDetails[i]}
									Date={Date[i]}
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