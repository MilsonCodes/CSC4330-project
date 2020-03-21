import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//http://react.tips/checkboxes-in-react/
//https://menubar.io/reactjs-checkboxes
//https://material-ui.com/components/checkboxes/

/* CSS Styling */
const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})(props => <Checkbox color="default" {...props} />);


export default function CheckboxApp(props) {

	/* True/False states used to indicate if the checkbox is checked or not */
	const [state, setState] = React.useState({
		checked: true,
	});

	const options = ["test1", "test2", "test3"];

	/* Will switch state of a targeted value.
	 * In this scenario, will swithc between a checked state and an
	 * unchecked state */
	const handleChange = (name) => event => {
		setState({ ...state, [name]: event.target.checked });
	};

	//Variables used to create a dynamic array of checkboxes based on how many were given.
	var i = -1;
	var checkedState = {};

	return (
		/* Will constantly iterate itself in a loop for each value in an array found.
		 * For each array value, will create a checkbox and a unique checkbox state for that
		 * particular value*/
		options.map(options => (
			i++ ,
			eval('checkedState[' + i + '] = false;'),

				<FormControlLabel
				id={i}
				component = "legend"
				control={
					<Checkbox
						checked={state.checkedA}
						onChange={handleChange(checkedState[i], i)}
						value="checkedA"
					/>
				}
				label={options}
			/>
			))
	);
}