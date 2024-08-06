import { useEffect, useState } from "react";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { Timer } from "../../components/features/play/Timer";
import ARApp from "../../Test/Test";
import styles from "./index.module.css";
import ExitButton from "../../components/features/play/ExitButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

export const PlayTimeAttack = () => {
	const navigate = useNavigate();
	const setClearTime = useTimeAttackStore((state) => state.setClearTime);
	const { name: userName } = useUserStore();
	const [time, setTime] = useState(10);

	useEffect(() => {
		setInterval(() => {
			setTime(time - 1);
		}, 1000);
	}, [time]);

	// timeが0になったらrankingページへ遷移する
	useEffect(() => {
		setClearTime(18);

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
