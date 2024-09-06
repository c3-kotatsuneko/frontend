import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";

export const MultiModePage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();
	// TODO: useSocketRefStoreを更新し、positionを取得する
	const position = "front";

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>
			<p className={styles.message}>ここに移動してね</p>
			<img
				className={styles.marker}
				src={`/marker/${position}.png`}
				alt={position}
				width={300}
				height={300}
			/>
			<DefaultButton
				color="redorange"
				onClick={() => navigate(`/marker_scan?position=${position}`)}
			>
				いどう、したよ！
			</DefaultButton>
		</main>
	);
};
