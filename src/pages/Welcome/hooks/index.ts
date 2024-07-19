import { useState } from "react";
import { baseUrl } from "../../../utils/baseUrl";

type useWelcomeProps = {
	onLoginSubmit: (userName: string, password: string) => void;
	onSignupSubmit: (userName: string, omajinai: string) => void;
	loginError: string | null;
};

export const useWelcome = (): useWelcomeProps => {
	const [loginError, setLoginError] = useState<string | null>(null);

	const handleLoginSubmit = async (userName: string, password: string) => {
		const body = new URLSearchParams({
			username: userName,
			password: password,
		}).toString();
		console.log("body", body);

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
			console.log("Login response:", data);
			localStorage.setItem("token", data.access_token);
		} catch (error) {
			console.error("Login error:", error);
			setLoginError("あれ、なにかちがうみたいだよ");
		}
	};

	const handleSignupSubmit = async (userName: string, omajinai: string) => {
		try {
			const response = await fetch(`${baseUrl}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: userName, omajinai: omajinai }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			localStorage.setItem("token", data.access_token);
			console.log("SignUp response:", data);
		} catch (error) {
			console.error("SignUp error:", error);
		}
	};

	return {
		onLoginSubmit: handleLoginSubmit,
		onSignupSubmit: handleSignupSubmit,
		loginError,
	};
};
