import React, { Component, useState } from "react";
import Form from "./Form";
import Intro from "./Intro";
import Results from "./Results";
import styled from "@emotion/styled";

const ContentWrapper = styled.div`
  padding: 10px;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px;
`;

//Pass this Pokemon  value to search on API.
// function getPokemon(pokemon) {
//   console.log(`${pokemon} from Content Component`);
// }

export default function Content() {
  const [pokemon, setPokemon] = useState("");

  const getPokemon = (pokemon) => {
    console.log(`${pokemon} from Content Component`);
    setPokemon(pokemon);
  };

  return (
    <>
      <h2>CONTENT COMPONENT</h2>
      <ContentWrapper>
        {pokemon ? <Results pokemon={pokemon} /> : <Intro />}
        <Form getPokemon={getPokemon} />
      </ContentWrapper>
    </>
  );
}
