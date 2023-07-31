import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import MensClothingCategoryImg from "../Images/CategoriesImages/Mens_clothing.webp";
import MensFootWearImg from "../Images/CategoriesImages/Mens_shoes.webp";
import WomensClothingCategoryImg from "../Images/CategoriesImages/Womens_clothing.webp";
import ElectronicsCategoryImg from "../Images/CategoriesImages/Electronic.webp";
import VideoGamesCategoryImg from "../Images/CategoriesImages/Video_games.png"
import PetsCategoryImg from "../Images/CategoriesImages/Pets.png"
import MoviesMusicAndBooksCategoryImg from "../Images/CategoriesImages/Movies_music_and_books.png"
import Baby from "../Images/CategoriesImages/Baby.jpg"
import Beauty from "../Images/CategoriesImages/Beauty.webp"
import BlackBeyondMeasure from "../Images/CategoriesImages/Black Beyond Measure.jpg"
import BullseyesPlayground from "../Images/CategoriesImages/Bullseye's Playground.jpg"
import CharacterShop from "../Images/CategoriesImages/Character Shop.webp"
import FeaturedBrands from "../Images/CategoriesImages/Featured Brands.png"
import Furniture from "../Images/CategoriesImages/Furniture.avif"
import GiftIdeas from "../Images/CategoriesImages/Gift Ideas.jpg"
import Grocery from "../Images/CategoriesImages/Grocery.png"
import Health from "../Images/CategoriesImages/Health.png"
import HolidayShop from "../Images/CategoriesImages/Holiday Shop.jpg"
import Home from "../Images/CategoriesImages/Home.webp"
import HouseholdEssentials from "../Images/CategoriesImages/Household Essentials.png"
import Kids from "../Images/CategoriesImages/Kids.jpg"
import KitchenDining from "../Images/CategoriesImages/Kitchen & Dining.jpg"
import MusicalInstruments from "../Images/CategoriesImages/Musical Instruments.jpeg"
import PartySupplies from "../Images/CategoriesImages/Party Supplies.jpg"
import PatioGarden from "../Images/CategoriesImages/Patio & Garden.jpg"
import PersonalCare from "../Images/CategoriesImages/Personal Care.jpg"
import SchoolOfficeSupplies from "../Images/CategoriesImages/School & Office Supplies.jpg"
import Shoes from "../Images/CategoriesImages/Shoes.jpg"
import SportsOutdoors from "../Images/CategoriesImages/Sports & Outdoors.jpg"
import TopDeals from "../Images/CategoriesImages/Top Deals.jpg"
import Toys from "../Images/CategoriesImages/Toys.jpg"
import WaystoShop from "../Images/CategoriesImages/Ways to Shop.webp"

const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 250px;
  margin: 10px;
`;

const ImgContainer = styled.div`
display: block;
width: 100%;
height: 180px;
overflow: hidden;
`

const CategoryImage = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const CategoryNameA = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 200px;
  background-color: white;
  text-decoration: none;
  color: black;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const CategoryForMainPage = ({
  searchParams,
  setSearchParams,
  categoryNameStrForHandler,
  categoryNameForHeader,
}) => {
  const navigate = useNavigate();
  let categoryImg;

  switch (categoryNameStrForHandler) {
    case "Baby":
      categoryImg = Baby;
      break;
    case "Beauty":
      categoryImg = Beauty;
      break;
    case "Black Beyond Measure":
      categoryImg = BlackBeyondMeasure;
      break;
    case "Bullseye's Playground":
      categoryImg = BullseyesPlayground;
      break;
    case "Character Shop":
      categoryImg = CharacterShop;
      break;
    case "Electronics":
      categoryImg = ElectronicsCategoryImg;
      break;
    case "Featured Brands":
      categoryImg = FeaturedBrands;
      break;
    case "Furniture":
      categoryImg = Furniture;
      break;
    case "Gift Ideas":
      categoryImg = GiftIdeas;
      break;
    case "Grocery":
      categoryImg = Grocery;
      break;
    case "Health":
      categoryImg = Health;
      break;
    case "Holiday Shop":
      categoryImg = HolidayShop;
      break;
    case "Home":
      categoryImg = Home;
      break;
    case "Household Essentials":
      categoryImg = HouseholdEssentials;
      break;
    case "Kids":
      categoryImg = Kids;
      break;
    case "Kitchen & Dining":
      categoryImg =  KitchenDining;
      break;
    case "Men":
      categoryImg =  MensClothingCategoryImg;
      break;
    case "Movies, Music & Books":
      categoryImg =  MoviesMusicAndBooksCategoryImg;
      break;
    case "Musical Instruments":
      categoryImg =  MusicalInstruments;
      break;
    case "Party Supplies":
      categoryImg = PartySupplies;
      break;
    case "Patio & Garden":
      categoryImg =  PatioGarden;
      break;
    case "Personal Care":
      categoryImg =  PersonalCare;
      break;
    case "Pets":
      categoryImg =  PetsCategoryImg;
      break;
    case "School & Office Supplies":
      categoryImg = SchoolOfficeSupplies;
      break;
    case "Shoes":
      categoryImg =  Shoes;
      break;
    case "Sports & Outdoors":
      categoryImg =  SportsOutdoors;
      break;
    case "Top Deals":
      categoryImg =  TopDeals;
      break;
    case "Toys":
      categoryImg = Toys;
      break;
    case "Video Games":
      categoryImg = VideoGamesCategoryImg;
      break;
    case "Ways to Shop":
      categoryImg = WaystoShop;
      break;
    case "Women":
      categoryImg = WomensClothingCategoryImg;
      break;
  }

  const productFilterHandler = (e, category) => {
    e.preventDefault();
    searchParams.set("category", category);
    setSearchParams(searchParams);
    navigate(`/products?${searchParams.toString()}`);
    console.log(searchParams.get("category"));
  };
  return (
    <Category
      onClick={(e) => productFilterHandler(e, categoryNameStrForHandler)}
    >
      <ImgContainer>
        <CategoryImage src={categoryImg} alt=""></CategoryImage>
      </ImgContainer>
      <CategoryNameA>{categoryNameForHeader}</CategoryNameA>
    </Category>
  );
};

export default CategoryForMainPage;
