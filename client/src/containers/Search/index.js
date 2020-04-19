import React, { Component } from 'react';
import { request } from "../../api/index";
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import FriendlyCatchUp from "../../assets/stockimages/FriendlyCatchUp.jpg"

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
		'justify-content': 'space-evenly',
		'padding-bottom': '3px',
		width: '300px',
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
		position: "absolute",
		margin: 'auto',
		height: 'auto',
		top: '100px',
		right: '150px',
	},

	header: {
		color: 'white',
		'font-family': 'Yanone Kaffeesatz',
		'font-size': 40,
		margin: 'auto',
		position: 'relative',
		right: "500px",
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

export const Search = props => {
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

	/* Placeholder data */
	const options = ["Business A"];
	const desc = ["A's description", "B's description", "C's description", "D's description", "E's description"];

	//Determines size of the textboxes
	const TextBoxSize = 225;
	var i = -1;

	return (
		<div style={{ overflow: "auto" }}>
			<br />
			<header>
				{/* Main header */}
				<h1 className={clsx(classes.header, classes.box)}>
					Let's get started
				</h1>
				<br />
				{/* Sub header */}
				<h2 className={clsx(classes.box, classes.header)}>
					Join us and begin the search for a not just a new employer
					but for a new way of life.
				</h2>
			</header>
			<img src={FriendlyCatchUp} className={classes.image} />

			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<div>
				<div className={clsx(classes.header, classes.box)} style={{ 'text-align': 'center', 'margin-left': '55%', width: '50%' }}>
					{/* Search header */}
					<h4 style={{ color: 'white', 'text-align': 'center' }}>Search</h4>
					<h4 style={{ color: 'white', 'text-align': 'center' }}>It's simple.  For a quick search, just fill out the textboxes below and we'll best match you to your preferences.</h4>
				</div>

				<br />

				<Container className={classes.row} fixed style={{ backgroundColor: 'white' }}>
					{/* Textbox for Keywords*/}
					<Textbox
						label="Keywords"
						variant="filled"
						backgroundColor='white'
						width={TextBoxSize}
					/>
					{/* Textbox for Location*/}
					<Textbox
						label="Location"
						variant="filled"
						backgroundColor='white'
						width={TextBoxSize}
					/>
					{/* Textbox for Salary*/}
					<Textbox
						label="Salary"
						variant="filled"
						backgroundColor='white'
						width={TextBoxSize}
					/>
				</Container>
				<br />
				{/* Generates the button to submit data*/}
				<SubmitButton
					width='100px'
					marginLeft="292px"
					backgroundColor="#5C5959"
					variant="contained"
					color="secondary"
				>
				</SubmitButton>
				{/* Header for the results generated*/}
				<h4 style={{ display: 'flex', 'margin-left': '35%', 'text-align': 'center', top: '1000px', color: 'white' }}>
					See what we have to offer right now
				</h4>

				<div className={classes.row}>
					{/* Generates a series of cards which will display information related to what the user has searched for*/}
					{options.map(options => (
						i++ ,
						<Card className={classes.card}>
							<CardHeader
								/* Generates a profile picture */
								avatar={
									<Avatar aria-label="business" className={classes.avatar}>
										I
									</Avatar>
								}
								/* Business Name */
								title={options}
								subheader="Date"
							/>
							<CardContent>
								<br />
								{/* Description of the business */}
								<Typography color="textSecondary"> {desc[i]} </Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					))
					}
				</div>
			</div>
			<br />
		</div>
	)
}