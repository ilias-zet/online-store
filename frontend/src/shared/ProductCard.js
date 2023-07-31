import React from 'react'
import styled from 'styled-components'



const CardContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width:230px;
height:350px;
background-color: rgb(184, 184, 184);
margin: 10px;
border-radius: 10px;
transition: all 0.2s;
&:hover {
  background-color: rgb(144, 144, 144);
}
`
const CardImageContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:90%;
height:200px;
margin-top: 10px;
overflow: hidden;
/* border: 2px solid gray; */
border-radius: 10px;
`

const CardImage = styled.img`
width: 100%;
transition: all 0.3s;
&:hover {
  width: 116%;
  cursor: pointer;
  }
`
const CardTitle = styled.a` 
display:flex;
justify-content:center;
margin-top: 10px;
width:90%;
height: 88px;
font-family: Bradley Hand;
text-decoration:none;
color: black;
font-size: 16px;
font-family: 'Inter', sans-serif;
&:hover {
  color: rgb(102, 62, 158);
}
`
const CardPrice = styled.div`
display:flex;
align-items:center;
width:90%;
font-weight:1000;
font-family: Bradley Hand;
font-size: 20px;
color: black;
font-family: 'Inter', sans-serif;
`
const CardIsAmazonSeller = styled.div`
display:flex;
align-items:center;
width:90%;
font-family: Bradley Hand;
color: rgb(74, 74, 74);
margin-top:10px;
`

const ProductCard = ({ product, category,setMainPageHeader }) => {
  return (
    <CardContainer>
      <CardImageContainer>
        {product.images? <CardImage src={product.images}></CardImage>:null}
      </CardImageContainer>
      <CardTitle href={`/products/${product._id}`} alt="" onClick={() => setMainPageHeader(false)}>{product.title.length > 91 ? product.title.substr(0,91)+"..." : product.title}</CardTitle>
      <CardPrice>{product.price+"$"}</CardPrice>
      <CardIsAmazonSeller>{product.availability? product.availability : null}</CardIsAmazonSeller>
  </CardContainer>
  )
}

export default ProductCard;