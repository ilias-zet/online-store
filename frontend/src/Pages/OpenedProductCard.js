import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios';
import LoadingTheme from "../shared/LoadingTheme";

const Container = styled.div`
display: flex;
justify-content: center;
width: 100%;
min-height: 600px;
background-color: white;
`
const ProductCardImageContainer = styled.div`
margin-top: 20px;
height: 100%;
width: 50%;
`
const ProductCardTitleAndDesc = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
margin: 20px;
`
const ProductCardTime = styled.span`
width: 100%;
color: gray;
font-size: 14px;
`
const ProductCardPrice = styled.div`
width: 100%;
margin-top: 10px;
font-size: 20px;
font-weight: 1000;
`
const PriceSpan = styled.span`
color: gray;
font-size: 14px;
`
const ProductCardDesc = styled.span`
width: 100%;
margin-top: 10px;
`
const ProductCardBrand = styled.span`
width: 100%;
margin-top: 10px;
`
const ProductCardAvailability = styled.span`
width: 100%;
margin-top: 10px;
`

const HR = styled.hr`
width: 100%;
margin-top: 10px;
`



const OpenedProductCard = () => {
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
  console.log(responsedProduct)
}
useEffect(() => {
  fetchData();
},[])
  return (
    <Container>
      {!responsedProduct? <LoadingTheme /> : (
        <>
          <ProductCardImageContainer>
            <img src={responsedProduct.images} alt=""></img>
          </ProductCardImageContainer>
          <ProductCardTitleAndDesc>
            <h2>{responsedProduct.title}</h2>
            <ProductCardTime>{responsedProduct.crawled_at}</ProductCardTime>
            <ProductCardPrice><PriceSpan>Price: </PriceSpan>{responsedProduct.price + responsedProduct.priceCurrency}</ProductCardPrice>
            <ProductCardBrand><b>Brand: </b>{responsedProduct.brand}</ProductCardBrand>
            <ProductCardAvailability><b>Availability: </b>{responsedProduct.availability}</ProductCardAvailability>
            <HR></HR>
            <ProductCardDesc>{responsedProduct.description}</ProductCardDesc>
          </ProductCardTitleAndDesc>
        </>
      )}
    </Container>
  )
}

export default OpenedProductCard;