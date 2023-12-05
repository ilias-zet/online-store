import styled from "styled-components";
import logo from "../images/Logo.png";
import { useNavigate } from "react-router-dom";
import burgerImg from "../images/icons/Icon-Burger-menu.png";

import { useEffect } from "react";
import { saveCart } from "../shared/utils";

import homeImg from "../images/icons/home.png";
import cartImg from "../images/icons/cart.png";
import categoriesImg from "../images/icons/categories.png";
import logoutImg from "../images/icons/logout.png";
import { useState } from "react";

const OuterContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(65 65 65 / 70%);
  width: 100%;
  height: 52px;
  z-index: 1;
  top: 0;
  border-bottom: 1px solid rgba(229, 229, 229, 0.16);
  backdrop-filter: blur(5px);
  @media (max-width: 480px) {
    height: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1024px;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  height: 100%;
  width: 200px;
  padding: 8px;
`;
const Logo = styled.img`
  cursor: pointer;
  height: 100%;
`;

const BtnsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100%;
  @media (max-width: 480px) {
    width: 100%;
    position: absolute;
    top: 60px;
    transition: all 0.3s;
    ${({ isOpenedMenu }) =>
      isOpenedMenu
        ? `
      transform: translateY(0%);
      height:40px;
      opacity:1;
    `
        : `
      transform: translateY(-100%);
      height:0;
      opacity:0;
    `}
  }
`;

const BtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60%;
  border: 1px solid rgba(229, 229, 229, 0.16);
  background-color: rgb(40 40 40);
  border-radius: 4px;
  margin: 10px;
  @media (max-width: 480px) {
    transition: all 0.5s;
    width: 60px;
    ${({ isOpenedMenu }) =>
      isOpenedMenu
        ? `
      height:50%;
      opacity:1;
    `
        : `
      height:0;
      opacity:0;
    `}
  }
`;
const TextBtn = styled.div`
  @media (max-width: 480px) {
    transition: font-size;
    font-size: ${({ isOpenedMenu }) => (isOpenedMenu ? "10px" : "0")};
  }
`;
const DropdownContainer = styled.div`
  position: absolute;
  display: ${({ isOpenedUserMenu }) => (isOpenedUserMenu ? "flex" : "none")};
  flex-direction: column;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  background-color: rgba(65, 65, 65, 0.9);
  border: 1px solid rgba(229, 229, 229, 0.16);
  border-top: none;
  @media (max-width: 480px) {
    height: 200px;
  }
`;

const ButtonInMenu = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 52px;
  transition: all 0.5s;
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
  }
`;

const UserInfo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  padding: 8px;
  text-overflow: ellipsis;
  transition: all 0.5s;
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
  }
`;

const NavMenu = styled.nav`
  cursor: pointer;
  display: flex;
  width: 70%;
  height: 100%;
  @media (max-width: 480px) {
    transition: height 0.5s;
    flex-direction: column;
    position: absolute;
    width: 100%;
    ${({ isOpenedMenu }) =>
      isOpenedMenu
        ? `
      height:220px;
      padding-top:40px;
    `
        : `
      height:0;
      padding-top:0;
    `}
    top: 60px;
    left: auto;
    backdrop-filter: blur(5px);
    background-color: rgb(0, 0, 0, 0.7);
    z-index: -1;
  }
`;

const NavBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  height: 100%;
  width: 100%;
  transition: all 0.5s;
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 480px) {
    ${({ isOpenedMenu }) =>
      isOpenedMenu
        ? `
      font-size:10px;
      opacity:1;
    `
        : `
      font-size:0;
      opacity:0;
    `}
  }
`;

const BurgerBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 30px;
  @media (min-width: 480px) {
    display: none;
  }
`;

const BurgerBtn = styled.img`
  filter: invert(100%);
`;

const Header = ({
  open,
  user,
  setUser,
  userInit,
  isOpenedMenu,
  setIsopenedMenu,
}) => {
  const [isOpenedUserMenu, setIsOpenedUserMenu] = useState(false);
  const navigate = useNavigate();
  const resetUser = () => {
    localStorage.setItem("token", JSON.stringify({ value: "0" }));
    setUser(userInit);
  };
  function findScrollableElement() {
    // Проверяем, есть ли вертикальный скролл у текущего элемента
    function hasVerticalScrollBar(element) {
      return element.scrollHeight > element.clientHeight;
    }
  
    // Получаем все элементы на странице
    var allElements = document.querySelectorAll('*');
  
    // Ищем элемент с вертикальным скроллом
    for (var i = 0; i < allElements.length; i++) {
      if (hasVerticalScrollBar(allElements[i])) {
        return allElements[i];
      }
    }
  
    // Если не нашли элемент с вертикальным скроллом
    return null;
  }
  
  // Используем функцию
  var scrollableElement = findScrollableElement();
  console.log(scrollableElement);
  return (
    <OuterContainer>
      <Container>
        <LogoContainer>
          <Logo onClick={() => navigate(`/`)} alt="" src={logo}></Logo>
        </LogoContainer>
        <NavMenu isOpenedMenu={isOpenedMenu}>
          <NavBtn
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/`);
              window.scrollTo(0, 0);
              setIsopenedMenu(false);
            }}
          >
            <img alt="" src={homeImg} height={"50%"}></img>
          </NavBtn>
          <NavBtn
            id="nav-to-categories"
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/categories`);
              window.scrollTo(0, 0);
              setIsopenedMenu(false);
            }}
          >
            <img alt="" src={categoriesImg} height={"50%"}></img>
          </NavBtn>
          <NavBtn
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/cart`);
              window.scrollTo(0, 0);
              setIsopenedMenu(false);
            }}
          >
            <img alt="" src={cartImg} height={"50%"}></img>
          </NavBtn>
        </NavMenu>
        <BtnsContainer isOpenedMenu={isOpenedMenu}>
          {user && user.email ? (
            <>
              <UserInfo onClick={() => setIsOpenedUserMenu(!isOpenedUserMenu)}>
                {user.email}
              </UserInfo>
              <DropdownContainer isOpenedUserMenu={isOpenedUserMenu}>
                <ButtonInMenu
                  onClick={() => {
                    setIsOpenedUserMenu(false);
                    navigate(`/profile/${user._id}`);
                  }}
                >
                  Profile
                </ButtonInMenu>
                <ButtonInMenu
                  onClick={() => {
                    setIsOpenedUserMenu(false);
                    navigate(`/chat/${user._id}`);
                  }}
                >
                  Chat
                </ButtonInMenu>
                <ButtonInMenu
                  onClick={() => {
                    setIsOpenedUserMenu(false);
                    navigate("/");
                    saveCart(user).then((res) => {
                      if (res) {
                        console.log(res);
                        resetUser();
                      }
                    });
                  }}
                >
                  Exit
                </ButtonInMenu>
              </DropdownContainer>
            </>
          ) : (
            <>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(false);
                  setIsopenedMenu(false);
                  document.documentElement.style.overflow = 'hidden';
                }}
              >
                <TextBtn isOpenedMenu={isOpenedMenu}>Sign Up</TextBtn>
              </BtnContainer>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(true);
                  setIsopenedMenu(false);
                  document.documentElement.style.overflow = 'hidden';
                }}
              >
                <TextBtn isOpenedMenu={isOpenedMenu}>Log In</TextBtn>
              </BtnContainer>
            </>
          )}
        </BtnsContainer>
        <BurgerBtnContainer onClick={() => setIsopenedMenu((prev) => !prev)}>
          {isOpenedMenu ? (
            <BurgerBtn src={burgerImg}></BurgerBtn>
          ) : (
            <BurgerBtn src={burgerImg}></BurgerBtn>
          )}
        </BurgerBtnContainer>
      </Container>
    </OuterContainer>
  );
};

export default Header;
