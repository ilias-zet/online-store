import styled from "styled-components";
import telImg from "../images/icons/telephone.png";
import tgImg from "../images/icons/telegram.png";
import gmailImg from "../images/icons/gmail.png";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(18 18 18);
  height: 230px;
  margin-top: 64px;
  border-top: 1px solid rgba(229, 229, 229, 0.16);
  width: 100%;
`;

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  height: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 33%;
  height: 100%;
`;

const NavTitle = styled.div`
  font-size: 20px;
`;

const NavBtn = styled.div`
  cursor: pointer;
  color: gray;
  padding: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px;
`;

const ContactImg = styled.img`
  height: 100%;
  padding: 4px;
`;

const ContactInfo = styled.div`
  cursor: pointer;
  color: gray;
  padding: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <OuterContainer>
      <FooterContainer>
        <NavContainer>
          <NavTitle>Menu</NavTitle>
          <NavBtn>Home</NavBtn>
          <NavBtn>Categories</NavBtn>
          <NavBtn>Cart</NavBtn>
        </NavContainer>
        <NavContainer>
          <NavTitle>Contact us</NavTitle>
          <ContactContainer>
            <ContactImg src={telImg} alt="tel"></ContactImg>
            <ContactInfo>+380660000000</ContactInfo>
          </ContactContainer>
          <ContactContainer>
            <ContactImg src={gmailImg} alt="mail"></ContactImg>
            <ContactInfo>admin@gmail.com</ContactInfo>
          </ContactContainer>
          <ContactContainer>
            <ContactImg src={tgImg} alt="tg"></ContactImg>
            <ContactInfo>@online_store_admin</ContactInfo>
          </ContactContainer>
        </NavContainer>
        <NavContainer></NavContainer>
      </FooterContainer>
    </OuterContainer>
  );
};

export default Footer;
