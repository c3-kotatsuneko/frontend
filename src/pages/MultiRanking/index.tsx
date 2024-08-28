import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../../components/icon/Home";
import { DefaultButton } from "../../components/ui/Button";
import buttonStyles from "../../components/ui/Button/index.module.css";
import { RankList } from "../../components/features/multipyayRanking/RankList";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";

// TODO: 本来はAPIから取得する
const RANKING_LIST = [
	{ name: "たろう", time: "04:11" },
	{ name: "じろう", time: "04:11" },
	{ name: "ユーザー4", time: "04:11" },
	{ name: "しろう", time: "04:11" },
];

export const MultiRankingPage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>

			<p className={styles.title}>けっかはっぴょう</p>

			<div>
				<RankList rankList={RANKING_LIST} />
				<img
					className={styles.image}
					alt="猫たわー"
					src="cats/catsTower-circle.webp"
					width={44}
					height={73}
				/>
			</div>

			<DefaultButton color="redorange" onClick={() => navigate("/guest_login")}>
				もういちどあそぶ
			</DefaultButton>
			<DefaultButton
				variant="outlined"
				size="sm"
				className={clsx(buttonStyles["button-style"], styles["return-home"])}
				onClick={() => navigate("/mode_select")}
			>
				<HomeIcon
					variant={{ color: "blue" }}
					style={{ width: "24px", height: "24px" }}
				/>
				おうちへ
			</DefaultButton>
		</main>
	);
};
