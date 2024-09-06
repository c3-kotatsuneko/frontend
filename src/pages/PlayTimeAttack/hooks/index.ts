import { useEffect } from "react";
import { useTimeAttackStore } from "../../../store/useTimeAttackStore";
import { useUserStore } from "../../../store/useUserStore";
import { useSocketRefStore } from "../../../store/useSocketRefStore";
import {
	Event,
	Mode,
	type Player,
} from "../../../proto/game/resources/game_pb";
import ReconnectingWebSocket from "reconnecting-websocket";
// import { useNavigate } from "react-router-dom";

// const gameDuration = 11;

export const usePlayTimeAttack = () => {
	//   const navigate = useNavigate();
	const setClearTime = useTimeAttackStore((state) => state.setClearTime);
	const { name: userName } = useUserStore();
	const eventSend = useSocketRefStore((state) => state.eventSend);
	const time = useSocketRefStore((state) => state.eventState.time);
	const setPhysicsRef = useSocketRefStore((state) => state.setPhysicsRef);

	//   timeが0になったらrankingページへ遷移する
	useEffect(() => {
		eventSend({
			roomId: "88",
			event: Event.GAME_START,
			mode: Mode.MULTI,
			player: {
				playerId: "1",
				name: "jubhio;hbn",
				color: "red",
				score: 0,
				rank: 1,
				time: 0,
			} as Player,
		});
		// if (time - 1 === gameDuration) {
		//   navigate("/ranking_timeAttack");
		setClearTime(18);
		// }
	}, [eventSend, setClearTime]);
	useEffect(() => {
		const ws = new ReconnectingWebSocket("ws://localhost:8080/ws/events");
		ws.binaryType = "arraybuffer";
		setPhysicsRef({ current: ws });
	}, [setPhysicsRef]);

	return { time, userName };
};
