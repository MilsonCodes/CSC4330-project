import React from "react";
import styled from "styled-components";
import theme from "../../constants/theme";
import * as logo from "../../assets/ChaseYourDreams.png";
import LinkButtons  from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";

const size = "200px";

let Background = styled.div`
  position: fixed;
  ${"" /* may need to change to absolute */}
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  background-color: ${theme.background.main};
  * {
    font-family: ${theme.font};

import logo from "../../assets/ChaseYourDreams.png";
import { AppBar, Toolbar, Button, makeStyles, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  background: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    backgroundColor: theme.palette.primary.main

  }
}));

// This will contain our logo and navigation to other pages
// The logo links to the home page, other links do NOT work yet
let Header = () => {
  return (

    <AppBar
      position="static"  
    >
      <Toolbar>
        <a href="/home">
          <img src={logo} style={{ width: "80%", filter: "invert(100%)" }} />
        </a>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

// This wraps the entire app and keeps the background and header constant
const Layout = props => {
  const classes = useStyles()

  return (
  <>
    <Background>
		  <Header></Header>
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
			  defaultValue="Menu"
			  options={[
				  'Never gonna give you up',
				  'Never gonna let you down',
				  'Never gonna take a stand',
				  'And Hurt you',
			  ]}
		  >
		  </DropDown>

		  <SubmitForm>
		  </SubmitForm>


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
		  <br/>
      {props.children}
	  </Background>
    <div className={classes.background}>
      <Header></Header>
      {props.children}
    </div>
  </>
  );
};

export default Layout;
