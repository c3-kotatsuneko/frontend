import styles from "./index.module.css";

export const StartCountdown = ({ startTime }: { startTime: number }) => {
	return (
		<div className={styles.root}>
			<p>{startTime}</p>
		</div>
	);
};
