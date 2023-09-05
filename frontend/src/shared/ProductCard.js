import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getBasket } from './utils'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 350px;
  background-color: #b5b8b6;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s;
  &:hover {
    background-color: #7f8377;
  }
`
const CardImageContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 10px;
`

const CardImage = styled.img`
  width: 100%;
  transition: all 0.3s;
  &:hover {
    width: 116%;
    cursor: pointer;
  }
`
const CardTitle = styled.a`
  cursor: pointer;
  position: relative;
  justify-content: center;
  margin-top: 10px;
  width: 220px;
  display: inline-block;
  height: 88px;
  font-family: Bradley Hand;
  text-decoration: none;
  color: #120907;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1.2em;
  white-space: nowrap;
  &:hover {
    color: wheat;
  }
`
const CardPrice = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 1000;
  font-family: Bradley Hand;
  font-size: 20px;
  color: #120907;
  font-family: 'Inter', sans-serif;
`
const CardIsAmazonSeller = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: Bradley Hand;
  color: rgb(74, 74, 74);
  margin-top: 10px;
`

const AddToBasket = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 60%;
  height: 40px;
  border-radius: 10px;
  transition: background-color 0.3s;
  background-color: #58d176;
  &:hover {
    background-color: #38824a;
  }
`

const ProductCard = ({ user, setUser, product }) => {
  const navigate = useNavigate()
  const { _id, images, title, availability, price } = product
  const handlerSetBasket = () => {
    if (!user) {
      alert("You isn't authorized")
      return
    }
    if (user.basket.find((elem) => elem._id === _id)) {
      alert(`This product already in basket: ${title}`)
      return
    }
    const basketCopy = user.basket.slice()
    basketCopy.push(product)
    setUser((prevState) => ({
      ...prevState,
      basket: basketCopy,
    }))
    console.log(user)
  }

  return (
    <CardContainer>
      <CardImageContainer
        onClick={() => {
          navigate(`/products/${_id}`)
          window.scrollTo(0, 0)
        }}
      >
        {images ? <CardImage src={images}></CardImage> : null}
      </CardImageContainer>
      <CardTitle
        onClick={() => {
          navigate(`/products/${_id}`)
          window.scrollTo(0, 0)
        }}
      >
        {title}
      </CardTitle>
      <CardPrice>{'$' + price}</CardPrice>
      <CardIsAmazonSeller>{availability}</CardIsAmazonSeller>
      {user && user.email ? (
        <AddToBasket onClick={handlerSetBasket}>Add to basket</AddToBasket>
      ) : null}
    </CardContainer>
  )
}

export default ProductCard
