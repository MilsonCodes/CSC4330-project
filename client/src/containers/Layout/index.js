import React from "react";
import styled from "styled-components";
import theme from "../../constants/theme";
import { GiDreamCatcher } from "react-icons/gi";

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
  background-color: ${theme.background};
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
    margin-left: 10%;
    cursor: pointer;
  }
`;

// This will contain our logo (which will navigate to the home page) and navigation to other pages
let Header = () => {
  return (
    <Span>
      <GiDreamCatcher size={64}></GiDreamCatcher>
      <Links>
        <p>Navigation Stuff Here!</p>
        <p>Home</p>
        <p>About</p>
        <p>Apply</p>
        <p>Login</p>
      </Links>
    </Span>
  );
};

// This wraps the entire app and keeps the background and header constant
const Layout = props => {
  return (
    <Background>
      <Header></Header>
      {props.children}
    </Background>
  );
};

export default Layout;
