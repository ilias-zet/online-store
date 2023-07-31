import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import LoadingTheme from "../shared/LoadingTheme";
import ProductCard from "../shared/ProductCard";
import FilterProducts from "../shared/FilterProducts";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: white;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 25%;
  min-height: 100%;
`;

const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  font-family: "Inter", sans-serif;
`;

const ProductsCounter = styled.span`
  width: 90%;
  display: flex;
  color: gray;
`;

//Компонент рендера разных страниц категории
const MainCagetoryPage = ({ searchParams }) => {
  const category = searchParams.get("category");
  const [responsedProduct, setresponsedProduct] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios.get("/getProductsByCategory", {
        params: { category },
      });
      const resProductData = await res.data;
      setresponsedProduct(resProductData);
    } catch (e) {
      console.log("Error on MainCagegoryPage:  ", e);
    }
  };
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <H1>{category}</H1>
      <FilterProducts></FilterProducts>
      {/* <SubCategoriesContainer>
          <SubCategoriesList1></SubCategoriesList1>
          <SubCategoriesList2></SubCategoriesList2>
        </SubCategoriesContainer> */}

      {/* <LoadingTheme /> */}
      {!responsedProduct ? (
        <LoadingTheme />
      ) : (
        <CardsContainer>
          <ProductsCounter>
            {"Finded " +
              responsedProduct.length +
              (responsedProduct.length > 1 ? " results:" : " result:")}
          </ProductsCounter>
          {responsedProduct.map((product) => {
            return (
              <ProductCard
                product={product}
                category={category}
              ></ProductCard>
            );
          })}
        </CardsContainer>
      )}
    </Container>
  );
};

export default MainCagetoryPage;
