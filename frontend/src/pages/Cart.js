import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductInCart from "../shared/ProductInCart";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 600px;
  margin-top: 60px;
  padding: 20px;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Counter = styled.span`
  color: gray;
  width: 100%;
  padding-left: 20px;
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 24px;
  width: 100%;
`;

const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: 1000;
  margin-top: 20px;
`;

const ToOrderContainer = styled.div`
  width: 100%;
`;

const ToOrder = styled.div`
  cursor: pointer;
  color: gray;
  text-decoration: underline;
`;

// ДАННЫЕ ФОРМИРУЮТСЯ ТОЛЬКО НА КЛИЕНТЕ, С БД НЕ СВЯЗАНЫ
// КОРЗИНА ТЯНЕТСЯ ИЗ ЮЗЕРА КОТОРЫЙ ТЯНЕТСЯ ИЗ БД, НО УДАЛЕНИЕ ТОВАРОВ НЕ УДАЛЯЕТ ИХ ИЗ КОРЗИНЫ В БД, ТОЛЬКО СО СТЕЙТА
const Cart = ({ user, setUser }) => {
  // const { cart } = user;
  const [readyToOrder, setReadyToOrder] = useState(true);
  const navigate = useNavigate();
  let totalSum = 0;
  if (user.cart.length>0) {
    user.cart.forEach((elem) => {
      totalSum += Number(elem.price);
    });
  }
  return (
    <Container>
      {user.cart && user.email ? (
        !user.cart ? (
          <Skeleton
            style={{ margin: "10px" }}
            count={3}
            width={"100%"}
            height={150}
            borderRadius={10}
          ></Skeleton>
        ) : (
          <>
            <Title>Your cart</Title>
            <Counter>
              {user.cart.length
                ? `Found ${user.cart.length} products in cart`
                : "cart is empty"}
            </Counter>
            <Products>
              {user.cart
                ? user.cart.map((product) => (
                    <ProductInCart
                      user={user}
                      setUser={setUser}
                      product={product}
                    ></ProductInCart>
                  ))
                : null}
            </Products>
            {totalSum ? <Total>{`Total sum: $${totalSum}`}</Total> : null}
            {user.cart.length>0 && (
              <ToOrderContainer>
                <ToOrder
                  onClick={() => {
                    setReadyToOrder(!readyToOrder);
                    window.scrollTo(0, 0);
                    navigate("/buy_products_from_cart");
                  }}
                >
                  Ready to order? Click here.
                </ToOrder>
              </ToOrderContainer>
            )}
          </>
        )
      ) : (
        <Warning>"Please, login for access to cart"</Warning>
      )}
    </Container>
  );
};

export default Cart;
