import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useModeStore } from "../../store/useModeStore";
import { useSocketRefStore } from "../../store/useSocketRefStore";
import ReconnectingWebSocket from "reconnecting-websocket";

export const ModeSelectPage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();
	const { setMode } = useModeStore();
	const { setEventRef } = useSocketRefStore();

	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
		const ws = new ReconnectingWebSocket("ws://localhost:8081/ws/events");
		ws.binaryType = "arraybuffer";
		setEventRef({ current: ws });
	}, [setEventRef]);

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>

			<p className={styles.title}>どこであそぶ？</p>

			<div className={styles["button-wrap"]}>
				<DefaultButton
					onClick={() => {
						setMode("timeAttack");
						// TODO: marker_scanページに遷移する
						navigate("/play_timeAttack");
					}}
				>
					たいむあたっく
				</DefaultButton>

				<DefaultButton
					color="redorange"
					onClick={() => {
						setMode("multi");
						// TODO: marker_scanページに遷移する
						navigate("/play_timeAttack");
					}}
				>
					いっしょにたいせん
				</DefaultButton>

				<DefaultButton
					color="green"
					disabled
					onClick={() => {
						setMode("training");
						// TODO: marker_scanページに遷移する
						navigate("/play_timeAttack");
					}}
				>
					つみきで脳トレ
				</DefaultButton>

				<DefaultButton
					variant="outlined"
					size="sm"
					onClick={() => navigate("/ranking_TimeAttack_preview")}
				>
					<img
						className={styles["crown-image"]}
						alt="crown"
						src="crown.webp"
						width={16}
						height={16}
					/>
					ランキング
				</DefaultButton>
			</div>

			<img
				className={styles["cats-image"]}
				alt="のびねこ"
				src="/cats/extendedMike.webp"
				width={216}
				height={106}
			/>
		</main>
	);
};
