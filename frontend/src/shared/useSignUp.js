import { useState } from "react";

export default function useSignUp(value) {
  const [isOpened, setIsOpened] = useState(value)

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);
  

  return {
    isOpened,open,close
  };
}