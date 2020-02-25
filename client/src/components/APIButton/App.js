// Let's import React, our styles and React Async
import React, { Component } from "react";
import "./styles.css";
import Async from "react-async";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonToolbar } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

//https://www.youtube.com/watch?v=Mo2_UPkZjJU

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false }; //State used to determine whether or not to use the API Fetch

    this.toggleDiv = this.toggleDiv.bind(this);
  }

  toggleDiv = () => {
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
          {this.state.show && <Box />}
        </div>
      </div>
    );
  }
}

loadAPI = () =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());

class Box extends Component {
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
                    <h2>React Async - Random Users</h2>
                  </div>
                  {data.map(user => (
                    <div key={user.username} className="row">
                      <div className="col-md-12">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
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

export default App;
