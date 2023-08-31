import { useState } from "react";

export default function useSignUp(value) {
  const [isOpened, setIsOpened] = useState(value)
  const [isSignIn, setIsSignIn] = useState(false);
  
  const open = (isSignInVal) => {
    setIsOpened(true)
    setIsSignIn(isSignInVal)
  };
  const close = () => setIsOpened(false);
  

  return {
    isOpened,open,close,isSignIn
  };
}