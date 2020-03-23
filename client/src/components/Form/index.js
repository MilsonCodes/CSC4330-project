import React from "react";
import styled from "styled-components";
import CheckboxApp from "./checkbox";
import Textbox from "./textbox";
import DropDown from "./dropdown";
import { makeStyles } from '@material-ui/core/styles';

export default function SubmitForm(){

	/* Used to determine the CSS of the menu */
	const useStyles = makeStyles(theme => ({
		root: {
			padding: '50px',
			margin: theme.spacing(2),
			border: "2px solid black",
			flexWrap: 'wrap',
			width: "400px",
		},
		margin: {
			margin: theme.spacing(1),
		},
	}));

	//Used for CSS styling
	const classes = useStyles();

	return (

		<div className={classes.root}>

			<Textbox
				variant="filled"
				size="small"
			>
			</Textbox>

			<CheckboxApp
				label="Primary"
				row="row"
				options={[
					'Remember Me',
				]}
			>

			</CheckboxApp>

		</div>

		);

}