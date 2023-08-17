import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Header from "./components/Header";
import useSignUp from "./shared/useSignUp";
import CategoriesPage from "./pages/Categories";
import Authorization from "./shared/Authorization";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  max-width: 1024px;
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
  @media (max-width: 480px) {
    right: 1rem;
  }
`;

function App() {
  const { isOpened, open, close, isSignIn } = useSignUp(false);
  const [user, setUser] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
  });
  const [token, setToken] = useState(null);
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
    <>
      <Header
        isOpened={isOpened}
        open={open}
        close={close}
        user={user}
        setUser={setUser}
        isOpenedMenu={isOpenedMenu}
        setIsopenedMenu={setIsopenedMenu}
      ></Header>
      <OuterContainer>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/categories"
              element={<CategoriesPage></CategoriesPage>}
            />
            <Route path="/products/:product_id" element={<ProductPage />} />
          </Routes>
          <Authorization
            isSignIn={isSignIn}
            isOpened={isOpened}
            close={close}
            setUser={setUser}
            setToken={setToken}
            scroll={scroll}
          ></Authorization>
          <Button scroll={scroll} onClick={() => window.scrollTo(0, 0)}>
            Go Up
          </Button>
        </Container>
      </OuterContainer>
      <Footer />
    </>
  );
}

export default App;
