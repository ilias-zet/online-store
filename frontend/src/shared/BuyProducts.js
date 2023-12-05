import React from "react";
import styled from "styled-components";
import { updateBuyHistory, updateCart } from "./utils";
import { useNavigate } from "react-router-dom";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  min-height: 400px;
  background-color: #303030;
  margin-top: 88px;
  padding: 10px;
  border: 1px solid rgb(229 229 229 / 16%);
`;

const MainTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  color: #e5e5e5;
  margin: 0;
`;

const Title = styled.span`
  margin-top: 16px;
  width: 100%;
  color: #e5e5e5;
`;

const Input = styled.input`
  color: #e5e5e5;
  padding: 8px;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  background-color: #303030;
  border: 1px solid rgb(229 229 229 / 16%);
`;

const BuyProductsBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  width: 30%;
  height: 32px;
  background-color: rgb(67 67 67);
  border-radius: 8px;
`;

const BuyProducts = ({ user, setUser }) => {
  const { cart } = user;
  const navigate = useNavigate();

  const buyProductsHandler = () => {
    // Add current cart to the buy history
    updateBuyHistory(user._id, cart).then((res) => {
      const { data } = res;
      const { success } = data;
      if (!success) {
        const { message } = data;
        alert(message);
        return;
      }
      const { updatedBuyHistory } = data;
      setUser((prevState) => ({
        ...prevState,
        buyHistory: updatedBuyHistory,
      }));
      console.log(updatedBuyHistory);
      // Clear cart
      const emptyCart = [];
      updateCart(user._id, emptyCart).then((res) => {
        const { data } = res;
        const { success } = data;
        if (!success) {
          const { message } = data;
          alert(message);
          return;
        }
        const { updatedCart } = data;
        setUser((prevState) => ({
          ...prevState,
          cart: updatedCart,
        }));
      });
      alert("Succesfull bought!");
      navigate("/");
    });
  };

  return (
    <OuterContainer>
      <Container>
        <MainTitle>Buy products from the cart</MainTitle>
        <Title>City*:</Title>
        <Input type="text" placeholder="Odessa"></Input>
        <Title>Street*:</Title>
        <Input type="text" placeholder="Deribasovskaya"></Input>
        <Title>Home number*:</Title>
        <Input type="number" min={1} placeholder="21"></Input>
        <BuyProductsBtn onClick={buyProductsHandler}>Buy</BuyProductsBtn>
      </Container>
    </OuterContainer>
  );
};

export default BuyProducts;
