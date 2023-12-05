import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { createNewProductDB } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 300px;
  background-color: #303030;
  margin: 10px;
  padding: 10px;
  border: 1px solid rgb(229 229 229 / 16%);
`;

const MainTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  color: #e5e5e5;
  margin: 0;
`;

const Title = styled.span`
  margin-top: 16px;
  width: 100%;
  color: #e5e5e5;
`;

const Input = styled.input`
  color: #e5e5e5;
  padding: 8px;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  background-color: #303030;
  border: 1px solid rgb(229 229 229 / 16%);
`;

const Select = styled.select`
  background-color: #303030;
  padding: 10px;
  border: 1px solid rgb(229 229 229 / 16%);
  width: 100%;
`;

const CreateNewProductBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  width: 30%;
  height: 32px;
  background-color: rgb(67 67 67);
  border-radius: 8px;
`;

const Option = styled.option``;

const CreateNewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    brand: " ", // const
    description: "",
    gtin13: 0, // const
    availability: "inStock", // const
    price: 0,
    url: " ", // const
    sku: "", // const
    priceCurrency: "USD", // const
    breadcrumbs: [""], // const
    images:
      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg",
    crawled_at: "", // Date now()
    main_category: "Baby",
  });
  const categoriesNamesArr = [
    "Baby",
    "Beauty",
    "Black Beyond Measure",
    "Bullseye's Playground",
    "Character Shop",
    "Electronics",
    "Featured Brands",
    "Furniture",
    "Gift Ideas",
    "Grocery",
    "Health",
    "Holiday Shop",
    "Home",
    "Household Essentials",
    "Kids",
    "Kitchen & Dining",
    "Men",
    "Movies, Music & Books",
    "Musical Instruments",
    "Party Supplies",
    "Patio & Garden",
    "Personal Care",
    "Pets",
    "School & Office Supplies",
    "Shoes",
    "Sports & Outdoors",
    "Top Deals",
    "Toys",
    "Video Games",
    "Ways to Shop",
    "Women",
  ];

  const createNewProduct = () => {
    if(!newProduct.price || !newProduct.description || !newProduct.title || !newProduct.main_category) {
      alert("Fill all fields!")
      return
    }
    createNewProductDB(newProduct).then(res => {
      console.log(res)
    })
  };

  return (
    <Container>
      <MainTitle>Create a new product</MainTitle>
      <Title>Product title*</Title>
      <Input
        value={newProduct.title}
        type="text"
        placeholder="Some Name For Product"
        onChange={(e) => {
          setNewProduct((prev) => ({
            ...prev,
            title: e.target.value,
          }));
        }}
      ></Input>
      <Title>Product price($)*</Title>
      <Input
        value={Math.abs(newProduct.price)}
        type="number"
        min={0}
        max={9999}
        placeholder="Some Name For Product"
        onChange={(e) => {
          setNewProduct((prev) => ({
            ...prev,
            price: (Number(e.target.value)< 0 && Math.abs(Number(e.target.value)))||(Number(e.target.value)>9999 && 9999) || Number(e.target.value),
          }));
        }}
      ></Input>
      <Title>Product category*</Title>
      <Select
        name="select_category"
        value={newProduct.main_category}
        onChange={(e) => {
          setNewProduct((prev) => ({
            ...prev,
            main_category: e.target.value,
          }));
        }}
      >
        {categoriesNamesArr.map((categoryName) => (
          <Option value={categoryName}>{categoryName}</Option>
        ))}
      </Select>
      <Title>Product description*</Title>
      <Input
        value={newProduct.description}
        style={{ height: "64px" }}
        type="text"
        placeholder="Some desc"
        onChange={(e) => {
          setNewProduct((prev) => ({
            ...prev,
            description: e.target.value,
          }));
        }}
      ></Input>
      <CreateNewProductBtn onClick={createNewProduct}>
        Create
      </CreateNewProductBtn>
    </Container>
  );
};

export default CreateNewProduct;
