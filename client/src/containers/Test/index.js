import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import FriendlyCatchUp from "../../assets/stockimages/FriendlyCatchUp.jpg"

//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	box: {

		border: '2px solid grey',
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		width: 500,
		background: 'rgba(88, 88, 88, 0.4)',
	},

	card: {
		
		flexWrap: 'wrap',
		borderWidth: 1,
		height: '100%',
		width: '225px',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
	},

	card_bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},

	card_header: {

		fontSize: 14,
		position: 'relative',
		left: '-60px',

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
		position: 'relative',
		right: "500px",
		margin: 'auto',

	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'row',
		display: 'flex',
		maxWidth: '800px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
	},
});

export const Test = props => {

	//Job Search Page
	//https://www.pexels.com/ For free stock images
	const classes = useStyles();

	const options = ["Option1", "Option2", "Option3", "Option4", "option5"];
	var i = -1;

	return (
		<div style={{ overflow: "auto" }}>

			<header>
				<h1 className={clsx(classes.header, classes.box)}>
				Let's get started
				</h1>
					<h2 className={clsx(classes.box, classes.header)}>
					Join us and begin the search for a not just a new employer 
						but for a new way of life.
				</h2>
			</header>
			<img src={FriendlyCatchUp} className={classes.image} />

			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		<div>
				<h4 style={{ display: 'flex', 'margin-left': '40%', 'text-align': 'center', top: '1000px', color: 'white' }}>
					See what we have to offer right now
				</h4>

				<div className={classes.row}>

					{options.map(options => (
						i++ ,
						<Card className={classes.card}>
							<CardContent>
								Business Here
						</CardContent>
						</Card>
					))
					}
				</div>



		</div>

		</div>
  )
}