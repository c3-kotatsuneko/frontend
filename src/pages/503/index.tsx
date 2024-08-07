import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

export const maintenance = () => {
	return (
		<main>
			<p className={styles.message}>503 こうじちゅう</p>
			<DefaultButton color="redorange" size="lg">
				おうちへ
			</DefaultButton>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.png"
				width={148}
				height={242}
			/>
		</main>
	);
};
