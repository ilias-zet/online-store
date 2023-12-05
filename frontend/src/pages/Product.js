import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const { getProduct, updateCart } = require("../shared/utils");

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 600px;
  margin-top: 80px;
  padding: 40px;
`;

const InnerContainer = styled.div`
  display: flex;
`;

const Back = styled.span`
  cursor: pointer;
  margin: 10px;
  width: 100%;
  text-decoration: underline;
  color: gray;
`;

const ImgContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 10px;
  gap: 10px;
`;

const Title = styled.h2`
  color: #e5e5e5;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Time = styled.span`
  width: 100%;
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const Price = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 1000;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const PriceSpan = styled.span`
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
const Desc = styled.span`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const Brand = styled.span`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;
const Availability = styled.span`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0;
  }
`;

const HR = styled.hr`
  width: 100%;
`;

const SkeletonContainer = styled.div`
  padding: 20px;
  width: 100%;
  height: 700px;
`;

const AddToCart = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 60%;
  height: 40px;
  border-radius: 10px;
  margin-top: 32px;
  transition: background-color 0.3s;
  background-color: rgb(44 101 71);
  &:hover {
    background-color: #38824a;
  }
`;

const INITIAL_PRODUCT = {
  _id: 0, // Number
  images: "", // String
  title: "", // String
  crawled_at: "", // String
  brand: "", // String
  priceCurrency: "", // String
  price: 0, // Number
  description: "", // String
  availability: "", // String
};

const ProductPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  let [searchParams] = useSearchParams();
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const {
    _id,
    images,
    title,
    crawled_at,
    brand,
    priceCurrency,
    price,
    description,
    availability,
  } = product;

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const resetTransform = () => {
    setMousePosition({ left: 0, top: 0 });
  };

  function handleMouseMove(e) {
    setMousePosition({ left: e.pageX, top: e.pageY });
  }

  const handlerSetCart = () => {
    if (!user) {
      alert("You isn't authorized");
      return;
    }
    if (user.cart.find((elem) => elem._id === _id)) {
      alert(`This product already in cart: ${title}`);
      return;
    }
    const cartCopy = user.cart.slice();
    cartCopy.push(product);
    setUser((prevState) => ({
      ...prevState,
      cart: cartCopy,
    }));
    updateCart(user._id, cartCopy).then((res) => {
      const { data } = res;
      const { success } = data;
      if (!success) {
        const { message } = data;
        alert(message);
        return;
      }
      const { updatedCart } = data;
      setUser((prevState) => ({
        ...prevState,
        cart: updatedCart,
      }));
    });
    alert(`Added to the cart: ${title}`);
  };

  const getData = async () => {
    const categories = await getProduct(product_id);
    return categories;
  };

  useEffect(() => {
    getData().then((product) => {
      setProduct(product);
    });
  }, []);
  return (
    <Container>
      {product && product.availability ? (
        <>
          <Back
            onClick={() => {
              searchParams.set("category", product.main_category);
              navigate(`/products?${searchParams.toString()}`);
            }}
          >{`<- Back to "${product.main_category}" category`}</Back>
          <InnerContainer>
            <ImgContainer>
              <Image src={images} alt=""></Image>
            </ImgContainer>
            <Info>
              <Title>{title}</Title>
              <Time>{crawled_at}</Time>
              <Price>
                <PriceSpan>Price: </PriceSpan>
                {price + " " + priceCurrency}
              </Price>
              {brand ? (
                <Brand>
                  <b>Brand: </b>
                  {brand}
                </Brand>
              ) : null}
              <Availability>
                <b>Availability: </b>
                {availability}
              </Availability>
              <HR></HR>
            </Info>
          </InnerContainer>
          <Desc>{description}</Desc>
        </>
      ) : (
        <SkeletonContainer>
          <Skeleton
            style={{ margin: "10px" }}
            count={2}
            width={"47%"}
            height={"80%"}
            borderRadius={10}
            inline={true}
          ></Skeleton>
          <Skeleton
            style={{ margin: "10px" }}
            count={1}
            width={"100%"}
            height={"20%"}
            borderRadius={10}
          ></Skeleton>
        </SkeletonContainer>
      )}
      {user && user.email ? (
        <AddToCart onClick={handlerSetCart}>Add to cart</AddToCart>
      ) : null}
    </Container>
  );
};

export default ProductPage;
