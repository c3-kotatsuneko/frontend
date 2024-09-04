import styles from "./index.module.css";

export const StartCountdown = ({ startTime }: { startTime: number }) => {
	return (
		<div className={styles.root}>
			<p className={styles.text} data-time={startTime}>
				{startTime !== 0 ? startTime : "スタート"}
			</p>
		</div>
	);
};
