import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
	};

	return (
		<FormGroup row>
			<FormLabel component = "legend"> Responsibility </FormLabel>
			<FormControlLabel
				component = "legend"
				control={
					<Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
				}
				label={props.label}
			/>
		</FormGroup>
	);
}