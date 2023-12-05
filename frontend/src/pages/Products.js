import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../shared/ProductCard";
import Filter from "../shared/Filter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useSearchParams } from "react-router-dom";
const { getProducts, getSearchResults } = require("../shared/utils");

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-height: 100vh;
  margin-top: 80px;
  padding-right: 16px;
  padding-left: 16px;
`;

const Back = styled.span`
  cursor: pointer;
  margin: 10px;
  width: 100%;
  text-decoration: underline;
  color: gray;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100%;
`;

const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-family: "Inter", sans-serif;
`;

const ProductsCounter = styled.span`
  width: 100%;
  display: flex;
  color: gray;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  min-height: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  border: 1px solid rgba(229, 229, 229, 0.16);
  overflow: hidden;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  background-color: rgb(48, 48, 48);
  padding: 16px;
`;

const SearchButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: rgb(90 90 90);
`;

const FilterOpenContainer = styled.div`
display: flex;
  margin-top: 16px;
  width: 80%;
`;
const FilterOpenBtn = styled.div`
  cursor: pointer;
  font-family: Bradley Hand;
  font-size: 14px;
  color: gray;
  font-family: "Inter", sans-serif;
  text-decoration: underline;
`;

const ProductsPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState({ min: 0, max: 9999 });
  const { min, max } = price;
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [product, setProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpened, setIsFilterOpened] = useState(true);

  const getData = async () => {
    const products = await getProducts(category);
    return products;
  };

  const searchProduct = () => {
    if (searchValue) {
      searchParams.set("searchQ", searchValue);
    }
    const searchQ = searchParams.get("searchQ");
    console.log(searchQ);
    getSearchResults(searchValue || searchQ, category).then((res) => {
      const { data } = res;
      const { success } = data;
      if (!success) {
        const { message } = data;
        alert(message);
        return;
      }
      const { foundProducts } = data;
      console.log(foundProducts);
      setProduct(foundProducts);
      localStorage.setItem("searchQ", JSON.stringify({ value: searchQ }));
    });
    navigate(`/products?${searchParams.toString()}`);
  };
  useEffect(() => {
    if (!searchParams.get("searchQ")) {
      getData().then((products) => {
        setProduct(products);
        window.scrollTo(0, 0);
      });
    } else {
      searchProduct();
      setSearchValue(searchParams.get("searchQ"));
    }
  }, []);

  return (
    <Container>
      <Back onClick={() => navigate(`/categories`)}>
        {'<- Back to "Categories"'}
      </Back>
      <H1>{category}</H1>
      <SearchContainer>
        <SearchInput
          id="search_input"
          placeholder="Black sofa..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></SearchInput>
        <SearchButton id="search_button" onClick={searchProduct}>Search</SearchButton>
      </SearchContainer>
      <FilterOpenContainer>
        <FilterOpenBtn onClick={() => setIsFilterOpened(!isFilterOpened)}>Filter by price</FilterOpenBtn>
      </FilterOpenContainer>
      {isFilterOpened && <Filter setPrice={setPrice}></Filter>}
      {/* <SkeletonContainer>
          <Skeleton
            style={{ margin: "10px" }}
            count={15}
            width={210}
            height={350}
            borderRadius={10}
            inline={true}
          ></Skeleton>
        </SkeletonContainer> */}
      {!product ? (
        <SkeletonContainer>
          <Skeleton
            style={{ margin: "10px", marginTop: "50px" }}
            count={15}
            width={210}
            height={350}
            borderRadius={10}
            inline={true}
          ></Skeleton>
        </SkeletonContainer>
      ) : (
        <CardsContainer>
          <ProductsCounter>
            {"Found " +
              product.filter((elem) => elem.price > min && elem.price < max)
                .length +
              (product.filter((elem) => elem.price > min && elem.price < max)
                .length > 1
                ? " results:"
                : " result:")}
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
              );
            })}
        </CardsContainer>
      )}
    </Container>
  );
};

export default ProductsPage;
