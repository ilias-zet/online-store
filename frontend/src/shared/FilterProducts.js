import React from "react";
import styled from "styled-components";

const Container = styled.div`
position: fixed;
top: 170px;
left: 20px;
background-color: black;
width: 20%;
height: 200px;
border-radius: 10px;
`
const FilterTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 32px;
background-color: gray;
font-weight:1000;
font-family: Bradley Hand;
font-size: 16px;
color: black;
font-family: 'Inter', sans-serif;
border-radius: 10px 10px 0 0;
`


const FilterProducts = () => {
  return (
    <Container>
      <FilterTitle>Filter by price:</FilterTitle>
    </Container>
  )
}

export default FilterProducts;