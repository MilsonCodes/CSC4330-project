import React, { useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonToolbar } from "react-bootstrap";
import styled, { css } from 'styled-components';

// https://www.muicss.com/docs/v1/react/buttons
// List of button colors:  https://react-bootstrap.github.io/components/buttons/
// https://www.robinwieruch.de/react-hooks-fetch-data

export default function StyledButtons(props) {
	const [isLoading, setIsLoading] = React.useState(false);

	const Button = styled.a`
  /* This renders the buttons above... Edit me! */
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
				primary
				display={props.display}							//Changes block display settings
				border-radius={props.border}					//Changes border radius (Adds curves to the borders)
				padding={props.padding}							//Changes the block padding (The overall size of the block relative to the text
				margin={props.margin}							//Changes the margins of a block (The spacing of the block relative to the page
				width={props.width}								//Changes block width
				background={props.background}					//Changes block background color
				color={props.color}								//Changes block text color (Doesn't work)
				borderSizeAndColor={props.borderSizeAndColor}	//Changes block border size and color

				onClick={(e): void => {
					e.preventDefault();
					//To trigger a website load
					window.location.href = props.Link;
				}}
			>
				{props.text}
				</Button>
		</div>
	);
}
