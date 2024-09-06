import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

export const PlayStart = () => {
	return (
		<main className={styles.root}>
			<p className={styles["start-message"]}>みんなあつまったかな？</p>
			<DefaultButton color="redorange" size="lg">
				げーむ すたーと！
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
