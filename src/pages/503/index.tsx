import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

export const Maintenance = () => {
	return (
		<main className={styles.root}>
			<p className={styles.message}>503 こうじちゅう</p>
			<div className={styles["image-wrapper"]}>
				<img
					className={styles["cats-image"]}
					alt="メンテナンス中"
					src="/cats/503-cat.webp"
					width={430}
					height={370}
				/>
			</div>
			<DefaultButton color="redorange" size="lg">
				おうちへ
			</DefaultButton>
		</main>
	);
};
