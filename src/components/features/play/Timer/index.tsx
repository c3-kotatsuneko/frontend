import { formatTime } from "../../../../utils/formatTime";
import { TimerIcon } from "../../../icon/Timer";
import styles from "./index.module.css";

type TimerProps = {
	remainingTime: number;
};

// 半角英数字を全角に変換
const toFullWidth = (input: string) => {
	const str = input.replace(/[A-Za-z0-9]/g, (s) => {
		return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
	});
	return str;
};

export const Timer = ({ remainingTime }: TimerProps) => {
	const formattedTime = formatTime(remainingTime);

	return (
		<div className={styles["timer-box"]}>
			<TimerIcon />
			<span className={styles["timer-text"]}>{toFullWidth(formattedTime)}</span>
		</div>
	);
};
