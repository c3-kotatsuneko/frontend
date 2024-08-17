import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { Timer } from "../../components/features/play/Timer";
import ARApp from "../../Test/Test";
import ExitButton from "../../components/features/play/ExitButton";
import { useUserStore } from "../../store/useUserStore";
import { useCountTimer } from "./hooks/useCountTimer";
import styles from "./index.module.css";

export const PlayTimeAttack = () => {
	const navigate = useNavigate();
	const setClearTime = useTimeAttackStore((state) => state.setClearTime);
	const { name: userName } = useUserStore();
	const [time, setTime] = useState(10);
	useCountTimer(time, setTime);

	// timeが0になったらrankingページへ遷移する
	useEffect(() => {
		// TODO: クリアタイムを取得する
		setClearTime(18);

		// TODO: クリアしたらrankingページに遷移する?
		if (time === 0) {
			navigate("/ranking");
		}
	}, [navigate, time, setClearTime]);

	return (
		<main>
			<Timer remainingTime={time} />
			<p className={styles["user-name"]}>{userName}</p>
			<ARApp />
			<ExitButton />
		</main>
	);
};
