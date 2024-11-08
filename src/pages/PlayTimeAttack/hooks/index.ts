import { useEffect } from "react";
import { useTimeAttackStore } from "../../../store/useTimeAttackStore";
import { useUserStore } from "../../../store/useUserStore";
import { useSocketRefStore } from "../../../store/useSocketRefStore";
import {
	Event,
	Mode,
	type Player,
} from "../../../proto/game/resources/game_pb";
// import ReconnectingWebSocket from "reconnecting-websocket";
// import { useNavigate } from "react-router-dom";

export const usePlayTimeAttack = () => {
	//   const navigate = useNavigate();
	const setClearTime = useTimeAttackStore((state) => state.setClearTime);
	const { name: userName } = useUserStore();
	const eventSend = useSocketRefStore((state) => state.eventSend);
	const time = useSocketRefStore((state) => state.eventState.time);
	const roomId = useSocketRefStore((state) => state.eventState.roomId);
	const name = useUserStore((state) => state.name);

	//   timeが0になったらrankingページへ遷移する
	useEffect(() => {
		eventSend({
			roomId: roomId,
			event: Event.GAME_START,
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
		// if (time - 1 === gameDuration) {
		//   navigate("/ranking_timeAttack");
		setClearTime(18);
		// }
	}, [eventSend, setClearTime, name, roomId]);

	return { time, userName };
};
