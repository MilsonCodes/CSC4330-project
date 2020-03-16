import React from 'react';
import TextField from '@material-ui/core/TextField';
import SubmitButton from "./SubmitButton";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

export default function Textbox(props) {

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

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<div>
			<form className={classes.root}
				noValidate
				autoComplete="off">
			<div>
					<TextField
					required
					fullWidth /* If true, the input will take up teh full width of its container */
					autoFocus /* If true, the input element will be focused during the first mount */

					className={clsx(classes.margin, classes.textField)}
					name="Username"
					label="Username"
					id="filled-size-normal"
					defaultValue=""
					variant="filled"
					size="small"

				/>
			</div>


			{/* Password settings */}
			<FormControl className={clsx(classes.margin, classes.textField)}>
				<TextField
					variant="filled"
					required
					name = "Password"
					size = "small"
					label="Password"
					type="password"
					id="filled-size-normal"
					autoComplete="current-password"
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