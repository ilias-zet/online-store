import React from "react";
import styled from "styled-components";
import useInput from "../customHooks/useInput";
const { getSignIn, getSignUp } = require("../shared/utils");

const FormBg = styled.div`
  display: ${(props) => (props.isOpened ? "block" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 2;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  min-height: 250px;
  background-color: #303030;
  border: 1px solid rgb(229 229 229 / 16%);
  border-radius: 10px;
  padding: 20px;
  margin-top: 88px;
  margin-left: auto;
  margin-right: auto;
  z-index: 3;
  @media (max-width: 480px) {
    margin-top: 20%;
  }
`;

const CloseForm = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-weight: 1000;
  font-size: 20px;
  color: #e5e5e5;
`;

const FormMainText = styled.span`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  font-family: "Inter", sans-serif;
  color: #e5e5e5;
  font-weight: 1000;
`;

const Outer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 45%;
`;

const Text = styled.span`
  width: 100%;
  font-family: "Inter", sans-serif;
  color: #e5e5e5;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  width: 90%;
  height: 80px;
`;

const Input = styled.input`
  display: flex;
  border-radius: 5px;
  border: 1px solid #606060;
  width: 100%;
  margin-top: 8px;
  height: 30px;
  background-color: #303030;
  &:focus {
    outline: none;
    border: 1px solid gray;
    -webkit-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
    box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
  }
`;

const SignBtn = styled.div`
  ${({ disabled }) =>
    disabled
      ? `
      background-color: #464646c2;
    `
      : `
    background-color: #191919;
    cursor:pointer;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: white;
  margin-top: 8px;
  border-radius: 10px;
  border: 1px solid #606060;
`;

const Authorization = ({ isSignIn, isOpened, close, setUser }) => {
  const [name, onNameChange] = useInput();
  const [surname, onSurnameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [repeatPassword, onRepeatPasswordChange] = useInput();
  const disabled =
    ((!name || !surname || !email || !password || !repeatPassword) &&
      !isSignIn) ||
    !email ||
    !password;
  const handlerSignBtns = () => {
    if (!disabled) {
      let userData;

      const getDataSignUp = async () => {
        const msgAndUser = await getSignUp(
          name,
          surname,
          email,
          password,
          userData
        );
        return msgAndUser;
      };

      const getDataSignIn = async () => {
        const tokenAndUser = await getSignIn(email, password);
        return tokenAndUser;
      };

      if (isSignIn) {
        getDataSignIn().then((res) => {
          const { success } = res;
          if (!success) {
            const { message } = res;
            alert(message);
            return;
          }
          const { token, user } = res;
          localStorage.setItem("token", JSON.stringify({ value: token }));
          setUser(user);
          console.log(user)
          alert("Successfull sign in!");
          console.log(res);
        });
      } else {
        getDataSignUp().then((res) => {
          const { success } = res;
          if (!success) {
            const { message } = res;
            alert(message);
            return;
          }
          const {token,user} = res;
          localStorage.setItem("token", JSON.stringify({value:token}))
          setUser(user);
          console.log(user);
          alert(res.message);
        });
      }
      close();
    }
  };

  return (
    <FormBg isOpened={isOpened}>
      <FormContainer>
        {isSignIn ? (
          <>
            <CloseForm onClick={() => {
              close()
              document.documentElement.style.overflow = '';
              }}>x</CloseForm>
            <FormMainText>Log in</FormMainText>
            <InputContainer>
              <Text>E-mail*:</Text>
              <Input
                value={email}
                onChange={onEmailChange}
                placeholder="ivanivanov@mail.com"
              ></Input>
            </InputContainer>
            <InputContainer>
              <Text>Password*:</Text>
              <Input value={password} onChange={onPasswordChange}></Input>
            </InputContainer>
            <SignBtn onClick={() => {
              document.documentElement.style.overflow = '';
              handlerSignBtns()
              }} disabled={disabled}>
              Log in
            </SignBtn>
          </>
        ) : (
          <>
            <CloseForm onClick={() => {
              document.documentElement.style.overflow = '';
              close()
              }}>x</CloseForm>
            <FormMainText>Create account</FormMainText>
            <Outer>
              <Inner>
                <Text>Name*:</Text>
                <Input
                  value={name}
                  onChange={onNameChange}
                  placeholder="Ivan"
                ></Input>
              </Inner>
              <Inner>
                <Text>Surname*:</Text>
                <Input
                  value={surname}
                  onChange={onSurnameChange}
                  placeholder="Ivanov"
                ></Input>
              </Inner>
            </Outer>
            <InputContainer>
              <Text>E-mail*:</Text>
              <Input
                value={email}
                onChange={onEmailChange}
                placeholder="ivanivanov@mail.com"
              ></Input>
            </InputContainer>
            <InputContainer>
              <Text>Password*:</Text>
              <Input value={password} onChange={onPasswordChange}></Input>
            </InputContainer>
            <InputContainer>
              <Text>Repeat password*:</Text>
              <Input
                value={repeatPassword}
                onChange={onRepeatPasswordChange}
              ></Input>
            </InputContainer>
            <SignBtn
              onClick={() => {
                if(!disabled) {
                  document.documentElement.style.overflow = '';
                  handlerSignBtns()
                }
              }}
              disabled={disabled}
            >
              Sign Up
            </SignBtn>
          </>
        )}
      </FormContainer>
    </FormBg>
  );
};

export default Authorization;
