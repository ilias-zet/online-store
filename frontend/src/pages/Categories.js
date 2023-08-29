import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Category from "../shared/Category";
import LoadingCard from "../shared/LoadingCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  margin-top: 80px;
  padding: 40px;
`;

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
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/getCategories"
      );
      setCategories(data);
    } catch (e) {
      console.log("Error PageWithCategories: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <H1>All categories</H1>
 
      {categories.lenght===0 ? (
        <LoadingCard></LoadingCard>
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
