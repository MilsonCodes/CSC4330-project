import React from 'react';
import TextField from '@material-ui/core/TextField';
import SubmitButton from "./SubmitButton";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

export default function Textbox(props) {

	/* Determines the CSS styling */
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		margin: {
			margin: theme.spacing(1),
		},
		withoutLabel: {
			marginTop: theme.spacing(3),
		},
		textField: {
			width: 200,
		},
	}));
	//Use CSS Styling
	const classes = useStyles();

	/* Value settings of the textbox */
	const [values, setValues] = React.useState({
		showPassword: false,
	});

	/* UNUSED:  Event used if textboxes were changed */
	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	/* UNUSED: Function used to show password*/
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	/* UNUSED:  Event generated if the mouse clicks on the password field */
	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<div>
			<form className={clsx(classes.margin, classes.textField)}
				noValidate //Form data will not be validates when submitted
				autoComplete="off">
				
					{/* Username settings */}
					<TextField
					autoFocus				/* If true, the input element will be focused during the first mount */
					fullWidth				/* If true, the input will take up teh full width of its container */
					required				//Makes this textfield mandatory to fill out before submitting

					className={clsx(classes.margin, classes.textField)}
					defaultValue=""				//Adds text to fill if the textbox was not clicked on
					id="filled-size-normal"
					label="Username"			//Used only as a label.
					name="Username"				//Used only for identification
					size={props.size}			//Determines the size of the text field
					variant={props.variant}		//Adds the shading to the text field box.
				/>

				{/* Password settings */}
				<FormControl className={clsx(classes.margin, classes.textField)}>
					<TextField
						autoComplete="current-password" //Allows for an autocomplete function
						id="filled-size-normal"
						label="Password"				//Used only for identification
						name="Password"					//Only for identification
						required						//Makes this field mandatory to fill out
						size={props.size}				//Determines the size of the text field
						type= "password"				//Changes this text field type to a password, hiding the text written here
						variant={props.variant}			//Adds the shading to the text field box.
					/>
				</FormControl>

			</form>
			
			<SubmitButton
				variant="outlined"
				color="primary"
			>
			</SubmitButton>
		</div>
	);
}