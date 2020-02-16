import React from "react";
import styled from "styled-components";
import theme from "../../constants/theme";

let Background = styled.div`
  position: fixed;
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
`;

let Header = () => {
  let Span = styled.span`
    background-color: white;
  `;
  return <Span>Navigation</Span>;
};

const Layout = () => {
  return (
    <Background>
      <Header></Header>
    </Background>
  );
};

export default Layout;
