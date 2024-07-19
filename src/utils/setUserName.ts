import { useEffect, useState } from "react";

type useUserName = {
  userName: string;
  isGuest: boolean;
};

export const useUserName = (): useUserName => {
  const [userName, setUserName] = useState("");
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const loginUserName = localStorage.getItem("userName");
    const guestUserName = localStorage.getItem("guestName");

    if (loginUserName) {
      setUserName(loginUserName);
      setIsGuest(false);
    } else if (guestUserName) {
      setUserName(guestUserName);
      setIsGuest(true);
    }
  }, []);

  return {
    userName,
    isGuest,
  };
};
