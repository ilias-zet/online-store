import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios';
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
`

const ImageAndTitleContainer = styled.div`
display: flex;
`

const ProductCardImageContainer = styled.div`
margin-top: 20px;
height: 100%;
width: 50%;
`

const Image = styled.img`
width: 100%;
`

const ProductCardTitleAndDesc = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin: 10px;
`

const Title = styled.h2`
@media (max-width: 480px) {
  font-size: 16px;
}
`

const ProductCardTime = styled.span`
width: 100%;
color: gray;
font-size: 14px;
@media (max-width:480px) {
  font-size: 10px;
}
`
const ProductCardPrice = styled.div`
width: 100%;
margin-top: 10px;
font-size: 20px;
font-weight: 1000;
@media (max-width:480px) {
  font-size: 10px;
  margin-top: 0;
}
`
const PriceSpan = styled.span`
color: gray;
font-size: 14px;
@media (max-width:480px) {
  font-size: 10px;
}
`
const ProductCardDesc = styled.span`
width: 100%;
margin-top: 10px;
margin-bottom: 10px;
@media (max-width:480px) {
  font-size: 10px;
  margin-top: 0;
}
`
const ProductCardBrand = styled.span`
width: 100%;
margin-top: 10px;
@media (max-width:480px) {
  font-size: 10px;
  margin-top: 0;
}
`
const ProductCardAvailability = styled.span`
width: 100%;
margin-top: 10px;
@media (max-width:480px) {
  font-size: 10px;
  margin-top: 0;
}
`

const HR = styled.hr`
width: 100%;
margin-top: 10px;
`



const ProductPage = () => {
  const { product_id } = useParams()
  const [responsedProduct, setresponsedProduct] = useState(null)
  const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8000/getFullProduct",{params: { product_id }}) 
    const resProductData = await res.data
    setresponsedProduct(resProductData[0])
    

  } catch(e) {
    console.log("Error on fetchData const:  ", e)
  }
}
useEffect(() => {
  fetchData();
},[])
  return (
    <Container>
      {!responsedProduct? <LoadingCard /> : (
        <>
        <ImageAndTitleContainer>
          <ProductCardImageContainer>
            <Image src={responsedProduct.images} alt=""></Image>
          </ProductCardImageContainer>
          <ProductCardTitleAndDesc>
            <Title>{responsedProduct.title}</Title>
            <ProductCardTime>{responsedProduct.crawled_at}</ProductCardTime>
            <ProductCardPrice><PriceSpan>Price: </PriceSpan>{responsedProduct.price + responsedProduct.priceCurrency}</ProductCardPrice>
            <ProductCardBrand><b>Brand: </b>{responsedProduct.brand}</ProductCardBrand>
            <ProductCardAvailability><b>Availability: </b>{responsedProduct.availability}</ProductCardAvailability>
            <HR></HR>
            </ProductCardTitleAndDesc>
            </ImageAndTitleContainer>
            <ProductCardDesc>{responsedProduct.description}</ProductCardDesc>
          
        </>
      )}
    </Container>
  )
}

export default ProductPage;