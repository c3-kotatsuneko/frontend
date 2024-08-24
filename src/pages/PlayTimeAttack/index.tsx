import { useEffect } from "react";
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
	const { time } = useCountTimer(10);

	//TODO: 無限レンダリングを直す。これは無限レンダリングにより生成される要素を一時的に削除している
	useEffect(() => {
		const cleanUp = () => {
			const videoElements = document.querySelectorAll("video");
			for (const element of videoElements) {
				element.remove();
			}
			const canvasElements = document.querySelectorAll("canvas");
			for (const element of canvasElements) {
				element.remove();
			}
			const scriptElements = document.querySelectorAll("script");
			for (const element of scriptElements) {
				element.remove();
			}
		};
		return () => {
			cleanUp();
		};
	}, []);

	// timeが0になったらrankingページへ遷移する
	useEffect(() => {
		// TODO: クリアタイムを取得する
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
