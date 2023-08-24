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
  height: 200px;
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


const RangeContainer = styled.div``;

const Label = styled.label``;

const RangeInput = styled.input`
width: 100%;
`;

const FilterProducts = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  return (
    <Container>
      <FilterTitle>Filter by price:</FilterTitle>
      <RangeContainer>
        <Label for="cowbell">Min price</Label>
        <RangeInput
          type="range"
          id="cowbell"
          name="cowbell"
          min="0"
          max={maxPrice}
          onInput={(e) => setMinPrice(e.target.value)}
        />
        {minPrice ? <div>{minPrice}</div> : null}
      </RangeContainer>
      <RangeContainer>
        <Label for="cowbell">Max price</Label>
        <RangeInput
          type="range"
          id="cowbell"
          name="cowbell"
          min={minPrice}
          max="9999"
          onInput={(e) => setMaxPrice(e.target.value)}
        />
        {maxPrice ? <div>{maxPrice}</div> : null}
      </RangeContainer>
    </Container>
  );
};

export default FilterProducts;
