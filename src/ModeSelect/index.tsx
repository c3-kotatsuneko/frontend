import { DefaultButton } from "../components/ui/Button";
import styles from "./index.module.css";

export const ModeSelectPage = () => {
	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>ユーザー名</p>

			<p className={styles.title}>どこであそぶ？</p>

			<div className={styles["button-wrap"]}>
				<DefaultButton>たいむあたっく</DefaultButton>

				<DefaultButton color="redorange" disabled>
					いっしょにたいせん
				</DefaultButton>

				<DefaultButton color="green" disabled>
					つみきで脳トレ
				</DefaultButton>

				<DefaultButton variant="outlined" size="sm">
					<img
						className={styles["crown-image"]}
						alt="crown"
						src="crown.png?url"
						width={16}
						height={16}
					/>
					ランキング
				</DefaultButton>
			</div>

			<img
				className={styles["cats-image"]}
				alt="のびねこ"
				src="/cats/extendedMike.png?url"
				width={216}
				height={106}
			/>
		</main>
	);
};
