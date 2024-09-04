import { Timer } from "../../components/features/play/Timer";
import { ARfunction } from "../AR";
import ExitButton from "../../components/features/play/ExitButton";
import { StartCountdown } from "../../components/features/play/StartCountdown";
import { usePlayTimeAttack } from "./hooks";
import styles from "./index.module.css";

const gameDuration = 11;

export const PlayTimeAttack = () => {
	const { time, userName } = usePlayTimeAttack();

	return (
		<main>
			{time <= 0 ? (
				<StartCountdown startTime={-time} />
			) : (
				<>
					<Timer remainingTime={gameDuration - time} />
					<p className={styles["user-name"]}>{userName}</p>
					<ARfunction />
					<ExitButton />
				</>
			)}
		</main>
	);
};
