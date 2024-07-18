import { PasswordInput } from "../components/ui/PasswordInput";
import { TextInput } from "../components/ui/TextInput";
import { WelcomeButton } from "../components/ui/WelcomeButton";
import { useState } from "react";
import LoginAnonymous from "./LoginAnonimus";

interface LoginProps {
	onSubmit: (name: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(name, password);
	};

	return (
		<form onSubmit={handleSubmit}>
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
			<WelcomeButton color="brown">あそびにいく</WelcomeButton>
			<LoginAnonymous />
		</form>
	);
};

export default Login;
