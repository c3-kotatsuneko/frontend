import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";

export const useLoginForm = () => {
	const navigate = useNavigate();
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

			localStorage.setItem("token", data.access_token);
			localStorage.setItem("userName", userName);

			navigate("/mode_select");
		} catch (error) {
			console.error("Login error:", error);
			setLoginError("あれ、なにかちがうみたいだよ");
		}
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(userName, password);
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
