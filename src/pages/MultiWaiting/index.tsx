import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";

export const MultiWaitingPage = () => {
	const userName = useUserStore((state) => state.name);
	const clearTime = useTimeAttackStore((state) => state.clearTime);
	const rank = useTimeAttackStore((state) => state.rank);

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>
			<p className={styles.result}>
				{rank}位 {userName}
			</p>
			<p className={styles["result-time"]}>{clearTime}</p>
			<p className={styles.message}>
				他のおともだちが終わるまでちょっとまってね
			</p>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.webp"
				width={132}
				height={222}
			/>
		</main>
	);
};
