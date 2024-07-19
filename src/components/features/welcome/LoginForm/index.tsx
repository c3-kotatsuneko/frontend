import { PasswordInput } from "../../../ui/PasswordInput";
import { TextInput } from "../../../ui/TextInput";
import { WelcomeButton } from "../WelcomeButton";
import { useState } from "react";
import LoginAnonymous from "../LoginAnonimos";
import styles from "./index.module.css";

interface LoginProps {
	onSubmit: (name: string, password: string) => void;
	loginError: string | null;
}

const Login: React.FC<LoginProps> = ({ onSubmit, loginError }) => {
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
			<div>
				<WelcomeButton color="brown">あそびにいく</WelcomeButton>
				{loginError && <p className={styles.error}>{loginError}</p>}
			</div>

			<LoginAnonymous />
		</form>
	);
};

export default Login;
