import styled from "styled-components";
import logo from "../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

const OuterContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 80px;
  z-index: 1;
  top: 0;
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
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  width: 200px;
`;
const Logo = styled.img`
  width: 100%;
`;

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
    transform: ${({ isOpenedMenu }) =>
      isOpenedMenu ? "translateY(0%)" : "translateY(-100%)"};
    height: ${({ isOpenedMenu }) => (isOpenedMenu ? "40px" : "0")};
    opacity: ${({ isOpenedMenu }) => (isOpenedMenu ? "1" : "0")};
  }
`;

const BtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60%;
  background-color: #7f8377;
  border-radius: 4px;
  margin: 10px;
  @media (max-width: 480px) {
    transition: all 0.5s;
    width: 60px;
    height: ${({ isOpenedMenu }) => (isOpenedMenu ? "50%" : "0")};
    opacity: ${({ isOpenedMenu }) => (isOpenedMenu ? "1" : "0")};
  }
`;
const TextBtn = styled.div`
  font-size: 16px;
  font-weight: 1000;
  color: white;
  @media (max-width: 480px) {
    transition: font-size;
    font-size: ${({ isOpenedMenu }) => (isOpenedMenu ? "10px" : "0")};
  }
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
  cursor: pointer;
  display: flex;
  width: 500px;
  height: 100%;
  @media (max-width: 480px) {
    transition: height 0.5s;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: ${({ isOpenedMenu }) => (isOpenedMenu ? "100px" : "0")};
    top: 60px;
    left: auto;
    padding-top: ${({ isOpenedMenu }) => (isOpenedMenu ? "40px" : "0")};
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
    font-size: ${({ isOpenedMenu }) => (isOpenedMenu ? "10px" : "0")};
    opacity: ${({ isOpenedMenu }) => (isOpenedMenu ? "1" : "0")};
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

const BurgerBtn = styled.svg`
  filter: invert(100%);
`;

const Header = ({ open, user, setUser,userInit, isOpenedMenu, setIsopenedMenu }) => {
  const navigate = useNavigate();

  return (
    <OuterContainer>
      <Container>
        <LogoContainer onClick={() => navigate(`/`)}>
          <Logo alt="" src={logo}></Logo>
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
            Main page
          </NavBtn>
          <NavBtn
            isOpenedMenu={isOpenedMenu}
            onClick={() => {
              navigate(`/categories`);
              window.scrollTo(0, 0);
              setIsopenedMenu(false);
            }}
          >
            Categories
          </NavBtn>
          <NavBtn isOpenedMenu={isOpenedMenu} href="#">
            Contacts
          </NavBtn>
        </NavMenu>
        <BtnsContainer isOpenedMenu={isOpenedMenu}>
          {user && user.email ? (
            <>
              <UserBtnContainer>
                <UserImgBtn>{user.name[0] + " " + user.surname[0]}</UserImgBtn>
                <UserFullname>{user.name + " " + user.surname}</UserFullname>
              </UserBtnContainer>
              <LogoutBtn onClick={() => setUser(userInit)}>
                <LogoutImg src="https://cdn-icons-png.flaticon.com/512/152/152534.png"></LogoutImg>
              </LogoutBtn>
            </>
          ) : (
            <>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(false);
                  setIsopenedMenu(false);
                }}
              >
                <TextBtn isOpenedMenu={isOpenedMenu}>Sign Up</TextBtn>
              </BtnContainer>
              <BtnContainer
                isOpenedMenu={isOpenedMenu}
                onClick={() => {
                  open(true);
                  setIsopenedMenu(false);
                }}
              >
                <TextBtn isOpenedMenu={isOpenedMenu}>Log In</TextBtn>
              </BtnContainer>
            </>
          )}
        </BtnsContainer>
        <BurgerBtnContainer
          onClick={() =>  setIsopenedMenu(prev => !prev)}
        >
          {isOpenedMenu ? (
            <BurgerBtn
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M368 368L144 144M368 144L144 368"
              />
            </BurgerBtn>
          ) : (
            <BurgerBtn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M80 160h352M80 256h352M80 352h352"
              />
            </BurgerBtn>
          )}
        </BurgerBtnContainer>
      </Container>
    </OuterContainer>
  );
};

export default Header;
