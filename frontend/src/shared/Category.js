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
  background-color: white;
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
  background-color: white;
  text-decoration: none;
  color: #120907;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const Category = ({ name, image }) => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let categoryImgFullURL = `http://localhost:8000/${image}`;
  const productFilterHandler = (e, category) => {
    e.preventDefault();
    searchParams.set("category", category);
    setSearchParams(searchParams);
    navigate(`/products?${searchParams.toString()}`);
  };
  return (
    <Container onClick={(e) => productFilterHandler(e, name)}>
      <ImgContainer>
        <CategoryImage src={categoryImgFullURL} alt=""></CategoryImage>
      </ImgContainer>
      <CategoryNameA>{name}</CategoryNameA>
    </Container>
  );
};

export default Category;
