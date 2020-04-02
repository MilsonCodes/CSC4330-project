import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { View } from '../../../node_modules/react-native';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import OutlinedCard from "../../components/Card/container";
import BusinessLeader from "../../assets/stockimages/SkyScape.jpg";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 300,
	},

	imagewrapper: {
		display: 'inline-block',
		width: '100%',
		height: 800,

	},

	center: {
		textAlign: 'center', // <-- the magic
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 0,
		color: 'white',
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
			<FormControl>
			<img src={BusinessLeader} className={classes.imagewrapper} />
			text
			</FormControl>	
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
				className={classes.center}
				options={[
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
					'Qualifications',
				]}
		>
			</CheckboxApp>

		</div>
  )
}

export default Test