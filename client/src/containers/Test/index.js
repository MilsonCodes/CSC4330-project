import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import OutlinedCard from "../../components/Card/container";


const Test = props => {
	return (
		<div
			style={{ overflow: "auto" }}
		>
      <LinkButtons
			  height={100}
			  width={100}
			  Link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			  variant="danger"
			  size="lg"
			  text="Link Button">
		  </LinkButtons>

		  <br />
		  <br />
		  
		  <LinkButtons
			height={50}
			width={50}
			Link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			variant="success"
			size="sm"
			text="Small Button">
		   </LinkButtons>

			<br />
			<br />

		  <DropDown
				color=""				//Might changes this to affect styling later
				contentEditable="false"
				controls="long-menu"
				defaultValue="Menu"
				haspopup="true"
				label="more"
				variant="contained"
			  options={[
				  'Never gonna give you up',
				  'Never gonna let you down',
				  'Never gonna take a stand',
				  'And Hurt you',
			  ]}
		  >
		  </DropDown>

		<OutlinedCard>
		</OutlinedCard>


		  <StyledButtons
			  display='inline-block'						//Changes block display setting
			  border='3px'									//Works
			  padding='1rem '								//works
			  margin='0rem'									//Works
			  background = 'cornflowerblue'					//Works
		      color = 'red'									//Does not work for some reason
			  borderSizeAndColor='2px solid red'			//Works
			  Link="https://www.youtube.com/watch?v=IEGo41443iI"
			  text = "Style Button"
		  >
		  </StyledButtons>
    </div>
  )
}

export default Test