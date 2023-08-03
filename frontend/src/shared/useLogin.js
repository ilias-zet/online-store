import { useState } from "react";

export default function useSignUp(value) {
  const [isOpenedLogin, setIsOpenedLogin] = useState(value)

  const openLogin = () => setIsOpenedLogin(true);
  const closeLogin = () => setIsOpenedLogin(false);
  

  return {
    isOpenedLogin,openLogin,closeLogin
  };
}