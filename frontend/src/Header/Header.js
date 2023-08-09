import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./images/Logo.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 0;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 80px;
  background-color: #4b4449;
  @media (max-width: 480px) {
    height: 60px;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  width: 200px;
`;
const Logo = styled.img`
  display: flex;
  width: 100%;
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100%;
  @media (max-width: 480px) {
    display: none;
  }
`;

const SignUpLogInBtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60%;
  background-color: #7f8377;
  /* border: 2px solid gray; */
  border-radius: 4px;
  margin: 10px;
`;
const TextSignUpLogInBtn = styled.div`
  font-size: 16px;
  font-weight: 1000;
  color: white;
`;

const UserBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 100%;
`;

const UserImgBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  font-size: 24px;
  color: white;
`;

const UserFullname = styled.span`
  color: #f2f3f4;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 140%;
`;

const LogoutBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50%;
  border-radius: 10px;
`;
const LogoutImg = styled.img`
  width: 100%;
`;

const NavMenu = styled.nav`
  display: flex;
  width: 500px;
  height: 100%;
  @media (max-width: 480px) {
    transition: all 0.5s;
    transform: ${(props) => props.isOpenedMenu && !props.scroll ? "translate(-0%)":"translate(100%)"};
    display: flex;
    position: absolute;
    width: 100%;
    height: 100px;
    top: 60px;
    left: auto;
    background-color: rgb(75, 68, 73);
    z-index: 1;
  }
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100% 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const LiLeft = styled.li`
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-right: 1px solid gray;
  border-left: 2px solid gray;
  @media (max-width: 480px) {
    border-top: 2px solid gray;
    border-bottom: 1px solid gray;
  }
`;
const LiCenter = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  height: 100%;
  width: 100%;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  @media (max-width: 480px) {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }
`;
const LiRight = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  height: 100%;
  width: 100%;
  border-right: 2px solid gray;
  border-left: 1px solid gray;
  @media (max-width: 480px) {
    border-top: 1px solid gray;
    border-bottom: 2px solid gray;
  }
`;

const NavBtn = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  height: 100%;
  width: 100%;
  transition: all 0.2s;
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
  }
  @media (max-width: 768px) {
    font-size: 10px;
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
`

const OneBurgerLine = styled.div`
width: 40px;
height: 2px;
background-color: white;
`


const Header = ({ open, openLogin, user, setUser, setIsSignIn,scroll,isOpenedMenu,setIsopenedMenu }) => {
  const navigate = useNavigate();

  
  return (
    <Container>
      <LogoContainer onClick={() => navigate(`/`)}>
        <Logo alt="" src={logo}></Logo>
      </LogoContainer>
      <NavMenu 
      isOpenedMenu={isOpenedMenu}
      scroll={scroll}>
        <Ul>
          <LiLeft>
            <NavBtn onClick={() => navigate(`/`)}>Main page</NavBtn>
          </LiLeft>
          <LiCenter>
            <NavBtn onClick={() => navigate(`/categories`)}>Categories</NavBtn>
          </LiCenter>
          <LiRight>
            <NavBtn href="#">Contacts</NavBtn>
          </LiRight>
        </Ul>
      </NavMenu>
      <BtnsContainer>
        {user && user.email ? (
          <>
            <UserBtnContainer>
              <UserImgBtn>{user.name[0] + " " + user.surname[0]}</UserImgBtn>
              <UserFullname>{user.name + " " + user.surname}</UserFullname>
            </UserBtnContainer>
            <LogoutBtn
              onClick={() =>
                setUser({
                  name: null,
                  surname: null,
                  email: null,
                  password: null,
                })
              }
            >
              <LogoutImg src="https://cdn-icons-png.flaticon.com/512/152/152534.png"></LogoutImg>
            </LogoutBtn>
          </>
        ) : (
          <>
            <SignUpLogInBtnContainer
              onClick={() => {
                setIsSignIn(false);
                open();
              }}
            >
              <TextSignUpLogInBtn>Sign Up</TextSignUpLogInBtn>
            </SignUpLogInBtnContainer>
            <SignUpLogInBtnContainer
              onClick={() => {
                setIsSignIn(true);
                open();
              }}
            >
              <TextSignUpLogInBtn>Log In</TextSignUpLogInBtn>
            </SignUpLogInBtnContainer>
          </>
        )}
      </BtnsContainer>
      <BurgerBtnContainer onClick={() => isOpenedMenu? setIsopenedMenu(false): setIsopenedMenu(true)}>
        <OneBurgerLine></OneBurgerLine>
        <OneBurgerLine></OneBurgerLine>
        <OneBurgerLine></OneBurgerLine>
      </BurgerBtnContainer> 
    </Container>
  );
};

export default Header;
