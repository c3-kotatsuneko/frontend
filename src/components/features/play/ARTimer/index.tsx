import { formatTime } from "../../../../utils/formatTime";
import { TimerIcon } from "../../../icon/ARTimer";
import styles from "./index.module.css";

type TimerProps = {
	remainingTime: number;
};

export const ARTimer = ({ remainingTime }: TimerProps) => {
	const formattedTime = formatTime(remainingTime);

	return (
		<div className={styles["timer-box"]}>
			<TimerIcon />
			<span className={styles["timer-text"]}>{formattedTime}</span>
		</div>
	);
};
