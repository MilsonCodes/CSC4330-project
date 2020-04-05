import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonToolbar } from "react-bootstrap";
import styled, { css } from 'styled-components';

export default function StyledButtons(props) {

	//Unused variables
	const [isLoading, setIsLoading] = React.useState(false);


	const Button = styled.a`
  /* These settings will determine how the button with the class of "primary" will be rendered.
		What these buttons do are labelled further below.*/
  ${props => props.primary && css`
  display: ${props => props.display};
  border-radius: ${props => props.border};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
  background: ${props => props.background};
  color: ${props => props.color}; //Doesn't work
  border: ${props => props.borderSizeAndColor};

  `}
`

	return (
		<div className="Button">

			<Button

				/*
				 * The variables below are called upon by the an external webpage calling upon StyledButtons.
				 * The external webpage will input the following variables which will be redirected to the settings of the const Button's CSS style above.
				 * These settings will determine how the button using Styled-Components will be rendered
				 */

				primary											//Marks this button with the classname of "primary" which will target this button specifically for changes
				display={props.display}							//Changes block display settings
				border-radius={props.border}					//Changes border radius (Adds curves to the borders)
				padding={props.padding}							//Changes the block padding (The overall size of the block relative to the text
				margin={props.margin}							//Changes the margins of a block (The spacing of the block relative to the page
				width={props.width}								//Changes block width
				background={props.background}					//Changes block background color
				color={props.color}								//Changes block text color (Doesn't work)
				borderSizeAndColor={props.borderSizeAndColor}	//Changes block border size and color

				/* Upon clicking this button, the user will be redirected
				 * to the link given by the external webpage through the use of a prop variable
				 * */
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
