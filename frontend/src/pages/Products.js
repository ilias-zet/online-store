import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../shared/ProductCard";
import Filter from "../shared/Filter";
import LoadingCard from "../shared/LoadingCard";
import { useSearchParams } from "react-router-dom";
const { getProducts } = require("../shared/utils")

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-height: 100vh;
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
  const [price, setPrice] = useState({ min:0, max:9999 });
  const { min, max } = price;
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [product, setProduct] = useState(null);
  const getData = async () => {
    const products = await getProducts(category);
    return products;
  };

  useEffect(() => {
    getData().then((products) => {
      setProduct(products);
      window.scrollTo(0, 0);
    });
  }, []);
  return (
    <Container>
      <H1>{category}</H1>
      <Filter 
        product={product}
        price={price}
        setPrice={setPrice}
        ></Filter>
      {!product ? (
        <LoadingCard></LoadingCard>
      ) : (
        <CardsContainer>
          <ProductsCounter>
            {"Found " +
              product.filter(product => product.price>min && product.price<max).length +
              (product.length > 1 ? " results:" : " result:")}
          </ProductsCounter>
          {product.filter(product => product.price>min && product.price<max).map((product) => {
            return (
              <ProductCard
                product={product}
                key={product._id}
              ></ProductCard>
            )
          })}
        </CardsContainer>
      )}
    </Container>
  );
};

export default ProductsPage;
