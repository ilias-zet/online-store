import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 350px;
  background-color: #b5b8b6;
  margin: 10px;
  border-radius: 10px;
  transition: all 0.2s;
  &:hover {
    background-color: #7f8377;
  }
`;
const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 200px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  transition: all 0.3s;
  &:hover {
    width: 116%;
    cursor: pointer;
  }
`;
const CardTitle = styled.a`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 90%;
  height: 88px;
  font-family: Bradley Hand;
  text-decoration: none;
  color: #120907;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  &:hover {
    color: wheat;
  }
`;
const CardPrice = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  font-weight: 1000;
  font-family: Bradley Hand;
  font-size: 20px;
  color: #120907;
  font-family: "Inter", sans-serif;
`;
const CardIsAmazonSeller = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  font-family: Bradley Hand;
  color: rgb(74, 74, 74);
  margin-top: 10px;
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/products/${product._id}`)}>
      <CardImageContainer>
        {product.images ? <CardImage src={product.images}></CardImage> : null}
      </CardImageContainer>
      <CardTitle>
        {product.title.length > 41
          ? product.title.substr(0, 41) + "..."
          : product.title}
      </CardTitle>
      <CardPrice>{product.price + "$"}</CardPrice>
      <CardIsAmazonSeller>
        {product.availability ? product.availability : null}
      </CardIsAmazonSeller>
    </CardContainer>
  );
};

export default ProductCard;
