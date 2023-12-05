import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProductCard from '../shared/ProductCard'
import Filter from '../shared/Filter'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
const { getProducts } = require('../shared/utils')

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-height: 100vh;
  margin-top: 80px;
  padding-left: 220px;
`

const Back = styled.span`
  cursor: pointer;
  margin: 10px;
  width: 100%;
  text-decoration: underline;
  color: gray;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100%;
`

const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-family: 'Inter', sans-serif;
`

const ProductsCounter = styled.span`
  width: 100%;
  display: flex;
  color: gray;
`

const SkeletonContainer = styled.div`
  width: 100%;
  min-height: 100%;
`

const ProductsPage = ({ user,setUser }) => {
  const navigate = useNavigate()
  const [price, setPrice] = useState({ min: 0, max: 9999 })
  const { min, max } = price
  let [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const [product, setProduct] = useState(null)
  const getData = async () => {
    const products = await getProducts(category)
    return products
  }

  useEffect(() => {
    getData().then((products) => {
      setProduct(products)
      window.scrollTo(0, 0)
    })
  }, [])
  return (
    <Container>
      <Back onClick={() => navigate(`/categories`)}>
        {'<- Back to "Categories"'}
      </Back>
      <H1>{category}</H1>
      <Filter setPrice={setPrice}></Filter>
      {!product ? (
        <SkeletonContainer>
          <Skeleton
            style={{ margin: '10px' }}
            count={15}
            width={230}
            height={350}
            borderRadius={10}
            inline={true}
          ></Skeleton>
        </SkeletonContainer>
      ) : (
        <CardsContainer>
          <ProductsCounter>
            {'Found ' +
              product.filter((elem) => elem.price > min && elem.price < max)
                .length +
              (product.filter((elem) => elem.price > min && elem.price < max)
                .length > 1
                ? ' results:'
                : ' result:')}
          </ProductsCounter>
          {product
            .filter((elem) => elem.price > min && elem.price < max)
            .map((product) => {
              return (
                <ProductCard
                  user={user}
                  setUser={setUser}
                  product={product}
                  key={product._id}
                ></ProductCard>
              )
            })}
        </CardsContainer>
      )}
    </Container>
  )
}

export default ProductsPage
