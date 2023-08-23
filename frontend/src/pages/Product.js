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
  margin-top: 80px;
  padding: 40px;
`;

const InnerContainer = styled.div`
  display: flex;
`;

const ImgContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
`;

const Info = styled.div`
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

const Time = styled.span`
  width: 100%;
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const Price = styled.div`
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
const Desc = styled.span`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const Brand = styled.span`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const Availability = styled.span`
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
  _id: 0, // Number
  images: '', // String
  title: '', // String
  crawled_at: '', // String
  brand: '', // String
  priceCurrency: '', // String
  price: 0, // Number
  description: '', // String
  availability: '', // String
};

const ProductPage = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const {images,title,crawled_at,brand,priceCurrency,price,description,availability,} = product;
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getFullProduct", {
        params: { product_id },
      });
      const { data } = res;
      setProduct(data);
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
          <InnerContainer>
            <ImgContainer>
              <Image src={images} alt=""></Image>
            </ImgContainer>
            <Info>
              <Title>{title}</Title>
              <Time>{crawled_at}</Time>
              <Price>
                <PriceSpan>Price: </PriceSpan>
                {price + " " + priceCurrency}
              </Price>
              {brand ? (
                <Brand>
                  <b>Brand: </b>
                  {brand}
                </Brand>
              ) : null}
              <Availability>
                <b>Availability: </b>
                {availability}
              </Availability>
              <HR></HR>
            </Info>
          </InnerContainer>
          <Desc>{description}</Desc>
        </>
      ) : (
        <LoadingCard />
      )}
    </Container>
  );
};

export default ProductPage;
