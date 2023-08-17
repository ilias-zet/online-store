import styled from "styled-components";
import BGImg from "../assets/footer-bg.png"

const FooterContainer = styled.div`
  width: 100%;
  height: 170px;
  border-top: 1px solid rgb(190, 190, 190);
  z-index: -1;
  height: 230px;
  background-image: url(${BGImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Footer = () => {
  return <FooterContainer></FooterContainer>;
};

export default Footer;
