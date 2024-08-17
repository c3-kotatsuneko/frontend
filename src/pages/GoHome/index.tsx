import styles from "./index.module.css";

export const GoHome = () => {
	return (
		<div>
			<p className={styles["home-message"]}>きをつけておうちに帰ってね</p>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.webp"
				width={120}
				height={180}
			/>
		</div>
	);
};
