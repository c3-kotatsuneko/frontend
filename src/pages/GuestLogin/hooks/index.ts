import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";

export const useGuestLogin = () => {
	const navigate = useNavigate();
	const { setGuestUser } = useUserStore();
	const [guestName, setGuestName] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setGuestUser(guestName);
		navigate("/mode_select");
	};

	return {
		guestName,
		setGuestName,
		handleSubmit,
	};
};
