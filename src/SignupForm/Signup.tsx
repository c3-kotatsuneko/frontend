import type React from "react";
import { useState } from "react";
import { TextInput } from "../components/ui/TextInput";
import { PasswordInput } from "../components/ui/PasswordInput";
import { WelcomeButton } from "../components/ui/WelcomeButton";

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
			<WelcomeButton type="submit" color="redorange">
				とうろくする
			</WelcomeButton>
		</form>
	);
};

export default Signup;
