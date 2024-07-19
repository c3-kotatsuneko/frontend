import { useState } from "react";
import { DefaultButton } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import styles from "./index.module.css";

interface GuestLoginProps {
	onSubmit: (name: string) => void;
  }

export const GuestLoginPage: React.FC<GuestLoginProps> = ({ onSubmit }) => {
	const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name);
  };
	return (
		<main className={styles.root}>
			<p className={styles.title}>おなまえをおしえてください</p>
			<form onSubmit={handleSubmit}>
			<TextInput label="おなまえ" value={name} onChange={(e) => setName(e.target.value)} />
			<DefaultButton color="redorange" type="submit">あそびにいく</DefaultButton>
			</form>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="cats/catsTower-circle.png"
				width={148}
				height={242}
			/>
		</main>
	);
};
