import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useModeStore } from "../../store/useModeStore";
import { useSocketRefStore } from "../../store/useSocketRefStore";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Event, Mode, type Player } from "../../proto/game/resources/game_pb";

// const position = "front";

export const ModeSelectPage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();
	const { setMode } = useModeStore();
	const { setEventRef, eventSend } = useSocketRefStore();
	const position = useSocketRefStore((state) => state.eventState.direction);
	const roomId = useSocketRefStore((state) => state.eventState.roomId);
	const name = useUserStore((state) => state.name);

	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
		const ws = new ReconnectingWebSocket(
			"wss://websocket-440907433892.asia-northeast1.run.app/ws/events",
		);
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
						eventSend({
							roomId: roomId,
							event: Event.ENTER_ROOM,
							mode: Mode.TIME_ATTACK,
							player: {
								playerId: name,
								name: name,
								color: "red",
								score: 0,
								rank: 1,
								time: 0,
							} as Player,
						});
						navigate("/play_timeAttack");
					}}
				>
					たいむあたっく
				</DefaultButton>

				<DefaultButton
					color="redorange"
					onClick={() => {
						setMode("multi");
						eventSend({
							roomId: roomId,
							event: Event.ENTER_ROOM,
							mode: Mode.MULTI,
							player: {
								playerId: name,
								name: name,
								color: "red",
								score: 0,
								rank: 1,
								time: 0,
							} as Player,
						});
						navigate(`/multiMode?position=${position}`);
					}}
				>
					いっしょにたいせん
				</DefaultButton>

				<DefaultButton
					color="green"
					disabled
					onClick={() => {
						setMode("training");
						eventSend({
							roomId: roomId,
							event: Event.ENTER_ROOM,
							mode: Mode.TRAINING,
							player: {
								playerId: name,
								name: name,
								color: "red",
								score: 0,
								rank: 1,
								time: 0,
							} as Player,
						});
						navigate("/play_training");
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
