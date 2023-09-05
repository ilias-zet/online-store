import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProductInBascket from '../shared/ProductInBaket'
import { getBasket } from '../shared/utils'

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin-top: 60px;
  padding: 20px;
`
const Title = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Counter = styled.span`
  color: gray;
  width: 100%;
  padding-left: 20px;
`

const Products = styled.div`
display: flex;
flex-direction: column;
justify-content: center;

`

const Basket = ({ user, basket, setBasket }) => {
  useEffect(() => {
    const basketLS = JSON.parse(localStorage.getItem('basket'))
    if (basketLS) {
      setBasket(basketLS)
    }
  }, [])
  useEffect(() => {
    getBasket(user)
      .then((basketData) => {
        console.log(basketData)
      })
    console.log(user)
  }, []);
  return (
    <Container>
      <Title>Your basket</Title>
      <Counter>
        {basket
          ? `Founded ${basket.length} products in basket`
          : 'Basket is empty'}
      </Counter>
      <Products>
        {basket ? basket.map(product => <ProductInBascket product={product}></ProductInBascket>): null}
      </Products>
    </Container>
  )
}

export default Basket
