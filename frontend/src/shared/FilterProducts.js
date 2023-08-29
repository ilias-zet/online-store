import React from "react";
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

const RangeInput = styled.input`
  width: 100%;
`;

const FilterProducts = ({ price, setPrice }) => {
  const {min,max} = price;

  return (
    <Container>
      <FilterTitle>Filter by price:</FilterTitle>
      <div>
        <label for="cowbell">Min price</label>
        <RangeInput
          type="range"
          id="cowbell"
          name="cowbell"
          min="0"
          max={max - 1}
          value={min}
          onInput={(e) => setPrice((prev) => ({
            ...prev,
            max:max,
            min: e.target.value,
          }))}
        />
        {min || min===0 ? <div>{min}</div> : null}
      </div>
      <div>
        <label for="cowbell">Max price</label>
        <RangeInput
          type="range"
          id="cowbell"
          name="cowbell"
          min={min}
          value={max}
          max="9999"
          onInput={(e) => setPrice((prev) => ({
            ...prev,
            min:min,
            max: e.target.value,
          }))}
        />
        {max ? <div>{max}</div> : null}
      </div>
    </Container>
  );
};

export default FilterProducts;
