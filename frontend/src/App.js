import React, { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Footer from "./Footer/Footer";
import styled from "styled-components";
import { Routes, Route, useSearchParams } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import Header from "./Header/Header";
import SignUp from "./shared/SignUp";
import useSignUp from "./shared/useSignUp";
import useLogin from "./shared/useLogin";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import Login from "./shared/Login";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
min-height: 100%;
width: 100%;
`

function App() {
  const { isOpened, open, close } = useSignUp(false);
  const { isOpenedLogin, openLogin, closeLogin } = useLogin(false);
  const [user, setUser] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <Header
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
      <SignUp
        isOpened={isOpened}
        open={open}
        close={close}
        user={user}
        setUser={setUser}
      ></SignUp>
      <Login
        isOpenedLogin={isOpenedLogin}
        openLogin={openLogin}
        closeLogin={closeLogin}
        user={user}
        setUser={setUser}
      ></Login>
    </Container>
  );
}

export default App;
