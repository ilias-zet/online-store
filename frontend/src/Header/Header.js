import React from "react";
import styled from "styled-components";
import logo from "./images/Logo.png";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 0;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 80px;
  background-color: rgb(0, 0, 0, 0.54);
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  /* justify-content: center; */
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
  /* background-color: white; */
`;

const SignUpLogInBtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60%;
  background-color: black;
  border: 2px solid gray;
  border-radius: 10px;
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
  /* background-color: white; */
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
font-family: 'Inter', sans-serif;
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
/* background-color: white; */
`

const Ul = styled.ul`
display: flex;
width: 100%;
height: 100%;
margin: 0;
`

const LiLeft = styled.li`
display: flex;
list-style-type: none;
justify-content: center;
align-items: center;
height: 100%;
width: 33%;
border-right: 1px solid gray;
border-left: 2px solid gray;
`
const LiCenter = styled.li`
display: flex;
justify-content: center;
align-items: center;
list-style-type: none;
height: 100%;
width: 33%;
border-right: 1px solid gray;
border-left: 1px solid gray;
`
const LiRight = styled.li`
display: flex;
justify-content: center;
align-items: center;
list-style-type: none;
height: 100%;
width: 33%;
border-right: 2px solid gray;
border-left: 1px solid gray;
`

const A = styled.a`
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
color: white;
height: 100%;
width: 100%;
transition: all 0.2s;
&:hover {
  background-color: rgb(0,0,0,0.5);
}
`

const HeaderWithSearch = ({
  isOpened,
  open,
  close,
  loginedUser,
  setLoginedUser,
}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/main-page`);
  };

  const clickHandlerForSignUp = () => {
    open();
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => clickHandler()}>
        <Logo alt="" src={logo}></Logo>
      </LogoContainer>
      <NavMenu>
        <Ul>
          <LiLeft>
            <A href="/main-page">Main page</A>
          </LiLeft>
          <LiCenter>
            <A href="/all-categories">Categories</A>
          </LiCenter>
          <LiRight>
            <A href="#">Contacts</A>
          </LiRight>
        </Ul>
      </NavMenu>
      <BtnsContainer>
        {loginedUser ? (
          <>
            <UserBtnContainer>
              <UserImgBtn>
                {loginedUser.name[0] + " " + loginedUser.surName[0]}
              </UserImgBtn>
              <UserFullname>
                {loginedUser.name + " " + loginedUser.surName}
              </UserFullname>
            </UserBtnContainer>
            <LogoutBtn onClick={() => setLoginedUser(null)}>
              <LogoutImg src="https://cdn-icons-png.flaticon.com/512/152/152534.png"></LogoutImg>
            </LogoutBtn>
          </>
        ) : (
          <>
            <SignUpLogInBtnContainer onClick={() => clickHandlerForSignUp()}>
              <TextSignUpLogInBtn>Sign Up</TextSignUpLogInBtn>
            </SignUpLogInBtnContainer>
            <SignUpLogInBtnContainer>
              <TextSignUpLogInBtn>Log In</TextSignUpLogInBtn>
            </SignUpLogInBtnContainer>
          </>
        )}
      </BtnsContainer>
    </HeaderContainer>
  );
};

export default HeaderWithSearch;
