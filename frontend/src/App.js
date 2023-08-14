import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Footer from "./Footer/Footer";
import styled from "styled-components";
import { Routes, Route, useSearchParams } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import Header from "./Header/Header";
import useSignUp from "./shared/useSignUp";
import CategoriesPage from "./Pages/CategoriesPage/Categories";
import Authorization from "./shared/Authorization";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 100%;
`;

const Button = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  bottom: ${({ scroll }) => (scroll ? "3rem" : "-10rem")};
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 1rem;
  position: fixed;
  right: 5rem;
  transition: 0.2s all ease-in-out;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  border: none;
  @media (max-width:480px) {
    right: 1rem;
  }
`;

function App() {
  const { isOpened, open, close } = useSignUp(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
  });
  const [token, setToken] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [scroll, setScroll] = useState(0);
  const [isOpenedMenu, setIsopenedMenu] = useState(false);
  const handleScroll = () => {
    setScroll(window.scrollY);
    if (window.scrollY) {
      setScroll(true);
      setIsopenedMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Header
        setIsSignIn={setIsSignIn}
        isOpened={isOpened}
        open={open}
        close={close}
        user={user}
        setUser={setUser}
        isOpenedMenu={isOpenedMenu}
        setIsopenedMenu={setIsopenedMenu}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            ></HomePage>
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoriesPage
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            ></CategoriesPage>
          }
        />
        <Route path="/products/:product_id" element={<ProductPage />} />
      </Routes>
      <Footer />
      <Authorization
        isSignIn={isSignIn}
        isOpened={isOpened}
        close={close}
        setUser={setUser}
        setToken={setToken}
      ></Authorization>
      <Button scroll={scroll} onClick={() => window.scrollTo(0, 0)}>
        Go Up
      </Button>
    </Container>
  );
}

export default App;
