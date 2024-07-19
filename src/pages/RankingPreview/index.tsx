import { DefaultButton } from "../../components/ui/Button";
import { RankList } from "../../components/features/ranking/RankList";
import styles from "./index.module.css";
import { useRankingPreviewPage } from "./hooks";
import { useNavigate } from "react-router-dom";

export const RankingPreviewPage = () => {
	const { rankList } = useRankingPreviewPage();
	const navigate = useNavigate();

	return (
		<main className={styles.root}>
			<img alt="crown" src="crown.png" width={120} height={120} />

			<div className={styles["ranking-container"]}>
				<span className={styles["title-text"]}>たいむあたっく</span>
				<RankList rankList={rankList} />
			</div>

			<DefaultButton onClick={() => navigate("/mode_select")}>
				おっけー
			</DefaultButton>

			<img
				className={styles.image}
				alt="猫たわー"
				src="cats/catsTower-circle.png"
				width={70}
				height={115}
			/>
		</main>
	);
};
