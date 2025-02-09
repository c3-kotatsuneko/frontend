import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { useUserStore } from "../../store/useUserStore";
import { formatTime } from "../../utils/formatTime";
import styles from "./index.module.css";

export const MultiWaitingPage = () => {
	const userName = useUserStore((state) => state.name);
	const clearTime = useTimeAttackStore((state) => state.clearTime);
	//   const rank = useTimeAttackStore((state) => state.rank);
	const formattedTime = formatTime(clearTime);

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>
			{/* <p className={styles.result}>
				{rank}位 {userName}
			</p> */}
			<p className={styles["result-time"]}>{formattedTime}</p>
			<p className={styles.message}>
				他のおともだちが終わるまでちょっとまってね
			</p>
			<img
				className={styles["cats-image"]}
				alt="走るねこ"
				src="/cats/running.webp"
				width={180}
				height={71}
			/>
		</main>
	);
};
