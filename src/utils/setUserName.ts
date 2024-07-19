import { useEffect, useState } from "react";

type useUserName = {
  userName: string;
};

export const useUserName = (): useUserName => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loginUserName = localStorage.getItem("userName");
    const guestUserName = localStorage.getItem("guestName");

    if (loginUserName) {
      setUserName(loginUserName);
    } else if (guestUserName) {
      setUserName(guestUserName);
    }
  }, []);

  return {
    userName,
  };
};
