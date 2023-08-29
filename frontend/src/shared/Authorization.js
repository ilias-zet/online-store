import React from "react";
import styled from "styled-components";
import useInput from "./useInput";
import axios from "axios";

const FormBg = styled.div`
  display: ${(props) => (props.isOpened ? "block" : "none")};
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  min-height: 250px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
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
  color: black;
`;

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

const Outer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

const Inner = styled.div`
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

// const NameSurnameInput = styled.input`
//   border: 1px solid black;
//   border-radius: 5px;
//   height: 30px;
//   &:focus {
//     outline: none;
//     border: 1px solid gray;
//     -webkit-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
//     -moz-box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
//     box-shadow: -1px 0px 17px 4px rgba(34, 60, 80, 0.2);
//   }
// `;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  height: 80px;
`;

const Input = styled.input`
  display: flex;
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

const SignBtn = styled.div`
  cursor: ${({ disabled }) => (disabled ? "" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 50px;
  background-color: ${({ disabled }) => (disabled ? "gray" : "black")};
  color: white;
  font-size: 20px;
  border-radius: 10px;
`;

const Authorization = ({ isSignIn, isOpened, close, setUser, setToken }) => {
  const [name, onNameChange] = useInput();
  const [surname, onSurnameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [repeatPassword, onRepeatPasswordChange] = useInput();
  const disabled = !name || !surname || !email || !password || !repeatPassword || password!==repeatPassword;

  const handlerSignBtns = () => {
    if (!disabled) {
      let userData;

      const fetchDataSignUp = async () => {
        userData = { name, surname, email, password };
        try {
          const res = await axios.post(
            "http://localhost:8000/auth/registration",
            userData,
          );
          const { data } = res;
          if (data.user) {
            setUser(data.user);
            alert("Successfull registration!");
          }
        } catch (e) {
          const err = e?.response.data?.errors.errors
            ? e?.response.data?.errors.errors
            : "Unexpected registration error";
          alert(err.map(({ msg }) => msg));
        }
      };
      const fetchDataSignIn = async () => {
        if (email && password) {
          userData = {
            email,
            password,
          };
        }
        try {
          const res = await axios.post(
            "http://localhost:8000/auth/login",
            userData
          );
          const { data } = res;
          const { user, token } = data;
          if (user) {
            setUser(user);
            setToken(token);
            alert("Successfull sign in!");
          }
        } catch (e) {
          alert(e);
        }
      };
      isSignIn ? fetchDataSignIn() : fetchDataSignUp();
      close();
    }
  };

  return (
    <FormBg isOpened={isOpened}>
      <FormContainer>
        {isSignIn ? (
          <>
            <CloseForm onClick={() => close()}>x</CloseForm>
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
            <SignBtn onClick={handlerSignBtns} disabled={disabled}>
              Log in
            </SignBtn>
          </>
        ) : (
          <>
            <CloseForm onClick={close}>x</CloseForm>
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
            <SignBtn onClick={handlerSignBtns} disabled={disabled}>
              Sign Up
            </SignBtn>
          </>
        )}
      </FormContainer>
    </FormBg>
  );
};

export default Authorization;
