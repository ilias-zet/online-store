import React, { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Footer from "./Footer/Footer";
import styled from "styled-components";
import { Routes, Route, useSearchParams } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import Header from "./Header/Header";
import useSignUp from "./shared/useSignUp";
import useLogin from "./shared/useLogin";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import Authorization from "./shared/Authorization";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 100%;
`;

function App() {
  const { isOpened, open, close } = useSignUp(false);
  const { isOpenedLogin, openLogin, closeLogin } = useLogin(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
  });
  const [token, setToken] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <Header
        setIsSignIn={setIsSignIn}
        isOpened={isOpened}
        open={open}
        close={close}
        isOpenedLogin={isOpenedLogin}
        openLogin={openLogin}
        closeLogin={closeLogin}
        user={user}
        setUser={setUser}
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
        open={open}
        close={close}
        user={user}
        setUser={setUser}
        isOpenedLogin={isOpenedLogin}
        openLogin={openLogin}
        closeLogin={closeLogin}
        setToken={setToken}
      ></Authorization>
    </Container>
  );
}

export default App;
