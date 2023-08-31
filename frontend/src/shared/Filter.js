import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 170px;
  left: 20px;
  border: 2px solid black;
  width: 20%;
  height: 300px;
  border-radius: 10px;
`;
const FilterTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  background-color: gray;
  font-weight: 1000;
  font-family: Bradley Hand;
  font-size: 16px;
  color: black;
  font-family: "Inter", sans-serif;
  border-radius: 10px 10px 0 0;
`;

const InputContainer = styled.div`
margin: 10px;
`

const Input = styled.input`
  width: 100%;
`;

const SubmitPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 50%;
  height: 40px;
  color: white;
  ${({ minValue, maxValue }) =>
    maxValue > minValue
      ? `
  cursor: pointer;
  background-color: black;
  `
      : `
  background-color: gray;
  `};
`;

const Filter = ({ setPrice }) => {
  const [inputsValue, setInputsValue] = useState({
    minValue: 0,
    maxValue: 9999,
  });
  const { minValue, maxValue } = inputsValue;
  return (
    <Container>
      <FilterTitle>Filter by price:</FilterTitle>
      <InputContainer>
        <label>Min price</label>
        <Input
          type="number"
          min="0"
          value={minValue}
          onInput={(e) =>
            setInputsValue((prev) => ({
              ...prev,
              maxValue: maxValue,
              minValue: e.target.value,
            }))
          }
        />
        {minValue || minValue === 0 ? <div>{minValue}</div> : null}
      </InputContainer>
      <InputContainer>
        <label>Max price</label>
        <Input
          min={minValue}
          type="number"
          value={maxValue}
          onInput={(e) =>
            setInputsValue((prev) => ({
              ...prev,
              minValue: minValue,
              maxValue: e.target.value,
            }))
          }
        />
        {maxValue || maxValue === 0 ? <div>{maxValue}</div> : null}
      </InputContainer>
      <SubmitPrice
        minValue={minValue}
        maxValue={maxValue}
        onClick={() => {
          if (maxValue > minValue) {
            setPrice((prev) => ({
              ...prev,
              max: maxValue,
              min: minValue,
            }));
          }
        }}
      >
        Change
      </SubmitPrice>
    </Container>
  );
};

export default Filter;
