import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoadingTheme from "../../shared/LoadingTheme";
import CategoryForMainPage from "../../shared/CategoryForMainPage";

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
  const fetchData = async () => {
    try {
      const res = await axios.get("/getAllCategories");
      const data = await res.data;
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
      {/* <LoadingTheme></LoadingTheme> */}
      {!categories ? (
        <LoadingTheme></LoadingTheme>
      ) : (
        <CategoriesContainer>
          {categories.map((elem) => {
            return (
              <CategoryForMainPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                categoryNameForHeader={elem}
                categoryNameStrForHandler={elem}
                key={elem}
              ></CategoryForMainPage>
            );
          })}
        </CategoriesContainer>
      )}
    </Container>
  );
};

export default PageWithCategories;
