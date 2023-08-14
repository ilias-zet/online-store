import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CategoryForMainPage from "../../shared/CategoryForMainPage";
import LoadingCard from "../../shared/LoadingCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  margin-top: 80px;
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
  padding-left:10%;
`;

const CategoriesPage = ({ searchParams, setSearchParams}) => {
  const [categories, setCategories] = useState(null);
  const fetchData = async () => {
    try {
      //Get array with images for categories
      const resImgs = await axios.get("http://localhost:8000/getCategories")
      const imgsAndNameCategoriesArr = resImgs.data;
      setCategories(imgsAndNameCategoriesArr);
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
      
      {!categories ? (
        <LoadingCard></LoadingCard>
      ) : (
        <CategoriesContainer>
          {categories.map(({main_category,image,_id}) => {
            return (
              <CategoryForMainPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                name={main_category}
                image={image}
                key={_id}
              ></CategoryForMainPage>
            );
          })}
        </CategoriesContainer>
      )}
    </Container>
  );
};

export default CategoriesPage;
