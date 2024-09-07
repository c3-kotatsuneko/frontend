import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { RankList } from "../../components/features/timeAttackRanking/RankList";
import { Modal } from "../../components/ui/Modal";
import { ResultModalContent } from "../../components/features/timeAttackRanking/ResultModalContent";
import { useRankingPage } from "./hooks";
import styles from "./index.module.css";

export const TimeAttackRankingPage = () => {
	const navigate = useNavigate();
	const {
		rankingList,
		clearTime,
		lastHighestTime,
		isModalOpen,
		setIsModalOpen,
		resultStatus,
		handleUpdateRanking,
	} = useRankingPage();

	return (
		<main className={styles.root}>
			<img alt="crown" src="crown.webp" width={120} height={120} />

			<div className={styles["ranking-container"]}>
				<span className={styles["title-text"]}>たいむあたっく</span>
				<RankList rankList={rankingList} />
			</div>

			<DefaultButton onClick={() => navigate("/congratulation_share_sns")}>
				おっけー
			</DefaultButton>

			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ResultModalContent
					clearTime={clearTime}
					setIsOpen={setIsModalOpen}
					lastHighestTime={lastHighestTime}
					resultStatus={resultStatus}
					handleUpdateRanking={handleUpdateRanking}
				/>
			</Modal>

			<img
				className={styles.image}
				alt="猫たわー"
				src="cats/catsTower-circle.webp"
				width={70}
				height={115}
			/>
		</main>
	);
};
