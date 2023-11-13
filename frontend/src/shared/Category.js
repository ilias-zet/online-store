import styled from "styled-components";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 220px;
  height: 250px;
  margin: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 10px;
`;

const CategoryImage = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const CategoryNameA = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 200px;
  text-decoration: none;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const Category = ({ name, image }) => {
  const navigate = useNavigate();
  const imgURL = `http://localhost:8000/${image}`;
  let [searchParams] = useSearchParams();
  const productFilterHandler = (e, name) => {
    e.preventDefault();
    searchParams.set("category",name)
    navigate(`/products?${searchParams.toString()}`);
  };
  return (
    <Container onClick={(e) => productFilterHandler(e, name)}>
      <ImgContainer>
        <CategoryImage src={imgURL} alt="" />
      </ImgContainer>
      <CategoryNameA>{name}</CategoryNameA>
    </Container>
  );
};

export default Category;
