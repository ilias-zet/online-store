import React, { useState, useEffect } from "react";
import styled from "styled-components";
import recomendedOne from "./images/products/Bose portable Smart speaker.png";
import recomendedTwo from "./images/products/SoundLink Flex Bluetooth speaker.png";
import recomendedThree from "./images/products/SoundLink Color Bluetooth speaker II.png";
import CategoryForMainPage from "../../shared/CategoryForMainPage";
import axios from "axios";
import LoadingCard from "../../shared/LoadingCard";

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  min-height: 100%;
  background-color: white;
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
  width: 90%;
`;
const RecommendedTitle = styled.h2`
  margin-top: 64px;
  margin-bottom: 0;
  font-size: 48px;
  line-height: 100%;
  font-weight: bold;
  text-align: center;
  letter-spacing: -1.5px;
  color:#120907;
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;
const RecommendedProducts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100% 100%;
  width: 70%;
  height: 100%;
`;
const Product = styled.article`
  width: 100%;
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
  color:#120907;
`;
const ProductCategory = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
`;
const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
  color:#120907;
`;

const HomePage = ({ searchParams, setSearchParams }) => {
  const [categories, setCategories] = useState(null)
  const fetchData = async () => {
    try {
      //Get array with images for categories
      const resImgs = await axios.get("http://localhost:8000/getImages")
      const imgsAndNameCategoriesArr = resImgs.data;
      setCategories(imgsAndNameCategoriesArr);
    } catch (e) {
      console.log("Error MainBody.js: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <BodyContainer>
      <RecommendedTitle>Recommended</RecommendedTitle>

      <RecommendedProducts>
        <Product>
          <ProductPhoto
            src={recomendedOne}
            alt="Bose portable Smart speaker"
          ></ProductPhoto>
          <ProductTitle>Bose portable Smart speaker</ProductTitle>
          <ProductCategory>
            Smart home
          </ProductCategory>
          <ProductPrice>$ 399.00</ProductPrice>
        </Product>

        <Product>
          <ProductPhoto
            src={recomendedTwo}
            alt="SoundLink Flex Bluetooth speaker"
          ></ProductPhoto>
          <ProductTitle>SoundLink Flex Bluetooth speaker</ProductTitle>
          <ProductCategory>Portable bluetooth</ProductCategory>
          <ProductPrice>$ 149.00</ProductPrice>
        </Product>

        <Product>
          <ProductPhoto
            src={recomendedThree}
            alt="SoundLink Color Bluetooth speaker II"
          ></ProductPhoto>
          <ProductTitle>SoundLink Color Bluetooth speaker II</ProductTitle>
          <ProductCategory>Portable bluetooth</ProductCategory>
          <ProductPrice>$ 129.00</ProductPrice>
        </Product>
      </RecommendedProducts>
      <RecommendedTitle>Popular Categories</RecommendedTitle>
      <CategoriesContainer>
        {categories ? categories.map((elem, idx) => {
          if(idx<6) {
            return (
              <CategoryForMainPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                categoryNameForHeader={elem.main_category}
                categoryNameStrForHandler={elem.main_category}
                categoryImage={elem.image}
                key={elem._id}
              ></CategoryForMainPage>
            )
          }
        }): <LoadingCard></LoadingCard>}
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
