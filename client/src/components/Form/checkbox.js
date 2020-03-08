import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonToolbar } from "react-bootstrap";

// https://www.muicss.com/docs/v1/react/buttons
// List of button colors:  https://react-bootstrap.github.io/components/buttons/
// https://www.robinwieruch.de/react-hooks-fetch-data

export default function Checkbox(props) {

	const [CheckState, CheckboxChange] = React.useState(false);

	handleCheckboxChange = event => React.setState({ CheckState: event.target.CheckState })

	return (
		<div className="CheckBox">
			<label>
				<Checkbox
					checked={this.state.checked}
					onChange]{this.handleCheckboxChange}
				/>
				<span>Example</span>
			</label>
		</div>
	);
}