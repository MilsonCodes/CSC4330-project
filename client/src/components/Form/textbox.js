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

	const classes = useStyles();

	/* Value settings of the textbox */
	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	/* Function used to show password if implemented */
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<div>
			<form className={classes.root}
				noValidate //Form data will not be validates when submitted
				autoComplete="off">

				<div>
					{/* Username settings */}
					<TextField
					autoFocus				/* If true, the input element will be focused during the first mount */
					fullWidth				/* If true, the input will take up teh full width of its container */
					required				//Makes this textfield mandatory to fill out before submitting

					className={clsx(classes.margin, classes.textField)}
					defaultValue=""			//Adds text to fill if the textbox was not clicked on
					id="filled-size-normal" 
					label="Username"		//Used only as a label.
					name="Username"			//Used only for identification
					size="small"			//Determines the size of the text field
					variant="filled"		//Adds the shading to the text field box.

				/>
			</div>


			{/* Password settings */}
			<FormControl className={clsx(classes.margin, classes.textField)}>
				<TextField
					autoComplete="current-password" //Allows for an autocomplete function
					id="filled-size-normal"
					label="Password"				//Used only for identification
					name = "Password"				//Only for identification
					required						//Makes this field mandatory to fill out
					size = "small"					//Determines the size of the text field
					type="password"					//Changes this text field type to a password, hiding the text written here
					variant="filled"				//Adds the shading to the text field box.
				/>
			</FormControl>

			<br />
			<br />


		</form>
			
			<SubmitButton
				variant="outlined"
				color="primary"
			>
			</SubmitButton>
		</div>
	);
}