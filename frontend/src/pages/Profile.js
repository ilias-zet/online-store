import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 40px;
  margin-top: 80px;
`;

const MainTitle = styled.h1`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const SecondaryTitle = styled.h2`
width:100%;
height: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #303030;
  padding: 16px;
  width: 100%;
  min-height: 200px;
  margin-top: 24px;
  border: 1px solid rgb(229 229 229 / 16%);
`;

const OneInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

const InfoTitle = styled.div`
  display: flex;
  margin-top: 12px;
  color: gray;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Surname = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Email = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Role = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Purchase = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: #1a1a1a;
  border: 1px solid rgba(229, 229, 229, 0.16);
  padding: 12px;
  margin-top: 16px;
`

const BuyDate = styled.div`
width: 100%;
color: gray;
`

const Product = styled.div`
display: flex;
width: 100%;
height: 100px;
border: 1px solid rgb(229 229 229 / 16%);
padding: 8px;
`

const ProductImgContainer = styled.div`
height: 100%;
width: 20%;
overflow: hidden;
`

const ProductImg = styled.img`
width: 100%;
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
padding: 8px;
width: 80%;
height: 100%;
`
const Productitle = styled.div`

`

const ProductPrice = styled.div`
`

const Profile = ({ user }) => {
  // Функция для форматирования времени покупки
  const formatPurchaseTime = (purchaseTime) => {
    const timestamp = parseInt(purchaseTime, 10);
    const purchaseDate = new Date(timestamp);
    return purchaseDate.toLocaleString(); // Используем локальные настройки для форматирования
  };
  


  return (
    <Container>
      <MainTitle>User profile</MainTitle>
      <InfoContainer>
        <SecondaryTitle>Private data</SecondaryTitle>
        <OneInfoContainer>
          <InfoTitle>Name</InfoTitle>
          <Name>{user.name}</Name>
        </OneInfoContainer>

        <OneInfoContainer>
          <InfoTitle>Surname</InfoTitle>
          <Surname>{user.surname}</Surname>
        </OneInfoContainer>

        <OneInfoContainer>
          <InfoTitle>Email</InfoTitle>
          <Email>{user.email}</Email>
        </OneInfoContainer>

        <OneInfoContainer>
          <InfoTitle>Role</InfoTitle>
          <Role>{user.role}</Role>
        </OneInfoContainer>
      </InfoContainer>

      <InfoContainer>
        <SecondaryTitle>Buy history</SecondaryTitle>
        {user.buyHistory && user.buyHistory.length > 0 ? (
          user.buyHistory.sort((a,b) => {
            return b.date - a.date
          }).map(purchase => (
            <Purchase>
              <BuyDate>{formatPurchaseTime(purchase.date)}</BuyDate>
              {purchase.products.map(product => (
                <Product>
                  <ProductImgContainer>
                    <ProductImg src={product.images}></ProductImg>
                  </ProductImgContainer>
                  <ProductInfo>
                    <Productitle>{product.title}</Productitle>
                    <ProductPrice>${product.price}</ProductPrice>
                  </ProductInfo>
                </Product>
              ))}
            </Purchase>
          ))
        ) : (
          <span>History is empty</span>
        )}
      </InfoContainer>
    </Container>
  );
};

export default Profile;
