import {
	type ReactEventHandler,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { useUserStore } from "../../../store/useUserStore";
import { useDebounce } from "./useDebounce";

export const useSignupForm = () => {
	const navigate = useNavigate();
	const { setLoginUser } = useUserStore();
	const [userName, setUserName] = useState("");
	const [omajinai, setOmajinai] = useState("");
	const [userExistsMessage, setUserExistsMessage] = useState("");

	const debouncedUserName = useDebounce(userName, 300);

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

	useEffect(() => {
		if (debouncedUserName === "") return;
		checkExistUserName(debouncedUserName);
	}, [debouncedUserName, checkExistUserName]);

	const handleChangeUserName: ReactEventHandler<HTMLInputElement> = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserName(e.target.value);
		},
		[],
	);

	const signup = async (userName: string, omajinai: string) => {
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

			setLoginUser(data.access_token, userName);

			navigate("/mode_select");
		} catch (error) {
			console.error("SignUp error:", error);
		}
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		signup(userName, omajinai);
	};

	return {
		userName,
		omajinai,
		userExistsMessage,
		handleChangeUserName,
		setOmajinai,
		onSubmit,
	};
};
