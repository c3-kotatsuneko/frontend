import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { TextInput } from "../../components/ui/TextInput";
import styles from "./index.module.css";

export const GuestLoginPage = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");

	useEffect(() => {
		localStorage.removeItem("resultStatus");
		localStorage.removeItem("userName");
		localStorage.removeItem("userRank");
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		localStorage.setItem("guestName", name);
		navigate("/mode_select");
	};
	return (
		<main className={styles.root}>
			<p className={styles.title}>おなまえをおしえてください</p>
			<form className={styles["form-style"]} onSubmit={handleSubmit}>
				<TextInput
					label="おなまえ"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<DefaultButton color="redorange" type="submit">
					あそびにいく
				</DefaultButton>
			</form>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="cats/catsTower-circle.webp"
				width={148}
				height={242}
			/>
		</main>
	);
};
