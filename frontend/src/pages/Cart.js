import React from 'react'
import styled from 'styled-components'
import ProductInCart from '../shared/ProductInCart'
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

const Warning = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
font-size: 20px;
font-weight: 1000;
margin-top: 20px;
`


const Cart = ({ user,setUser }) => {
  const { cart } = user
  let totalSum = 0
  cart.forEach((elem) => {
    totalSum += Number(elem.price)
  })
  return (
    <Container>
      {cart && user.email ? (
        !cart ?( 
        <Skeleton
          style={{ margin: '10px' }}
          count={3}
          width={'100%'}
          height={150}
          borderRadius={10}
        ></Skeleton>) : (
          <>
          <Title>Your cart</Title>
          <Counter>
            {cart
              ? `Founded ${cart.length} products in cart`
              : 'cart is empty'}
          </Counter>
          <Products>
            {cart
              ? cart.map((product) => (
                  <ProductInCart user={user} setUser={setUser} product={product}></ProductInCart>
                ))
              : null}
          </Products>
          {totalSum ? <Total>{`Total sum: $${totalSum}`}</Total> : null}
        </>
        )
      ) : (
        <Warning>"Please, login for access to cart"</Warning>
      )}
    </Container>
  )
}

export default Cart
