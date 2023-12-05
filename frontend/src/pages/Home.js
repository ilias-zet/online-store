import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Category from '../shared/Category'
import ProductCard from '../shared/ProductCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CreateNewProduct from '../shared/CreateNewProduct'
const { getRecommended } = require('../shared/utils')

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  min-height: 100%;
  margin-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  @media (max-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  border-radius: 10px;
  margin-top: 20px;
`

const CreateNewProductBtn = styled.span`
  cursor: pointer;
  background-color: #383838b8;
  padding: 4px;
  border-radius: 4px;
`

const MainDescription = styled.div`
  width: 100%;
`
const RecommendedTitle = styled.h2`
  /* margin-top: 64px; */
  margin-bottom: 0;
  /* font-size: 48px; */
  line-height: 100%;
  font-weight: bold;
  text-align: center;
  color: #e5e5e5;
  letter-spacing: -1.5px;
  @media (max-width: 480px) {
    font-size: 32px;
  }
`
const RecommendedProducts = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  gap: 10px;
`

const Present = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  margin-top: 48px;
  margin-bottom: 48px;
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
`

const PresentTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 50%;
  margin-top: 0;
  margin-bottom: 64px;
  font-size: 48px;
  line-height: 100%;
  font-weight: bold;
  letter-spacing: -1.5px;
  color: #e5e5e5;
  @media (max-width: 480px) {
    font-size: 24px;
  }
`
const PresentContent = styled.div`
  flex-basis: 50%;
`

const presents = [
  {
    title: 'Dress to Impress',
    content:
      'Dress to impress and make the best of every day no matter what ithas in store. With fashions hottest must haves and accessories, you can find what youve been looking for on eBay.',
  },
  {
    title: 'Fashionably Perfect',
    content:
      'The stylish range of mens and womens clothing and shoes sizzle from head to toe, no matter the season. Its easier than ever to browse handbags, watches, and special occasion outfits by style, brand, orprice. Search on eBay for womens fashion, mens fashion, clothes,shoes, handbags, jewelry, watches, jackets and more.',
  },
  {
    title: 'Top Fashion Brands',
    content: `If brands are your thing, you can surf eBay to find handbags by Vera
    Bradley, watches by Rolex, athletic apparel by Nike, shoes from Nine
    West, jackets from Michael Kors, and shoes from Puma. Its all here
    in the eBay Fashion Department.`,
  },
  {
    title: 'Mens Fashion',
    content: `Dont skimp when it comes to menswear that looks sharp and stylish.
    Beef up your closet with fashionable jeans, sweaters, and suits.
    eBay has a selection of accessories to fit your fancy, including
    hats, ties, wallets, and sunglasses. Grab a new briefcase for work
    or find the perfect backpack that holds all of your hiking supplies.`,
  },
  {
    title: 'Womens Fashion',
    content: `Browse the wide selection of style pieces on eBay, and unearth a
    world of trendy treasures for women and girls. Check out boots,
    heels, sandals, and athletic footwear that will keep you and your
    entire family moving year round. You can find sales that include top
    picks for fashionistas, or discover daily deals that add oomph to
    your closet without breaking the bank.`,
  },
]

const HomePage = ({ user, setUser }) => {
  const [categories, setCategories] = useState([])
  const [recProducts, setRecProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCreateProduct, setIsCreateProduct] = useState(false)
  console.log(user)
  const getData = async () => {
    const recommended = await getRecommended()
    return recommended
  }

  useEffect(() => {
    getData()
      .then((recommended) => {
        const { randomCategories, products } = recommended
        setRecProducts(products)
        setCategories(randomCategories)
        setIsLoaded(true)
      })
      .finally(setIsLoaded(true))
  }, [])
  return (
    <BodyContainer>
      {/* {user.role === "admin" && <span style={{"color":"gray"}}>Are you want to create a new product?</span>}
      {user.role === "admin" && <CreateNewProductBtn onClick={() => setIsCreateProduct(!isCreateProduct)}>{isCreateProduct ? "Show": "Hide"}</CreateNewProductBtn>} */}
      {isCreateProduct && <CreateNewProduct></CreateNewProduct>}
      <RecommendedTitle>Recommended</RecommendedTitle>
      <RecommendedProducts>
        {!isLoaded ? (
          <Skeleton
            style={{ margin: '20px' }}
            count={3}
            width={210}
            height={350}
            borderRadius={10}
            inline={true}
          ></Skeleton>
        ) : (
          recProducts.map((product) => (
            <ProductCard
              user={user}
              setUser={setUser}
              product={product}
            ></ProductCard>
          ))
        )}
      </RecommendedProducts>
      <RecommendedTitle>Popular Categories</RecommendedTitle>
      <CategoriesContainer>
        {categories.length ? (
          categories.map(({ main_category, image, _id }) => (
            <Category name={main_category} image={image} key={_id}></Category>
          ))
        ) : (
          <Skeleton
            style={{ margin: '20px' }}
            count={6}
            width={210}
            height={350}
            borderRadius={10}
            inline={true}
          ></Skeleton>
        )}
      </CategoriesContainer>
      <MainDescription>
        <RecommendedTitle>Fashion</RecommendedTitle>
        {presents.map(({ title, content }) => (
          <Present key={title}>
            <PresentTitle key={title+"title"}>{title}</PresentTitle>
            <PresentContent key={title+"content"}>{content}</PresentContent>
          </Present>
        ))}
      </MainDescription>
    </BodyContainer>
  )
}

export default HomePage
