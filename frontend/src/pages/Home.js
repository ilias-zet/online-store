import React, { useState, useEffect } from "react";
import styled from "styled-components";
import recomendedOne from "../assets/images/products/Bose portable Smart speaker.png";
import recomendedTwo from "../assets/images/products/SoundLink Flex Bluetooth speaker.png";
import recomendedThree from "../assets/images/products/SoundLink Color Bluetooth speaker II.png";
import CategoryForMainPage from "../shared/CategoryForMainPage";
import axios from "axios";
import LoadingCard from "../shared/LoadingCard";

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  min-height: 100%;
  background-color: white;
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
  background-color: white;
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
  color: #120907;
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;
const RecommendedProducts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;
const Product = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  height: 400px;
`;
const HowtoBuy = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100% 100%;
  margin-top: 48px;
  margin-bottom: 48px;
`;
const HowToBuyTitle = styled.div`
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
const HowToBuyContent = styled.div`
  flex-basis: 50%;
`;
const ProductPhoto = styled.img`
  width: 100%;
  margin-bottom: 32px;
`;
const ProductTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 140%;
  color: #120907;
`;
const ProductCategory = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
`;
const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
  color: #120907;
`;

const HomePage = ({ searchParams, setSearchParams }) => {
  const [categories, setCategories] = useState(null);
  const [recProducts, setRecProducts] = useState(null);
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
      console.log(data);
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
            ({
              availability,
              brand,
              images,
              main_category,
              price,
              priceCurrency,
              title,
            }) => {
              return (
                <Product>
                  <ProductPhoto
                    src={images}
                    alt="Recommended"
                  ></ProductPhoto>
                  <ProductTitle>{title}</ProductTitle>
                  <ProductCategory>{main_category}</ProductCategory>
                  <ProductPrice>{price + " " +priceCurrency}</ProductPrice>
                </Product>
              )
            }
          )
        )}

      </RecommendedProducts>
      <RecommendedTitle>Popular Categories</RecommendedTitle>
      <CategoriesContainer>
        {categories ? (
          categories.map((elem, idx) => {
            if (idx < 6) {
              return (
                <CategoryForMainPage
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  name={elem.main_category}
                  image={elem.image}
                  key={elem._id}
                ></CategoryForMainPage>
              );
            }
          })
        ) : (
          <LoadingCard></LoadingCard>
        )}
      </CategoriesContainer>
      <MainDescription>
        <RecommendedTitle>Fashion</RecommendedTitle>
        <HowtoBuy>
          <HowToBuyTitle>Dress to Impress</HowToBuyTitle>
          <HowToBuyContent>
            Dress to impress and make the best of every day no matter what it
            has in store. With fashions hottest must haves and accessories, you
            can find what youve been looking for on eBay.
          </HowToBuyContent>
        </HowtoBuy>
        <HowtoBuy>
          <HowToBuyContent>
            The stylish range of mens and womens clothing and shoes sizzle from
            head to toe, no matter the season. Its easier than ever to browse
            handbags, watches, and special occasion outfits by style, brand, or
            price. Search on eBay for womens fashion, mens fashion, clothes,
            shoes, handbags, jewelry, watches, jackets and more.
          </HowToBuyContent>
          <HowToBuyTitle>Fashionably Perfect</HowToBuyTitle>
        </HowtoBuy>
        <HowtoBuy>
          <HowToBuyTitle>Top Fashion Brands</HowToBuyTitle>
          <HowToBuyContent>
            If brands are your thing, you can surf eBay to find handbags by Vera
            Bradley, watches by Rolex, athletic apparel by Nike, shoes from Nine
            West, jackets from Michael Kors, and shoes from Puma. Its all here
            in the eBay Fashion Department.
          </HowToBuyContent>
        </HowtoBuy>
        <HowtoBuy>
          <HowToBuyContent>
            Dont skimp when it comes to menswear that looks sharp and stylish.
            Beef up your closet with fashionable jeans, sweaters, and suits.
            eBay has a selection of accessories to fit your fancy, including
            hats, ties, wallets, and sunglasses. Grab a new briefcase for work
            or find the perfect backpack that holds all of your hiking supplies.
          </HowToBuyContent>
          <HowToBuyTitle>Mens Fashion</HowToBuyTitle>
        </HowtoBuy>
        <HowtoBuy>
          <HowToBuyTitle>Womens Fashion</HowToBuyTitle>
          <HowToBuyContent>
            Browse the wide selection of style pieces on eBay, and unearth a
            world of trendy treasures for women and girls. Check out boots,
            heels, sandals, and athletic footwear that will keep you and your
            entire family moving year round. You can find sales that include top
            picks for fashionistas, or discover daily deals that add oomph to
            your closet without breaking the bank.
          </HowToBuyContent>
        </HowtoBuy>
      </MainDescription>
    </BodyContainer>
  );
};

export default HomePage;
