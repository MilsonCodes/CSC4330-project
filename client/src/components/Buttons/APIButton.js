// Let's import React, our styles and React Async
import React, { Component } from "react";
import "./styles.css";
import Async from "../../../node_modules/async";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonToolbar } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


//https://www.youtube.com/watch?v=Mo2_UPkZjJU

/*Unusable at the moment because there is no API link to be used.  Unfortunately for APIs, this button requires to be customized for every specific API link used.*/

class APIButton extends Component {
	constructor(props) {
		super(props);
		this.state = { show: false }; //State used to determine whether or not to use the API Fetch

		this.ToggleReveal = this.ToggleReveal.bind(this);
	}

	ToggleReveal = () => {
		const { show } = this.state;
		this.setState({ show: !show }); //Toggle between showing information or not showing information
	};

	render() {
		return (
			<div className="App">
				<h2>React Button Test</h2>
				<div className="ButtonTest">
					<Button variant="primary" onClick={this.toggleDiv}>
						Toggle div
          </Button>
					{this.state.show && <Reveal />}
				</div>
			</div>
		);
	}
}

const loadAPI = () =>
	fetch(props.APILINK)
		.then(res => (res.ok ? res : Promise.reject(res)))
		.then(res => res.json());

class Reveal extends Component {
	render() {
		return (
			<div className="container">
				<Async promiseFn={loadAPI}>
					<Async.Loading>Loading...</Async.Loading>
					<Async.Fulfilled>
						{data => {
							return (
								<div>
									<div>
										<h2>React Async Button</h2>
									</div>
									{data.map(APICLASS => (
										<div key={Class.APIINFO} className="row">
											<div className="col-md-12">
												<p>{APISHOWN}</p>
												<p>{APISHOWN}</p>
											</div>
										</div>
									))}
								</div>
							);
						}}
					</Async.Fulfilled>
					<Async.Rejected>
						{error => `Something went wrong: ${error.message}`}
					</Async.Rejected>
				</Async>
			</div>
		);
	}
}

export default APIButton;