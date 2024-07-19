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

const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const formattedSeconds =
		remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

	return `${formattedMinutes}:${formattedSeconds}`;
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
