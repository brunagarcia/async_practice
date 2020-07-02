import React, { useState } from "react";
import styled from "@emotion/styled";

const FormWrapper = styled.div`
  margin: 2px;
  padding: 15px;
  background-color: yellow;
  justify-content: center;
  font-size: 16px;
  display: grid;
  align-content: center;
`;

export default function Form(props) {
  const [pokemon, setPokemon] = useState("");

  const handleSubmit = (e) => {
    props.getPokemon(pokemon);
    e.preventDefault();
  };

  const handleInput = (e) => {
    setPokemon(e.target.value);
  };

  return (
    <FormWrapper>
      FORM COMPONENT
      <form action='' method='get' onSubmit={handleSubmit}>
        <label>Pokemon you are going to battle against:</label>
        <input type='text' onChange={handleInput} />
        <button type='submit'>Get Pokemon</button>
      </form>
    </FormWrapper>
  );
}
