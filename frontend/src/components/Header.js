import styled from 'styled-components'
import logo from '../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import burgerImg from '../images/icons/Icon-Burger-menu.png'
import ligthImg from '../images/icons/sunny-outline.svg'
import darkImg from '../images/icons/moon-outline.svg'

const OuterContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 80px;
  z-index: 2;
  top: 0;
  backdrop-filter: blur(5px);
  @media (max-width: 480px) {
    height: 60px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1024px;
  width: 100%;
  height: 100%;
`

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  width: 200px;
`
const Logo = styled.img`
  width: 100%;
`

const BtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
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
`

const BtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60%;
  background-color: #afb7b6;
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
`
const TextBtn = styled.div`
  font-size: 16px;
  font-weight: 1000;
  color: white;
  @media (max-width: 480px) {
    transition: font-size;
    font-size: ${({ isOpenedMenu }) => (isOpenedMenu ? '10px' : '0')};
  }
`

const UserBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 100%;
`

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
`

const UserFullname = styled.span`
  color: #f2f3f4;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 140%;
`

const LogoutBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50%;
  border-radius: 10px;
`
const LogoutImg = styled.img`
  width: 100%;
`

const NavMenu = styled.nav`
  cursor: pointer;
  display: flex;
  width: 500px;
  height: 100%;
  @media (max-width: 480px) {
    transition: height 0.5s;
    flex-direction: column;
    position: absolute;
    width: 100%;
    ${({ isOpenedMenu }) =>
      isOpenedMenu
        ? `
      height:120px;
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
`

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
`

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

const BurgerBtn = styled.img`
  filter: invert(100%);
`

const SwitchThemeBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid white;
  transition: opacity 0.3s;
  background-color: gray;
  padding: 2px;
  @media (max-width: 480px) {
    position: absolute;
    width: 35px;
    height: 20px;
    top: 70px;
    left: 80%;
    opacity: ${({ isOpenedMenu }) => (isOpenedMenu ? '1' : '0')};
  }
`

const SwitchImg = styled.img`
  width: 50%;
`

const Switcher = styled.div`
  position: absolute;
  transition: transform 0.3s;
  ${({ theme }) =>
    theme === 'dark'
      ? `
    transform: translateX(100%);
    background-color: #121212;
  `
      : `
    transform: 0;
    background-color: white;
  `}
  width: 33px;
  height: 33px;
  border-radius: 50%;
  @media (max-width: 480px) {
    width: 13px;
    height: 13px;
  }
`

const Header = ({
  open,
  user,
  setUser,
  userInit,
  isOpenedMenu,
  setIsopenedMenu,
  theme,
  switchTheme,
}) => {
  const navigate = useNavigate()

  return (
    <OuterContainer>
      <Container>
        <LogoContainer onClick={() => navigate(`/`)}>
          <Logo alt='' src={logo}></Logo>
        </LogoContainer>
        <NavMenu isOpenedMenu={isOpenedMenu}>
          <NavBtn
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/`)
              window.scrollTo(0, 0)
              setIsopenedMenu(false)
            }}
          >
            Main page
          </NavBtn>
          <NavBtn
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/categories`)
              window.scrollTo(0, 0)
              setIsopenedMenu(false)
            }}
          >
            Categories
          </NavBtn>
          <NavBtn isOpenedMenu={isOpenedMenu} href='#'>
            Contacts
          </NavBtn>
        </NavMenu>
        <BtnsContainer isOpenedMenu={isOpenedMenu}>
          {user && user.email ? (
            <>
              <UserBtnContainer>
                <UserImgBtn>{user.name[0] + ' ' + user.surname[0]}</UserImgBtn>
                <UserFullname>{user.name + ' ' + user.surname}</UserFullname>
              </UserBtnContainer>
              <LogoutBtn onClick={() => setUser(userInit)}>
                <LogoutImg src='https://cdn-icons-png.flaticon.com/512/152/152534.png'></LogoutImg>
              </LogoutBtn>
            </>
          ) : (
            <>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(false)
                  setIsopenedMenu(false)
                }}
              >
                <TextBtn isOpenedMenu={isOpenedMenu}>Sign Up</TextBtn>
              </BtnContainer>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(true)
                  setIsopenedMenu(false)
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
        <SwitchThemeBtn onClick={switchTheme} isOpenedMenu={isOpenedMenu}>
          <SwitchImg src={ligthImg}></SwitchImg>
          <SwitchImg src={darkImg}></SwitchImg>
          <Switcher isOpenedMenu={isOpenedMenu} theme={theme}></Switcher>
        </SwitchThemeBtn>
      </Container>
    </OuterContainer>
  )
}

export default Header
