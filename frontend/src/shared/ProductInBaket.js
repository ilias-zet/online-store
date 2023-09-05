import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100px;
  background-color: #c9c9c9;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  width: 30%;
  height: 30%;
  background-color: #9c3b3b;
  border-radius: 5px;
`

const ProductInBascket = ({ product,setUser,user }) => {
  const { _id, images, title, price } = product
  const handlerSetBasket = () => {
    if (!user.basket.find((elem) => elem._id === _id)) {
      alert(`This product isn't in the basket: ${title}`)
      return
    }
    const basketCopy = user.basket.slice()
    const idx = basketCopy.indexOf(product)
    console.log(idx)
    // basketCopy.splice(product)
    // setUser((prevState) => ({
    //   ...prevState,
    //   basket: basketCopy,
    // }))
    // alert(`Added to the basket: ${title}`)
  }
  return (
    <Container>
      <ImageContainer>
        <Image src={images}></Image>
      </ImageContainer>
      <Title>{title}</Title>
      <Price>{'$' + price}</Price>
      <Buttons>
        <Remove onClick={setUser()}>-</Remove>
      </Buttons>
    </Container>
  )
}

export default ProductInBascket
