import React, { Component } from "react";
import styled from "@emotion/styled";

const ResultsWrapper = styled.div`
  margin: 2px;
  padding: 15px;
  background-color: yellow;
  font-size: 16px;
  justify-items: center;
  display: grid;
  align-content: center;
`;

export default function Results(props) {
  return (
    <ResultsWrapper>
      RESULTS COMPONENT
      <p>You are fighting against {props.pokemon}</p>
    </ResultsWrapper>
  );
}
