import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoadingTheme from "../../shared/LoadingTheme";
import CategoryForMainPage from "../../shared/CategoryForMainPage";
import LoadingCard from "../../shared/LoadingCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  min-height: 100%;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const H1 = styled.h1`
  width: 90%;
`;

const PageWithCategories = ({ searchParams, setSearchParams }) => {
  const [categories, setCategories] = useState(null);
  let counterForLoadingCards = 0;
  const fetchData = async () => {
    try {
      //Get array with all categories
      const res = await axios.get("http://localhost:8000/getAllCategories");
      const data = await res.data;

      //Get array with images for categories
      const resImgs = await axios.get("http://localhost:8000/getImages")
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
      
      {/* <LoadingTheme></LoadingTheme> */}
      {!categories ? (
        // <LoadingTheme></LoadingTheme>
        <LoadingCard></LoadingCard>
      ) : (
        <CategoriesContainer>
          {categories.map((elem) => {
            return (
              <CategoryForMainPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                categoryNameForHeader={elem.main_category}
                categoryNameStrForHandler={elem.main_category}
                categoryImage={elem.image}
                key={elem._id}
              ></CategoryForMainPage>
            );
          })}
        </CategoriesContainer>
      )}
    </Container>
  );
};

export default PageWithCategories;
