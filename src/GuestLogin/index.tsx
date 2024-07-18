import { useState } from "react";
import { DefaultButton } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import styles from "./index.module.css";

interface GuestLoginProps {
	onSubmit: (name: string) => void;
  }

export const GuestLoginPage: React.FC<GuestLoginProps> = ({ onSubmit }) => {
	const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('hogehoegedayo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSubmit(data.name);
    } catch (error) {
      console.error('Error:', error);
    }
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
