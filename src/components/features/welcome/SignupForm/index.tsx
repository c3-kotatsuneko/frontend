import type React from "react";
import {
	type ReactEventHandler,
	useCallback,
	useEffect,
	useState,
} from "react";
import { TextInput } from "../../../ui/TextInput";
import { PasswordInput } from "../../../ui/PasswordInput";
import { WelcomeButton } from "../WelcomeButton";
import styles from "./index.module.css";

interface SignupProps {
	userExistsMessage: string | null;
	useDebounce: (value: string, delay: number) => string;
	checkExistUserName: (userName: string) => void;
	onSubmit: (userName: string, omajinai: string) => void;
}

const Signup: React.FC<SignupProps> = ({
	userExistsMessage,
	useDebounce,
	checkExistUserName,
	onSubmit,
}) => {
	const [userName, setUserName] = useState("");
	const [omajinai, setOmajinai] = useState("");

	const debouncedUserName = useDebounce(userName, 300);

	useEffect(() => {
		if (userName && debouncedUserName) {
			checkExistUserName(debouncedUserName);
		}
	}, [debouncedUserName, userName, checkExistUserName]);

	const handleUserNameChange: ReactEventHandler<HTMLInputElement> = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserName(e.target.value);
		},
		[],
	);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(userName, omajinai);
	};

	return (
		<form className={styles["login-form"]} onSubmit={handleSubmit}>
			<div>
				<TextInput
					label={"おなまえ"}
					type="text"
					value={userName}
					onChange={handleUserNameChange}
				/>
				{userExistsMessage && (
					<p className={styles.message}>{userExistsMessage}</p>
				)}
			</div>

			<PasswordInput
				label={"おまじない"}
				value={omajinai}
				onChange={(e) => setOmajinai(e.target.value)}
			/>
			<WelcomeButton
				type="submit"
				color="redorange"
				disabled={
					userExistsMessage !== "" || userName === "" || omajinai === ""
				}
			>
				とうろくする
			</WelcomeButton>
		</form>
	);
};

export default Signup;
