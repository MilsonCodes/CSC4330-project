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
			//CSS Styling for the box containing the login
			padding: '50px',
			margin: theme.spacing(2),
			flexWrap: 'wrap',
			width: "400px",
		},
		margin: {
			//Adds spacing to the component if added
			margin: theme.spacing(1),
		},
		center: {
			//Aligns the header to the center of the box
			textAlign: 'center',
			display: "flex",
			justifyContent: "center",

		},
	}));

	//Used for CSS styling
	const classes = useStyles();

	return (

		<div className={classes.root}>
			{/* Creates a box containing the login form. */}
			<Box
				display="flex"					//Allows for flexible alignment
				flexDirection="column"			//Aligns the components into a column
				p={1}							//Determines spacing
				flexWrap = "warp"				//If there is an overflow, the next element will be placed in the next row
				bgclor="background.paper"		//Background color
			>		

				<Box
					p={1}						//Spacing
					bgcolor="grey.300"			//Background color
					justifyContent="center"		//Aligns to the center
				>
					

					<h2
						className={classes.center}
						//Use the CSS styling to align to the center
					>
						Header
					</h2>

					<Textbox
						className={classes.center}			//Use the CSS styling to align to the center
						variant="filled"					//Adds shading to the textbox
						size="small"
						label="Username"
						required
					>
					</Textbox>
					<Textbox
						className={classes.center}		//Use the CSS styling to align to the center
						variant="filled"				//Adds shading to the textbox
						size="small"
						label="Password"
						type="Password"
						required
					>
					</Textbox>

					<CheckboxApp
						className={classes.center}
						//Use the CSS styling to align to the center

						label="Primary"
						row="row"
						options={[
							'Remember Me',
						]}
					>

					</CheckboxApp>

					<SubmitButton
						variant="outlined"		//Determines what type of button to use
						color="primary"			//What color of the button to use
					>
					</SubmitButton>
				</Box>

			</Box>

		</div>

		);

}