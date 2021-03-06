import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonToolbar } from "react-bootstrap";

// https://www.muicss.com/docs/v1/react/buttons
// List of button colors:  https://react-bootstrap.github.io/components/buttons/
// https://www.robinwieruch.de/react-hooks-fetch-data

export default function LinkButtons(props) {

	//Constants used to determine if the button is loading an object or not after being clicked upon.  
	//Is currently not used for anything as of this moment.
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<div className="Button">

			<Button
				/*Will render the following CSS script, utilizing props as an external variable 
				 * that can be inserted from a different
				 * function calling upon LinkButton */

				//Determines the size of the button
				size={props.size}

				//Determines the "variant" of the button.  Will primarily change the color of the button
				//or change the button into a link based on what was specified.  A list of the button variants can be seen by the react-buttonstrap link above.
				variant={props.variant}

				//Determines the dimensions of the button in terms of width and height.
				style={{
					maxWidth: props.width,
					maxHeight: props.height,
					minWidth: props.width,
					minHeight: props.height,
				}}
				/*Overides the button click functionality so that when the button is clicked on, 
				 * the user will be redirected to another web page*/
				href={props.href}
			>
				{/*
				 * Will render any text, if given, by an external prop variable.  This text will be seen inside the button itself.
				 * */}
				{props.text}
      </Button>
		</div>
	);
}