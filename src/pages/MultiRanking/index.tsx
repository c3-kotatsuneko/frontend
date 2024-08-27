import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../../components/icon/Home";
import { DefaultButton } from "../../components/ui/Button";
import buttonStyles from "../../components/ui/Button/index.module.css";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";

// TODO: 本来はAPIから取得する
const RANKING_LIST = [
	{ name: "たろう", time: "04:11" },
	{ name: "じろう", time: "04:11" },
	{ name: "さぶろう", time: "04:11" },
	{ name: "しろう", time: "04:11" },
];

export const MultiRankingPage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>

			<p className={styles.title}>けっかはっぴょう</p>

			<div className={styles["ranking-container"]}>
				<ul className={styles.ranking}>
					{RANKING_LIST.map((item, index) => (
						<li key={item.name} className={styles["ranking-item"]}>
							{index === 0 && (
								<img
									className={styles["image-crown"]}
									alt="crown"
									src="crown.webp"
									width={24}
									height={24}
								/>
							)}
							<div className={styles["name-wrap"]}>
								<span>{index + 1}位</span>
								<span>{item.name}</span>
							</div>
							<span className={styles["ranking-time"]}>{item.time}</span>
						</li>
					))}
				</ul>
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
