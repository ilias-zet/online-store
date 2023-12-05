import React from 'react'
import styled from 'styled-components'
import { updateCart } from './utils'

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100px;
  background-color: #303030;
  border: 1px solid rgb(229 229 229 / 16%);
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: #303030;
  transition: background-color 0.3s;
  @media (max-width: 1024px) {
    height: 150px;
  }
  @media (max-width: 520px) {
    height: 200px;
  }
  &:hover {
    background-color: #919191;
  }
`

const ImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 5px;
  width: 20%;
  @media (max-width: 480px) {
    width: 30%;
  }
`

const Image = styled.img`
  height: 100%;
`

const Price = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`

const Title = styled.span`
  padding: 8px;
  width: 20%;
  height: 100%;
  color: #e5e5e5;
  white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  @media (max-width: 520px) {
    width: 40%;
  }
`

const Remove = styled.div`
cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  width: 30%;
  height: 30%;
  background-color: rgb(139 63 63 / 61%);
  border: 1px solid rgb(229 229 229 / 16%);
  border-radius: 5px;
`

const Cart = ({ product, setUser, user }) => {
  const { images, title, price } = product
  const handlerSetCart = () => {
    const cartCopy = user.cart.slice()
    const idx = cartCopy.indexOf(product)
    cartCopy.splice(idx, 1)
    setUser((prevState) => ({
      ...prevState,
      cart: cartCopy,
    }))
    updateCart(user._id,cartCopy).then(res => {
      const {data} = res;
      const {success} = data;
      if(!success) {
        const {message} = data;
        alert(message)
        return
      }
      const {updatedCart} = data;
      setUser((prevState) => ({
        ...prevState,
        cart: updatedCart,
      }))
    })
  }
  return (
    <Container>
      <ImageContainer>
        <Image src={images}></Image>
      </ImageContainer>
      <Title>{title}</Title>
      <Price>{'$' + price}</Price>
      <Buttons>
        <Remove onClick={handlerSetCart}>-</Remove>
      </Buttons>
    </Container>
  )
}

export default Cart
