import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DropDown from "../../components/Form/dropdown";
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
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
		width: '300px',
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

	header: {

		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'Calibri',
		'font-size': 40,

	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'row',
		display: 'flex',
		maxWidth: '1500px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'allign-content': 'center',
		'padding-bottom': '10px',
		'padding-top': '10px',
	},

	step: {
	},
	

});

//Job application listing page
//Create a page list of what you've applied for and the statuses of each one
export const Test = props => {

	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	
	const options = ["Business A", "Business B"];
	const desc = ["Your Application Content", "Your Application Submitted here"];
	var i = -1;
	return (
		<div>
			<h3 className={clsx(classes.header)}>
				Application Page
			</h3>
			
			<br />
			<h4 className={classes.header}>Applications</h4>
			
			<Container className={classes.row} style={{ backgroundColor: 'white' }}>

				<div>
					<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}> Applications Received: </h1>
					<div className={clsx(classes.step, classes.row)}>
						{options.map(options => (
							i++ ,
							<Card className={classes.card}>
								<CardHeader
									title={options}
									subheader="Date Submitted"
									style={{'text-align': 'center'}}
								/>
								<CardContent>
									<br />
									<Typography color="textSecondary"> {desc[i]} </Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Status: [Received/Approved]</Button>
								</CardActions>
							</Card>
						))
						}
						</div>
				</div>
			</Container>

		</div>

	);
}