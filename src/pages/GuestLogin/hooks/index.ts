import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { useSocketRefStore } from "../../../store/useSocketRefStore";

export const useGuestLogin = () => {
  const navigate = useNavigate();
  const { setGuestUser } = useUserStore();
  const setMyId = useSocketRefStore((state) => state.setMyId);
  const [guestName, setGuestName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuestUser(guestName);
    setMyId(guestName);
    navigate("/mode_select");
  };

  return {
    guestName,
    setGuestName,
    handleSubmit,
  };
};
