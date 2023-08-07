import React from "react";
import styled from "styled-components";
import useInput from "./useInput";
import axios from "axios";

const SignUpFormBg = styled.div`
  display: ${(props) => (props.isOpened ? "block" : "none")} ;
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
  width: 350px;
  height: 450px;
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

const NameAndSurnameMainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

const NameAndSurnameSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 45%;
`;

const Text = styled.span`
  width: 100%;
  font-family: "Inter", sans-serif;
  color: #292929;
`;

const NameAndSurnameInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  height: 30px;
  &:focus {
    outline: none;
    border: 1px solid gray;
    -webkit-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
  }
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

const SignUp = ({ isOpened, open, close, setUser }) => {
  const name = useInput("")
  const surname = useInput("")
  const email = useInput("")
  const pass = useInput("")
  const repeatpass = useInput("")
  

  const clickHandlerForSignUpBtn = () => {
    let userData;
    const userName = name.value;
    const userSurname = surname.value;
    const userEmail = email.value;
    const userPassword = pass.value;
    const userRepeatPassword = repeatpass.value;

    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8000/auth/registration",userData, {
          params: { userData },
        });
        const resUser = await res.data;
        if(resUser.user) {
          setUser(resUser.user)
          alert("Успешная регистрация!")
        }
      } catch (e) {
        const err = e?.response.data?.message && e?.response.data?.candidate? `${e?.response.data?.message}` : "Unexpected registration error"
        alert(err)
      }
    };
    

    if(userName && userSurname && userEmail && userPassword && userRepeatPassword && (userPassword === userRepeatPassword)) {
      userData = {
        userName,
        userSurname,
        userEmail,
        userPassword,
      }
      
    }
    fetchData()
    close()
  }

  return (
    <SignUpFormBg isOpened={isOpened}>
      <FormContainer>
        <CloseForm onClick={() => close()}>x</CloseForm>
        <FormMainText>Create account</FormMainText>
        <NameAndSurnameMainContainer>
          <NameAndSurnameSubContainer>
            <Text>Name*:</Text>
            <NameAndSurnameInput { ...name} placeholder="Ivan"></NameAndSurnameInput>
          </NameAndSurnameSubContainer>
          <NameAndSurnameSubContainer>
            <Text>Surname*:</Text>
            <NameAndSurnameInput { ...surname } placeholder="Ivanov"></NameAndSurnameInput>
          </NameAndSurnameSubContainer>
        </NameAndSurnameMainContainer>
        <OtherContainer>
          <Text>E-mail*:</Text>
          <OtherInput { ...email } placeholder="ivanivanov@mail.com"></OtherInput>
        </OtherContainer>
        <OtherContainer>
          <Text>Password*:</Text>
          <OtherInput { ...pass }></OtherInput>
        </OtherContainer>
        <OtherContainer>
          <Text>Repeat password*:</Text>
          <OtherInput { ...repeatpass }></OtherInput>
        </OtherContainer>
        <SignUpBtn onClick={() => clickHandlerForSignUpBtn()}>Sign Up</SignUpBtn>
      </FormContainer>
    </SignUpFormBg>
  );
};

export default SignUp;
