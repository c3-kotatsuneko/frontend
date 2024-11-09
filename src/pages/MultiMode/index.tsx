import { useLocation, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";
import { useSocketRefStore } from "../../store/useSocketRefStore";

export const MultiModePage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();
	const { setDirection } = useSocketRefStore();
	// TODO: useSocketRefStoreを更新し、positionを取得する
	//   const position = useSocketRefStore((state) => state.eventState.direction);
	const param = new URLSearchParams(useLocation().search);
	const paramPosition = param.get("position") ?? "front";

	const getPositionValue = (position: string) => {
		switch (position) {
			case "front":
				return 1;
			case "back":
				return 2;
			case "left":
				return 3;
			case "right":
				return 4;
			default:
				return 0;
		}
	};

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>
			<p className={styles.message}>ここに移動してね</p>
			<img
				className={styles.marker}
				src={`/marker/${paramPosition}.png`}
				alt={paramPosition}
				width={300}
				height={300}
			/>
			<DefaultButton
				color="redorange"
				onClick={() => {
					setDirection(getPositionValue(paramPosition));
					navigate(`/multi_Entrance?position=${paramPosition}`);
				}}
			>
				いどう、したよ！
			</DefaultButton>
		</main>
	);
};
