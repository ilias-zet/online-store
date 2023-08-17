import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import LoadingCard from "../shared/LoadingCard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 600px;
  background-color: white;
  margin-top: 80px;
  padding: 40px;
`;

const ImageAndTitleContainer = styled.div`
  display: flex;
`;

const CardImageContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
`;

const CardTitleAndDesc = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 10px;
  gap: 10px;
`;

const Title = styled.h2`
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CardTime = styled.span`
  width: 100%;
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const CardPrice = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 1000;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const PriceSpan = styled.span`
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const CardDesc = styled.span`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const CardBrand = styled.span`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const CardAvailability = styled.span`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;

const HR = styled.hr`
  width: 100%;
`;

const INITIAL_PRODUCT = {
  _id: null,
  images: null,
  title: null,
  crawled_at: null,
  brand: null,
  priceCurrency: null,
  price: null,
  description: null,
  availability: null,
};

const ProductPage = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const {
    images,
    title,
    crawled_at,
    brand,
    priceCurrency,
    price,
    description,
    availability,
  } = product;
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getFullProduct", {
        params: { product_id },
      });
      const { data } = await res;
      setProduct(data[0]);
    } catch (e) {
      console.log("Error on fetchData const:  ", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      {product && product.availability ? (
        <>
          <ImageAndTitleContainer>
            <CardImageContainer>
              <Image src={images} alt=""></Image>
            </CardImageContainer>
            <CardTitleAndDesc>
              <Title>{title}</Title>
              <CardTime>{crawled_at}</CardTime>
              <CardPrice>
                <PriceSpan>Price: </PriceSpan>
                {price + " " + priceCurrency}
              </CardPrice>
              {brand ? (
                <CardBrand>
                  <b>Brand: </b>
                  {brand}
                </CardBrand>
              ) : null}
              <CardAvailability>
                <b>Availability: </b>
                {availability}
              </CardAvailability>
              <HR></HR>
            </CardTitleAndDesc>
          </ImageAndTitleContainer>
          <CardDesc>{description}</CardDesc>
        </>
      ) : (
        <LoadingCard />
      )}
    </Container>
  );
};

export default ProductPage;
