import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { useUserStore } from "../../../store/useUserStore";
import { useSocketRefStore } from "../../../store/useSocketRefStore";

export const useLoginForm = () => {
	const navigate = useNavigate();
	const { setLoginUser } = useUserStore();
	const setMyId = useSocketRefStore((state) => state.setMyId);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState<string | null>(null);

	const login = async (userName: string, password: string) => {
		const body = new URLSearchParams({
			username: userName,
			password: password,
		}).toString();

		try {
			const response = await fetch(`${baseUrl}/token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: body,
			});
			if (!response.ok) {
				setLoginError("あれ、なにかちがうみたいだよ");
				return;
			}
			const data = await response.json();

			setLoginError(null);
			setLoginUser(data.access_token, userName);
			setMyId(userName);

			navigate("/mode_select");
		} catch (error) {
			console.error("Login error:", error);
			setLoginError("あれ、なにかちがうみたいだよ");
		}
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(userName, password);
	};

	return {
		userName,
		password,
		loginError,
		setUserName,
		setPassword,
		onSubmit,
	};
};
