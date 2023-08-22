import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductCard from "../shared/ProductCard";
import FilterProducts from "../shared/FilterProducts";
import LoadingCard from "../shared/LoadingCard";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-height: 100vh;
  background-color: white;
  margin-top: 80px;
  padding-left: 220px;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-family: "Inter", sans-serif;
`;

const ProductsCounter = styled.span`
  width: 100%;
  display: flex;
  color: gray;
`;

const ProductsPage = () => {
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [product, setProduct] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getProducts", {
        params: { category },
      });
      const {data} = res;
      setProduct(data);
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
      {!product ? (
        <LoadingCard></LoadingCard>
      ) : (
        <CardsContainer>
          <ProductsCounter>
            {"Found " +
              product.length +
              (product.length > 1 ? " results:" : " result:")}
          </ProductsCounter>
          {product.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product._id}
              ></ProductCard>
            );
          })}
        </CardsContainer>
      )}
    </Container>
  );
};

export default ProductsPage;
