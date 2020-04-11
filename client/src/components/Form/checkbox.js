import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

//http://react.tips/checkboxes-in-react/
//https://menubar.io/reactjs-checkboxes
//https://material-ui.com/components/checkboxes/

/* CSS Styling */
/*
const GreenCheckbox = withStyles({
	root: {
		'flex-direction': 'column',
		'flex-wrap': 'nowrap',
		'flexItems': 1,
		'align-content': 'flex-start',
		display: 'flex',
		width: 200,
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})(props => <Checkbox color="default" {...props} />);
*/
const useStyles = makeStyles(theme => ({

	root: {
		//Changes text color
		//color: theme.palette.getContrastText(purple[500]),

		/* Does not function */
		
		//backgroundColor: '#e53935',
		'&:hover': {
			//backgroundColor: purple[700],
		},
	},
}));

export default function CheckboxApp(props) {

	const classes = useStyles();

	/* True/False states used to indicate if the checkbox is checked or not */
	const [state, setState] = React.useState({
		checked: true,
	});

	//Copies the prop array into an array variable.
	//This is to make mapping out the checkboxes easier
	const options = props.options;

	/* Will switch state of a targeted value.
	 * In this scenario, will swithc between a checked state and an
	 * unchecked state */
	const handleChange = (name) => event => {
		if (props.onChange) props.onChange(event)
		setState({ ...state, [name]: event.target.checked });
	};

	//Variables used to create a dynamic array of checkboxes based on how many were given.
	var i = -1;
	var checkedState = {};

	return (
		/* Will constantly iterate itself in a loop for each value in an array found.
		 * For each array value, will create a checkbox and a unique checkbox state for that
		 * particular value*/
		<div style={{ flexDirection: props.flexDirection, display: 'flex'}}>
		{
			options.map(options => (
			i++ ,
			eval('checkedState[' + i + '] = false;'),

			//HTML work for the checkbox creation.
			<FormControlLabel className={classes.root}
				//ID for identification
				id={i}
				//Identification for fieldset type
				component="legend"
				control={
					<Checkbox
						//On click, changes the checkbox state
						onChange={handleChange(checkedState[i])}
						value="checkedA"
					/>
				}
				//Checkbox text value
				label={options}
			/>
				))}
			</div>
	);
}