import React from "react";
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
`;

const Ul = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const LiLeft = styled.li`
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 33%;
  border-right: 1px solid gray;
  border-left: 2px solid gray;
`;
const LiCenter = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  height: 100%;
  width: 33%;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
`;
const LiRight = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  height: 100%;
  width: 33%;
  border-right: 2px solid gray;
  border-left: 1px solid gray;
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
`;

const Header = ({ open, openLogin, user, setUser, setIsSignIn }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer onClick={() => navigate(`/`)}>
        <Logo alt="" src={logo}></Logo>
      </LogoContainer>
      <NavMenu>
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
    </Container>
  );
};

export default Header;
