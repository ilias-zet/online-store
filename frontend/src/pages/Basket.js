import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProductInBascket from '../shared/ProductInBaket'
import Skeleton from 'react-loading-skeleton'

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

// State user for future changes
const Basket = ({ user,setUser }) => {
  const userLS = JSON.parse(localStorage.getItem('user'))
  const { basket } = userLS
  let totalSum = 0
  basket.forEach((elem) => {
    totalSum += elem.price
  })
  return (
    <Container>
      {basket ? (
        !basket ?( 
        <Skeleton
          style={{ margin: '10px' }}
          count={3}
          width={'100%'}
          height={150}
          borderRadius={10}
        ></Skeleton>) : (
          <>
          <Title>Your basket</Title>
          <Counter>
            {basket
              ? `Founded ${basket.length} products in basket`
              : 'Basket is empty'}
          </Counter>
          <Products>
            {basket
              ? basket.map((product) => (
                  <ProductInBascket user={user} setUser={setUser} product={product}></ProductInBascket>
                ))
              : null}
          </Products>
          {totalSum ? <Total>{`Total sum: $${totalSum}`}</Total> : null}
        </>
        )
      ) : (
        <h2>"You not logined"</h2>
      )}
    </Container>
  )
}

export default Basket
