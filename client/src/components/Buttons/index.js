import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonToolbar } from "react-bootstrap";

// https://www.muicss.com/docs/v1/react/buttons
// List of button colors:  https://react-bootstrap.github.io/components/buttons/
// https://www.robinwieruch.de/react-hooks-fetch-data

export default function LinkButtons(props) {
	const [isLoading, setIsLoading] = React.useState(false);

	//Scrapped API functionality.  Leaving it in here in the event that this could be salvaged.

	/*
	React.useEffect(
	  SomeAPI => {
		if (isLoading) {
		  //Trigger a browser event upon a button click with the isLoading trigger
		  fetch(SomeAPI) //If you want the button to be used to fetch an API
			.then(response => response.json())
			.then(success => {
			  setIsLoading(false); //Set the button status to not loading
			})
			.catch(e => {
			  setIsLoading(false); //Set button status to show not loading
			});
		}
	  },
	  [isLoading]
	);
  */
	return (
		<div className="Button">
			<Button
				//List of possible button customizable settings
				href="#"
				variant="primary"
				type="button"
				value="Input"
				size="lg"
			>
				Default look
      </Button>
			<span class="tab" ></span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button
				size="lg"
				variant="danger"
				style={{
					maxWidth: "300px",
					maxHeight: "200px",
					minWidth: "300px",
					minHeight: "200px"
				}}
			>
				Size demonstration
      </Button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button
				variant="Link"
				onClick={(e): void => {
					e.preventDefault();

					//If using button for API fetching.  Otherwise, comment out
					//Scrapped API functions.

					//disabled = { isLoading };
					//onclick = !isLoading ? APIGET : null;
					//useFetch("SomeAPI.com", isLoading); //If the button is Loading something, then the next click won't do anything.  Otheruse, it will be used to fetch an API.

					//To trigger a website load
					window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
				}}
			>
				Link
      </Button>
		</div>
	);
}
