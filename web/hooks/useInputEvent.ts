import { useEffect, useState } from "react";


export const useInputEvent = () => {

  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const keyDownHandler = ({ code } : {code: string}) => setKey(code);
    const keyUpHandler = () => setKey(null);

    global.addEventListener('keydown', keyDownHandler);
    global.addEventListener('keyup', keyUpHandler);
    return () => {
      global.removeEventListener("keydown", keyDownHandler);
      global.removeEventListener("keyup", keyUpHandler)
    }
  }, []);
  return key;
}
