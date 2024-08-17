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

	useEffect(() => {
		// コンポーネントがマウントされたときにすべての対象要素を削除する処理
		const cleanUp = () => {
			// すべてのvideo要素を削除
			const videoElements = document.querySelectorAll("video");
			for (const element of videoElements) {
				element.remove();
			}

			// data-engineがthree.js r166のすべてのcanvas要素を削除
			const canvasElements = document.querySelectorAll("canvas");
			for (const element of canvasElements) {
				element.remove();
			}

			// 外部スクリプトを削除
			const scriptElements = document.querySelectorAll("script");
			for (const element of scriptElements) {
				element.remove();
			}
		};

		// コンポーネントがアンマウントされるときにクリーンアップを実行
		return () => {
			cleanUp();
		};
	}, []);

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
