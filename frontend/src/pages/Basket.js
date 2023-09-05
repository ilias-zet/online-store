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

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 24px;
  width: 100%;
`

const Basket = ({ user }) => {
  const userLS = JSON.parse(localStorage.getItem('user'))
  const { basket } = userLS
  let totalSum = 0
  basket.forEach((elem) => {
    totalSum += elem.price
  })
  return (
    <Container>
      <Title>Your basket</Title>
      <Counter>
        {basket
          ? `Founded ${basket.length} products in basket`
          : 'Basket is empty'}
      </Counter>
      <Products>
        {basket
          ? basket.map((product) => (
              <ProductInBascket product={product}></ProductInBascket>
            ))
          : null}
      </Products>
      {totalSum ? <Total>{`Total sum: $${totalSum}`}</Total> : null}
    </Container>
  )
}

export default Basket
