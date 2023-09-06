import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const { getProduct } = require("../shared/utils");

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

const Back = styled.span`
cursor: pointer;
margin: 10px;
width: 100%;
text-decoration: underline;
color: gray;
`

const ImgContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
 
`
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

const SkeletonContainer = styled.div`
padding: 20px;
width: 100%;
height: 700px;
`

const INITIAL_PRODUCT = {
  _id: 0, // Number
  images: "", // String
  title: "", // String
  crawled_at: "", // String
  brand: "", // String
  priceCurrency: "", // String
  price: 0, // Number
  description: "", // String
  availability: "", // String
};

const ProductPage = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  let [searchParams] = useSearchParams();
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const {images,title,crawled_at,brand,priceCurrency,price,description,availability,} = product;

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0
  })

  const resetTransform = () => {
    setMousePosition({left: 0, top: 0})
  }

  function handleMouseMove(e) {
    setMousePosition({left: e.pageX, top: e.pageY})
   }

  const getData = async () => {
    const categories = await getProduct(product_id);
    return categories;
  };

  useEffect(() => {
    getData().then((product) => {
      setProduct(product);
    });
  }, []);
  return (
    <Container>
      {product && product.availability ? (
        <>
        <Back onClick={() => {
          searchParams.set("category",product.main_category)
          navigate(`/products?${searchParams.toString()}`);
          }}>{`<- Back to "${product.main_category}" category`}</Back>
          <InnerContainer>
            <ImgContainer onMouseMove={(e)=> handleMouseMove(e)} onMouseOut={() => resetTransform()}>
              <Image src={images} alt="" MousePosition={MousePosition}></Image>
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
        <SkeletonContainer>
          <Skeleton
          style={{ margin: "10px"}}
          count={2}
          width={"47%"}
          height={"80%"}
          borderRadius={10}
          inline={true}
        ></Skeleton>
        <Skeleton
          style={{ margin: "10px"}}
          count={1}
          width={"100%"}
          height={"20%"}
          borderRadius={10}
        ></Skeleton>
        </SkeletonContainer>
      )}
    </Container>
  );
};

export default ProductPage;
