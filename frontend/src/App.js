import React, { useState } from "react";
import "./App.css";
import Body from "./Pages/MainBody/MainBody";
import Footer from "./Footer/Footer";

import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import MainCagetoryPage from "./Pages/MainCategoryPage";
import OpenedProductCard from "./Pages/OpenedProductCard";
import Header from "./Header/Header";
import SignUp from "./shared/SignUp";
import useSignUp from "./shared/useSignUp";
import useLogin from "./shared/useLogin";
import PageWithCategories from "./Pages/PageWithCategories/PageWithCategories"
import Login from "./shared/Login";

function App() {
  const { isOpened, open, close } = useSignUp(false);
  const { isOpenedLogin, openLogin, closeLogin } = useLogin(false);
  const [loginedUser, setLoginedUser] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
        <Header
          isOpened={isOpened}
          open={open}
          close={close}
          isOpenedLogin={isOpenedLogin}
          openLogin={openLogin}
          closeLogin={closeLogin}
          loginedUser={loginedUser}
          setLoginedUser={setLoginedUser}
        ></Header>
      <Routes>
        <Route
          path="/main-page"
          element={
            <Body
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            ></Body>
          }
        />
        <Route
          path="/products"
          element={
            <MainCagetoryPage
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          }
        />
        <Route
          path="/all-categories"
          element={
          <PageWithCategories
            searchParams={searchParams}
            setSearchParams={setSearchParams}>
          </PageWithCategories>}
        />
        <Route path="/products/:product_id" element={<OpenedProductCard />} />
      </Routes>
      <Footer />
      <SignUp
        isOpened={isOpened}
        open={open}
        close={close}
        loginedUser={loginedUser}
        setLoginedUser={setLoginedUser}
      ></SignUp>
      <Login
        isOpenedLogin={isOpenedLogin}
        openLogin={openLogin}
        closeLogin={closeLogin}
        loginedUser={loginedUser}
        setLoginedUser={setLoginedUser}
      ></Login>
    </>
  );
}

export default App;
