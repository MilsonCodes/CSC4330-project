import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SubmitButton from "./SubmitButton";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

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