import type React from "react";
import { useState } from "react";
import { TextInput } from "../../../ui/TextInput";
import { PasswordInput } from "../../../ui/PasswordInput";
import { WelcomeButton } from "../WelcomeButton";
import styles from "./index.module.css";

interface SignupProps {
	onSubmit: (userName: string, omajinai: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
	const [userName, setUserName] = useState("");
	const [omajinai, setOmajinai] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(userName, omajinai);
	};

	return (
		<form className={styles["login-form"]} onSubmit={handleSubmit}>
			<TextInput
				label={"おなまえ"}
				type="text"
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>

			<PasswordInput
				label={"おまじない"}
				value={omajinai}
				onChange={(e) => setOmajinai(e.target.value)}
			/>
			<WelcomeButton type="submit" color="redorange">
				とうろくする
			</WelcomeButton>
		</form>
	);
};

export default Signup;
