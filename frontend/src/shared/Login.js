import React from "react";
import styled from "styled-components";
import useInput from "./useInput";
import axios from "axios";

const LoginFormBg = styled.div`
  display: ${(props) => (props.isOpenedLogin ? "block" : "none")} ;
  position: absolute;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 250px;
  height: 300px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10%;
  margin-right: auto;
  margin-left: auto;
`;

const CloseForm = styled.span`
cursor: pointer;
display: flex;
justify-content: flex-end;
width: 100%;
font-weight: 1000;
font-size: 20px;
`

const FormMainText = styled.span`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  font-family: "Inter", sans-serif;
  color: #292929;
  font-weight: 1000;
`;

const Text = styled.span`
  width: 100%;
  font-family: "Inter", sans-serif;
  color: #292929;
`;


const OtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  height: 80px;
`;

const OtherInput = styled.input`
  border-radius: 5px;
  border: 1px solid black;
  width: 100%;
  height: 30px;
  &:focus {
    outline: none;
    border: 1px solid gray;
    -webkit-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
  }
`;

const SignUpBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 20px;
  border-radius: 10px;
`;

const Login = ({ isOpenedLogin, openLogin, closeLogin,loginedUser, setLoginedUser }) => {
  const email = useInput("")
  const pass = useInput("")
  

  const clickHandlerForSignUpBtn = () => {
    let userData;
    const userEmail = email.value;
    const userPassword = pass.value;

    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8000/auth/login",userData, {
          params: { userData },
        });
        const {user} = await res.data;
        if(user) {
          setLoginedUser(user)
          alert("Успешный вход")
        }
      } catch (e) {
        const err = e?.response.data?.messageUserNotFound || e?.response.data?.messageValidPassword
        alert(err)
      }
    };
    

    if(userEmail && userPassword) {
      userData = {
        userEmail,
        userPassword,
      }
      
    }
    fetchData()
    closeLogin()
  }

  return (
    <LoginFormBg isOpenedLogin={isOpenedLogin}>
      <FormContainer>
        <CloseForm onClick={() => closeLogin()}>x</CloseForm>
        <FormMainText>Log in</FormMainText>
        <OtherContainer>
          <Text>E-mail*:</Text>
          <OtherInput { ...email } placeholder="ivanivanov@mail.com"></OtherInput>
        </OtherContainer>
        <OtherContainer>
          <Text>Password*:</Text>
          <OtherInput { ...pass }></OtherInput>
        </OtherContainer>
        <SignUpBtn onClick={() => clickHandlerForSignUpBtn()}>Log in</SignUpBtn>
      </FormContainer>
    </LoginFormBg>
  );
};

export default Login;
