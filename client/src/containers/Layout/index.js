import React from "react";
import styled from "styled-components";
import theme from "../../constants/theme";
import Image from "../../components/Image/index.js"
import * as logo from "../../assets/ChaseYourDreams.png";
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
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: ${theme.background.main};
  * {
    font-family: ${theme.font};
  }
`;

let Span = styled.span`
  display: flex;
  padding: 5px;
  margin: auto;
  align-items: center;
`;

let Links = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: auto;
  padding: 0.5%;
  p {
    margin-right: 10%;
    cursor: pointer;
    color: #C6C8C8;
    font-size: 1.65em;
  }
`;

// This will contain our logo and navigation to other pages
// The logo links to the home page, other links do NOT work yet
let Header = () => {
  return (
    <Span>
      <a href='/home'>
        <Image style={{ width: size, height: size - 50, filter: "invert(100%)", "margin-left": "10%" }} src={logo} />
      </a>
      <Links>
        <p>Applicants</p>
        <p>Employers</p>
        <p>Stakeholders</p>
        <p>Login</p>
      </Links>
    </Span>
  );
};

// This wraps the entire app and keeps the background and header constant
// Don't edit this component
const Layout = props => {
  return (
    <Background>
      <Header></Header>
      {props.children}
    </Background>
  );
};

export default Layout;
