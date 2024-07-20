import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

type useWelcomeProps = {
	loginError: string | null;
	onLoginSubmit: (userName: string, password: string) => void;
	userExistsMessage: string | null;
	useDebounce: (value: string, delay: number) => string;
	checkExistUserName: (userName: string) => void;
	onSignupSubmit: (userName: string, omajinai: string) => void;
};

export const useWelcome = (): useWelcomeProps => {
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [userExistsMessage, setUserExistsMessage] = useState("");

	const useDebounce = (value: string, delay: number) => {
		const [debouncedValue, setDebouncedValue] = useState<string>(value);

		useEffect(() => {
			const timeoutID = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			return () => {
				clearTimeout(timeoutID);
			};
		}, [value, delay]);

		return debouncedValue;
	};

	const onLoginSubmit = async (userName: string, password: string) => {
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

			navigate("/mode_select");
		} catch (error) {
			console.error("Login error:", error);
			setLoginError("あれ、なにかちがうみたいだよ");
		}
	};

	const checkExistUserName = useCallback(async (userName: string) => {
		try {
			const response = await fetch(
				`${baseUrl}/users/username/exists?username=${userName}`,
				{
					headers: {
						Accept: "application/json",
					},
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			if (data.exists) {
				setUserExistsMessage(`${userName}はもうつかわれているよ！`);
			} else {
				setUserExistsMessage("");
			}
		} catch (error) {
			console.error("Check exist user error:", error);
		}
	}, []);

	const onSignupSubmit = async (userName: string, omajinai: string) => {
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
			navigate("/mode_select");
		} catch (error) {
			console.error("SignUp error:", error);
		}
	};

	return {
		loginError,
		onLoginSubmit,
		userExistsMessage,
		useDebounce,
		checkExistUserName,
		onSignupSubmit,
	};
};
