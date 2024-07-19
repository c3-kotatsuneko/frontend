import { DefaultButton } from "../../components/ui/Button";
import {
	type Rank,
	RankList,
} from "../../components/features/ranking/RankList";
import styles from "./index.module.css";

const RANK_LIST: Rank[] = [
	{
		rank: 1,
		name: "bob",
		date: "2024/07/08/17:00",
		time: "05:00",
	},
	{
		rank: 2,
		name: "alice",
		date: "2024/07/08/17:00",
		time: "05:00",
	},
	{
		rank: 3,
		name: "charlie",
		date: "2024/07/08/17:00",
		time: "05:00",
	},
];

export const RankingPage = () => {
	return (
		<main className={styles.root}>
			<img alt="crown" src="crown.png" width={120} height={120} />

			<div className={styles["ranking-container"]}>
				<span className={styles["title-text"]}>たいむあたっく</span>
				<RankList rankList={RANK_LIST} />
			</div>

			<DefaultButton>おっけー</DefaultButton>

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
