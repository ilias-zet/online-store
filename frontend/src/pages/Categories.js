import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../shared/Category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
const { getCategories } = require("../shared/utils");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  margin-top: 80px;
  padding: 40px;
`;

const Back = styled.span`
cursor: pointer;
margin: 10px;
width: 100%;
text-decoration: underline;
color: gray;
`


const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  max-width: 100%;
`;

const H1 = styled.h1`
  width: 100%;
  padding-left: 10%;
`;

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    const categories = await getCategories();
    return categories;
  };

  useEffect(() => {
    getData().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Container>
      <Back onClick={() => navigate("/")}>{`<- Back to "Home"`}</Back>
      <H1>All categories</H1>
      {categories?.length === 0 ? (
        <Skeleton
          style={{ margin: "20px" }}
          count={30}
          width={250}
          height={350}
          borderRadius={10}
          inline={true}
        ></Skeleton>
      ) : (
        <CategoriesContainer>
          {categories.map(({ main_category, image, _id }) => {
            return (
              <Category name={main_category} image={image} key={_id}></Category>
            );
          })}
        </CategoriesContainer>
      )}
    </Container>
  );
};

export default CategoriesPage;
