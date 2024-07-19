import { PasswordInput } from "../../../ui/PasswordInput";
import { TextInput } from "../../../ui/TextInput";
import { WelcomeButton } from "../WelcomeButton";
import { useState } from "react";
import LoginAnonymous from "../LoginAnonimos";
import styles from "./index.module.css";

interface LoginProps {
	onSubmit: (userName: string, password: string) => void;
	loginError: string | null;
}

const Login: React.FC<LoginProps> = ({ onSubmit, loginError }) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(userName, password);
		await onSubmit(userName, password);
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
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				<WelcomeButton color="brown">あそびにいく</WelcomeButton>
				{loginError && <p className={styles.error}>{loginError}</p>}
			</div>

			<LoginAnonymous />
		</form>
	);
};

export default Login;
