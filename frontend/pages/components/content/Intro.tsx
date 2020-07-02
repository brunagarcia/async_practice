import React, { Component } from "react";
import styled from "@emotion/styled";

const IntroWrapper = styled.div`
  margin: 2px;
  padding: 15px;
  background-color: powderblue;
  justify-content: center;
  font-size: 16px;
  justify-items: center;
  display: grid;
  align-content: center;
`;

export default class Intro extends Component {
  render() {
    return <IntroWrapper>INTRO COMPONENT</IntroWrapper>;
  }
}
