import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";

export const ModeSelectPage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();

	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
	}, []);

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>

			<p className={styles.title}>どこであそぶ？</p>

			<div className={styles["button-wrap"]}>
				<DefaultButton
					onClick={() => {
						localStorage.setItem("mode", "timeAttack");
						// TODO: marker_scanページに遷移する
						navigate("/play_timeAttack");
					}}
				>
					たいむあたっく
				</DefaultButton>

				<DefaultButton
					color="redorange"
					onClick={() => {
						localStorage.setItem("mode", "battle");
						// TODO: marker_scanページに遷移する
						navigate("/play_timeAttack");
					}}
				>
					いっしょにたいせん
				</DefaultButton>

				<DefaultButton color="green" disabled>
					つみきで脳トレ
				</DefaultButton>

				<DefaultButton
					variant="outlined"
					size="sm"
					onClick={() => navigate("/ranking_preview")}
				>
					<img
						className={styles["crown-image"]}
						alt="crown"
						src="crown.png"
						width={16}
						height={16}
					/>
					ランキング
				</DefaultButton>
			</div>

			<img
				className={styles["cats-image"]}
				alt="のびねこ"
				src="/cats/extendedMike.png"
				width={216}
				height={106}
			/>
		</main>
	);
};
