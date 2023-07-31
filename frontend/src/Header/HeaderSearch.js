import React, {useState} from "react";
import styled from 'styled-components';


const HeaderSearchContainer = styled.div`
display: flex;
align-items: center;
height: 80%;
width: 500px;
margin-left: 100px;
`

const HeaderSearchInput = styled.input`
background-color: rgb(255,255,255, 0.71);
height: 100%;
width: 85%;
border:none;
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
`

const HeaderSearchButton = styled.button`
display: flex;
flex-grow: 1;
height: 90%;
background-image: url("https://cdn-icons-png.flaticon.com/512/954/954591.png");
background-size: 60%;
background-repeat: no-repeat;
background-position: center;
border: none;
border-top-right-radius: 20px;
border-bottom-right-radius: 20px;
transition: all 0.3s;
&:hover {
cursor: pointer;
background-color: rgb(173, 173, 173);
}
`
//Этот компонент пока что не работает. Нужно сделать для него страницу, на которой будут показываться результаты поиска
//Я пока решил не делать её, потому что нужно разобраться как правильно передавать параметры в запрос
const HeaderSearch = () => {
  const [searchReq, setSearchReq] = useState(null)

  const inputSearchHandler = (e) => {
    setSearchReq(e.target.value)
    console.log(e.target.value)
  }

  const buttonSearchHandler = () => {
  //   const products = Product.find().limit(100) 
  // console.log(products)
  }

  return (
    <HeaderSearchContainer>
      <HeaderSearchInput onInput={(e) => inputSearchHandler(e)}></HeaderSearchInput>
      <HeaderSearchButton onClick={() => buttonSearchHandler()}></HeaderSearchButton>
    </HeaderSearchContainer>
  )
}

export default HeaderSearch;