import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//To Do:  Look into creating dynamic checkboxes to dynamically create checkboxes through props.
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

	const [state, setState] = React.useState({
		checkedA: true,
	});

	const options = ["test1", "test2", "test3"];

	var mapping = [];

	const handleChange = name => event => {
		alert(mapping);
		setState({ ...state, [name]: event.target.checked });
	};

	var i = 0;

	return (
		options.map(options => (
			mapping.push(false),
			<FormGroup row>
				{/* Header */}
				<FormLabel component="legend"> Responsibility </FormLabel>

				<FormControlLabel
				id={i}
				component = "legend"
				control={
					<Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
				}
				label={options}
			/>
			</FormGroup>
			))
	);
}