import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

export const Maintenance = () => {
	return (
		<main className={styles.root}>
			<p className={styles.message}>503 こうじちゅう</p>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.webp"
				width={148}
				height={242}
			/>
			<DefaultButton color="redorange" size="lg">
				おうちへ
			</DefaultButton>
		</main>
	);
};
