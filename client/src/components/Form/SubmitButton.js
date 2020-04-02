import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { green, purple } from '@material-ui/core/colors';

// https://www.muicss.com/docs/v1/react/buttons
// List of button colors:  https://react-bootstrap.github.io/components/buttons/
// https://www.robinwieruch.de/react-hooks-fetch-data

export default function SubmitButton(props) {

	/* Determines the CSS used to help design the button */
	const useStyles = makeStyles(theme => ({
		root: {
			color: theme.palette.getContrastText(purple[500]),
			width: props.width,
			'text-align': 'center',

			backgroundColor: '#e53935',
			'&:hover': {
				backgroundColor: purple[700],
			},
		},
	}));

	const classes = useStyles();

	//Constants used to determine if the button is loading an object or not after being clicked upon.  
	//Is currently not used for anything as of this moment.
	const [isLoading, setIsLoading] = React.useState(false);


	return (
		<div className={classes.root}>

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
					minHeight: props.height
				}}

				input type="submit"


				onClick={props.handleClick}
			>
				{/*
				 * Will render any text, if given, by an external prop variable.  This text will be seen inside the button itself.
				 * */}
				{"Submit"}
      </Button>
		</div>
	);
}