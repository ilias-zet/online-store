import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderSearch from "./HeaderSearch";
import logo from "./images/Logo.png";
import burger_button from "./images/icons/Icon-Burger-menu.png";
import soundWaves from "./images/Sound waves.png";
import closeImg from "./images/icons/Icon-Close.png";
import headerBG from "./images/header-bg.png";

// const HeaderContainer = styled.div`
// display:flex;
// align-items: center;
// width: 100%;
// background-color: rgb(80, 75, 115);
// height: 80px;
// `
// const HeaderLogo = styled.a`
// display:flex;
// justify-content:center;
// align-items:center;
// width: 100px;
// /* background-color: white; */
// height: 60px;
// font-size: 20px;
// font-style: consola;
// text-decoration:none;
// margin-left: 20px;
// background-image: url("https://www.thecloudkeeper.io/wp-content/uploads/2018/04/somelogo.png");
// background-size: 100%;
// background-repeat: no-repeat;
// background-position: center;
// `

const HeaderBlock = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  
    box-sizing: border-box;
    height: 100vh;
    padding: 64px 120px;
    background-image: url(${headerBG});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const HeaderTop = styled.h1`
    display: flex;
    justify-content: space-between;
`
const HeaderTitle = styled.header`
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 48px;
    line-height: 100%;
    font-style: italic;
    font-weight: 800;
    letter-spacing: -1.5px;
`
const OpenAndCloseImgs = styled.img`
    cursor: pointer;
`

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transform: translateX(${(props) => props.pos ? "-0%" : "-100%"});
  transition: transform 500ms;
  box-sizing: border-box;
  height: 100vh;
  padding: 64px 120px;
  background: #e5e5e5;
`

const Nav = styled.nav`
display: flex;
flex-direction: column;
gap: 25px;
margin-top: 40px;
`

const NavA = styled.a`
text-decoration: none;
color: black;
font-size: 20px;
font-weight: 1000;
width: 200px;
&:hover {
  color: gray;
}
`

const Header = ({ setMainPageHeader }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <HeaderBlock>
        <HeaderTop>
          <img src={logo} alt="Bose logo"></img>
          {/* <a href="#menu"> */}
          <OpenAndCloseImgs
            src={burger_button}
            alt="Burger menu"
            onClick={(e) => setIsOpened(true)}
          ></OpenAndCloseImgs>
          {/* </a> */}
        </HeaderTop>

        <div className="header__bottom">
          <img src={soundWaves} alt="Sound waves"></img>

          <HeaderTitle>
            The world shades.
            <br></br>
            Your music shines.
          </HeaderTitle>
        </div>
      </HeaderBlock>

      <Menu pos={isOpened}>
        <div className="menu__top">
          <img src={logo} alt="Bose logo"></img>
          {/* <a href="#home"> */}
          <OpenAndCloseImgs
            src={closeImg}
            alt="Close"
            onClick={(e) => setIsOpened(false)}
          ></OpenAndCloseImgs>
          {/* </a> */}
        </div>

        <Nav>
          <NavA href="/main-page" onClick={() => setMainPageHeader(true)}>
            Home
          </NavA>
          <NavA href="#recommended">
            Recommended
          </NavA>
          <NavA href="#categories">
            Categories
          </NavA>
          <NavA href="#how-to-buy">
            How to buy
          </NavA>
        </Nav>
      </Menu>
    </>
  );
};

export default Header;
