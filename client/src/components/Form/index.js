import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import CheckboxApp from "./checkbox";
import Textbox from "./textbox";
import DropDown from "./dropdown";
import SubmitButton from "./SubmitButton";
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
		center: {
			textAlign: 'center',
			display: "flex",
			justifyContent: "center",

		},
	}));

	//Used for CSS styling
	const classes = useStyles();

	return (

		<div className={classes.root}>
			<Box
				display="flex"
				flexDirection="column"
				p={1}
				flexWrap = "warp"
				bgclor="background.paper">
				<Box
					p={1}
					bgcolor="grey.300"
					justifyContent="center">

					<h2
						className={classes.center}
					>
						Header
					</h2>

					<Textbox
						className={classes.center}
						variant="filled"
						size="small"
					>
					</Textbox>

					<CheckboxApp
						className={classes.center}
						label="Primary"
						row="row"
						options={[
							'Remember Me',
						]}
					>

					</CheckboxApp>

					<SubmitButton
						variant="outlined"
						color="primary"
					>
					</SubmitButton>
				</Box>

			</Box>

		</div>

		);

}