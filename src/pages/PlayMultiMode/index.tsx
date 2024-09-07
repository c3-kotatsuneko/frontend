import { useEffect } from "react";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { Timer } from "../../components/features/play/Timer";
import { ARfunction } from "../AR";
import styles from "./index.module.css";
import ExitButton from "../../components/features/play/ExitButton";
import { useUserStore } from "../../store/useUserStore";
import { useSocketRefStore } from "../../store/useSocketRefStore";

export const PlayMultiMode = () => {
	const setClearTime = useTimeAttackStore((state) => state.setClearTime);
	const { name: userName } = useUserStore();
	const time = useSocketRefStore((state) => state.eventState.time);

	// timeが0になったらrankingページへ遷移する
	useEffect(() => {
		setClearTime(18);

		// if (time === 0) {
		//   navigate("/ranking_timeAttack");
		// }
	}, [setClearTime]);

	return (
		<main>
			<Timer remainingTime={time} />
			<p className={styles["user-name"]}>{userName}</p>
			<ARfunction />
			<ExitButton />
		</main>
	);
};
