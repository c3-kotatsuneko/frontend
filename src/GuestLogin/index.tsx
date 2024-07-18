import { DefaultButton } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import styles from "./index.module.css";

export const GuestLoginPage = () => {
	return (
		<main className={styles.root}>
			<p className={styles.title}>おなまえをおしえてください</p>
			<TextInput label="おなまえ" />
			<DefaultButton color="redorange">あそびにいく</DefaultButton>
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
