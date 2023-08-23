import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "../shared/Category";
import axios from "axios";
import LoadingCard from "../shared/LoadingCard";
import { useNavigate } from "react-router-dom";

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  min-height: 100%;
  /* background-color: white; */
  margin-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  @media (max-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 70%;
  min-height: 500px;
  border-radius: 10px;
  margin-top: 20px;
`;

const MainDescription = styled.div`
  width: 100%;
`;
const RecommendedTitle = styled.h2`
  margin-top: 64px;
  margin-bottom: 0;
  font-size: 48px;
  line-height: 100%;
  font-weight: bold;
  text-align: center;
  letter-spacing: -1.5px;
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;
const RecommendedProducts = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;
const RecProduct = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 200px;
  height: 400px;
  padding: 10px;
`;

const Present = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  margin-top: 48px;
  margin-bottom: 48px;
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
`;

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
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
const PresentContent = styled.div`
  flex-basis: 50%;
`;

const RecImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 10px;
  overflow: hidden;
`;

const RecPhoto = styled.img`
  width: 100%;
  margin-bottom: 32px;
  transition: all 0.3s;
  &:hover {
    width: 116%;
  }
`;
const RecTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 140%;
`;
const RecCategory = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
`;
const RecPrice = styled.p`
  margin: 0;
  font-weight: bold;
`;

const presents = [
  {
    title: "Dress to Impress",
    content:
      "Dress to impress and make the best of every day no matter what ithas in store. With fashions hottest must haves and accessories, you can find what youve been looking for on eBay.",
  },
  {
    title: "Fashionably Perfect",
    content:
      "The stylish range of mens and womens clothing and shoes sizzle from head to toe, no matter the season. Its easier than ever to browse handbags, watches, and special occasion outfits by style, brand, orprice. Search on eBay for womens fashion, mens fashion, clothes,shoes, handbags, jewelry, watches, jackets and more.",
  },
  {
    title: "Top Fashion Brands",
    content: `If brands are your thing, you can surf eBay to find handbags by Vera
    Bradley, watches by Rolex, athletic apparel by Nike, shoes from Nine
    West, jackets from Michael Kors, and shoes from Puma. Its all here
    in the eBay Fashion Department.`,
  },
  {
    title: "Mens Fashion",
    content: `Dont skimp when it comes to menswear that looks sharp and stylish.
    Beef up your closet with fashionable jeans, sweaters, and suits.
    eBay has a selection of accessories to fit your fancy, including
    hats, ties, wallets, and sunglasses. Grab a new briefcase for work
    or find the perfect backpack that holds all of your hiking supplies.`,
  },
  {
    title: "Womens Fashion",
    content: `Browse the wide selection of style pieces on eBay, and unearth a
    world of trendy treasures for women and girls. Check out boots,
    heels, sandals, and athletic footwear that will keep you and your
    entire family moving year round. You can find sales that include top
    picks for fashionistas, or discover daily deals that add oomph to
    your closet without breaking the bank.`,
  },
];

const HomePage = () => {
  const [categories, setCategories] = useState(null);
  const [recProducts, setRecProducts] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      //Get array with images for categories
      const resImgs = await axios.get("http://localhost:8000/getCategories");
      const imgsAndNameCategoriesArr = resImgs.data;
      setCategories(imgsAndNameCategoriesArr);

      //Get array with recommended products
      const recProducts = await axios.get(
        "http://localhost:8000/getRecommendedProducts"
      );
      const { data } = recProducts;
      setRecProducts(data);
    } catch (e) {
      console.log("Error Home page: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <BodyContainer>
      <RecommendedTitle>Recommended</RecommendedTitle>

      <RecommendedProducts>
        {!recProducts ? (
          <LoadingCard></LoadingCard>
        ) : (
          recProducts.map(
            ({ _id, images, main_category, price, priceCurrency, title }) => (
              <RecProduct
                onClick={() => navigate(`/products/${_id}`)}
                key={_id}
              >
                <RecImageContainer>
                  <RecPhoto src={images} alt="Recommended"></RecPhoto>
                </RecImageContainer>
                <RecTitle>{title}</RecTitle>
                <RecCategory>{main_category}</RecCategory>
                <RecPrice>{price + " " + priceCurrency}</RecPrice>
              </RecProduct>
            )
          )
        )}
      </RecommendedProducts>
      <RecommendedTitle>Popular Categories</RecommendedTitle>
      <CategoriesContainer>
        {categories ? (
          categories.slice(6, 12).map(({ main_category, image, _id }) => {
            return (
              <Category name={main_category} image={image} key={_id}></Category>
            );
          })
        ) : (
          <LoadingCard></LoadingCard>
        )}
      </CategoriesContainer>
      <MainDescription>
        <RecommendedTitle>Fashion</RecommendedTitle>
        {presents.map(({ title, content }) => {
          return (
            <Present>
              <PresentTitle>{title}</PresentTitle>
              <PresentContent>{content}</PresentContent>
            </Present>
          );
        })}
      </MainDescription>
    </BodyContainer>
  );
};

export default HomePage;
