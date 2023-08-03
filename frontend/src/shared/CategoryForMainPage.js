import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";


const Category = styled.div`
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
  color: #0a0a0a;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const CategoryForMainPage = ({
  searchParams,
  setSearchParams,
  categoryNameStrForHandler,
  categoryNameForHeader,
  categoryImage,
}) => {
  const navigate = useNavigate();
  let categoryImgFullURL = `http://localhost:8000/${categoryImage}`;

  const productFilterHandler = (e, category) => {
    e.preventDefault();
    searchParams.set("category", category);
    setSearchParams(searchParams);
    navigate(`/products?${searchParams.toString()}`);
  };
  return (
    <Category
      onClick={(e) => productFilterHandler(e, categoryNameStrForHandler)}
    >
      <ImgContainer>
        <CategoryImage src={categoryImgFullURL} alt=""></CategoryImage>
      </ImgContainer>
      <CategoryNameA>{categoryNameForHeader}</CategoryNameA>
    </Category>
  );
};

export default CategoryForMainPage;
