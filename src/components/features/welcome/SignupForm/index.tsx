import type React from "react";
import { useState } from "react";
import { TextInput } from "../../../ui/TextInput";
import { PasswordInput } from "../../../ui/PasswordInput";
import { WelcomeButton } from "../WelcomeButton";
import styles from "./index.module.css";

interface SignupProps {
	onSubmit: (name: string, password: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(name, password);
	};

	return (
		<form className={styles["login-form"]} onSubmit={handleSubmit}>
			<TextInput
				label={"おなまえ"}
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<PasswordInput
				label={"おまじない"}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<WelcomeButton type="submit" color="redorange">
				とうろくする
			</WelcomeButton>
		</form>
	);
};

export default Signup;
