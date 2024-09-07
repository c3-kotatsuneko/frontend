import { formatTime } from "../../../../utils/formatTime";
import { TimerIcon } from "../../../icon/Timer";
import styles from "./index.module.css";

type TimerProps = {
	remainingTime: number;
};

export const Timer = ({ remainingTime }: TimerProps) => {
	const formattedTime = formatTime(remainingTime);

	return (
		<div className={styles["timer-box"]}>
			<TimerIcon />
			<span className={styles["timer-text"]}>{formattedTime}</span>
		</div>
	);
};
