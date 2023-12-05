import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Header from "./components/Header";
import useSignUp from "./customHooks/useSignUp";
import CategoriesPage from "./pages/Categories";
import Authorization from "./shared/Authorization";
import Cart from "./pages/Cart";
import BuyProducts from "./shared/BuyProducts";
import { getIsValidToken } from "./shared/utils";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat/Chat";

const OuterContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
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
  flex: 1;
  width: 100%;
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
const userInit = {
  name: "", // String
  surname: "", // String
  email: "", // String
  password: "", // String
  token: "", // String
  cart: [], // Array
};

function App() {
  const { isOpened, open, close, isSignIn } = useSignUp(false);
  const [user, setUser] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [isOpenedMenu, setIsopenedMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    setScroll(window.scrollY);
    if (window.scrollY) {
      setScroll(true);
      setIsopenedMenu(false);
    }
  };

  useEffect(() => {
    console.log("effect")
    const tokenLS = JSON.parse(localStorage.getItem("token"));
    if (!tokenLS) {
      localStorage.setItem("token", JSON.stringify({ value: "0" }));
      setUser(userInit);
      navigate("/");
      return;
    }

    if (tokenLS.value === "0") {
      setUser(userInit);
      return;
    }
  
    if (tokenLS.value !== "0") {
      const fetchUserData = async () => {
        try {
          const res = await getIsValidToken(tokenLS);
          const { data } = res;
          const { success } = data;
  
          if (!success) {
            const { message } = data;
            alert(message);
            setUser(userInit);
            localStorage.setItem("token", JSON.stringify({ value: "0" }));
            return;
          }
  
          const { foundUser } = data;
          setUser(foundUser);
          console.log(foundUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(userInit);
        }
      };
  
      fetchUserData();
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      <Header
        open={open}
        user={user}
        setUser={setUser}
        userInit={userInit}
        isOpenedMenu={isOpenedMenu}
        setIsopenedMenu={setIsopenedMenu}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      ></Header>
      <OuterContainer>
        <Container>
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} setUser={setUser}></HomePage>}
            />
            <Route
              path="/products"
              element={<ProductsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/categories"
              element={<CategoriesPage></CategoriesPage>}
            />
            <Route
              path="/cart"
              element={user && <Cart user={user} setUser={setUser}></Cart>}
            />
            <Route path="/products/:product_id" element={<ProductPage user={user} setUser={setUser} />} />
            <Route
              path="/buy_products_from_cart"
              element={<BuyProducts user={user} setUser={setUser} />}
            />
            <Route
              path="/profile/:user_id"
              element={user && <Profile user={user} setUser={setUser}></Profile>}
            ></Route>
            <Route
              path="/chat/:user_id"
              element={
                user && <Chat
                  user={user}
                  setUser={setUser}
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                ></Chat>
              }
            ></Route>
          </Routes>
          <Button scroll={scroll} onClick={() => window.scrollTo(0, 0)}>
            Go Up
          </Button>
        </Container>
        <Authorization
            isSignIn={isSignIn}
            isOpened={isOpened}
            close={close}
            setUser={setUser}
          ></Authorization>
      </OuterContainer>
      <Footer />
    </>
  );
}

export default App;
