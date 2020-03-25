import React from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from 'reactstrap'

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
			width: 225,
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
		<>
			<form className={props.className ? props.className : clsx(classes.margin, classes.textField)}
				noValidate //Form data will not be validates when submitted
				autoComplete="off">
				
					{/* Username settings */}
					<TextField
					autoFocus				/* If true, the input element will be focused during the first mount */
					fullWidth				/* If true, the input will take up teh full width of its container */
					required={props.required}				//Makes this textfield mandatory to fill out before submitting

					className={!props.className ? clsx(classes.margin, classes.textField) : ""}
					defaultValue=""				//Adds text to fill if the textbox was not clicked on
					id="filled-size-normal"
					label={props.label}			//Adds text in the textbox.
					size={props.size}			//Determines the size of the text field
					type={props.type}			//If type = "password", will hide the text inside.
					variant={props.variant}		//Adds the shading to the text field box.
					onChange={props.handleChange} //Custom onChange prop.
				/>
			</form>
		</>
	);
}