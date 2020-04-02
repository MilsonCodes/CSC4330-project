import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import OutlinedCard from "../../components/Card/container";
import BusinessLeader from "../../assets/stockimages/SkyScapeCrop.png";

//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 300,
	},

	imagewrapper: {
		display: 'block',
		width: '100%',
		height: 'auto',
		//position: "absolute",
		margin: 'auto',

		/* Add the blur effect */
		//filter: 'blur(8px)',

	},

	imagetext: {

		//Manually aligns to the center
		'margin-left': '40%',
		'margin-right': '50%',

		//Allows the text to be positioned in front of the page anywhere, meaning it can be placed on top of other elements
		position: 'absolute',
		'text-align': 'center',
		left: 0,

		//Dimensions of the textbox
		width: '20%',
		height: '5%',

		//Slightly dark background
		background: 'rgba(0,0,0,0.5)',
		//Blurs the background of the textbox
		'backdrop-filter': 'blur(4px)',
	},

	imagebox: {

		position: 'absolute',
		display: 'inline-block',
		'font-size': '20px', /*or whatever you want*/
		color: '#FFF',

		//color: 'white',
		//background: rgb(0, 0, 0), /* fallback color */
		//background: rgba(0, 0, 0, 0.4),

	},

	center: {

		textAlign: 'center', // <-- the magic
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 0,
		color: 'white',
	},

	checkbox: {

		left: 5,

	},

	button: {
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: '#e53935',
		'&:hover': {
			backgroundColor: purple[700],
		},
	},

	row: {
		display: 'flex',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
	},
	

});

const options = ["Job Titles", "Salary Range", "Location", "Search"];

const Test = props => {

	const classes = useStyles();

	return (
		<div
			style={{ overflow: "auto" }}
		>
			<div >
				<img src={BusinessLeader} className={classes.imagewrapper} />
				<h2 className={classes.imagetext} style={{top: '300px'}} ><span>Employer Page</span></h2>
				<br />
				<br />
				<h2 className={classes.imagetext} style={{top: '400px' }} ><span>SubText</span></h2>
			</div>

			<h1 className={classes.center}
			>
				Employer Page
			</h1>

			<br />
			<br />

			<h2 className={classes.center}>
				You are one step closer to finding someone to help build your dream
			</h2>
			
			<FormControl className={classes.row}>

			{options.map(options => (
			<Button
					variant="outlined"
					color="primary"
					className={clsx(classes.button, classes.row)}
			>
						{options}
			</Button>

				))
				}

			</FormControl>

			<br />

			<h1 className={classes.center}>
			Preferences
			</h1>
			<CheckboxApp
				label="Primary"
				row="row"
				className={classes.row}
				style={{
					'vertical-align': 'middle',
					width: '300px',
					float: 'right',
					'align': 'center',
				}}
				options={[
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
				]}
			>
				</CheckboxApp>

			<SubmitButton
				className={classes.center}
				width="75px"
				variant= "outlined"
				size="sm"
			>
			</SubmitButton>


		</div>
  )
}

export default Test