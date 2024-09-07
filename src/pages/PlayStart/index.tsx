import { useEffect } from "react";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

export const PlayStart = () => {
	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
	}, []);

	return (
		<main className={styles.root}>
			<p className={styles["start-message"]}>みんなあつまったかな？</p>
			<DefaultButton color="redorange" size="lg">
				げーむ すたーと！
			</DefaultButton>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.webp"
				width={148}
				height={242}
			/>
		</main>
	);
};
