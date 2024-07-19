import styles from "./index.module.css";

export type Rank = {
	rank: number;
	name: string;
	date: string;
	time: string;
};

type RankProps = {
	rankList: Rank[];
};

export const RankList = ({ rankList }: RankProps) => {
	return (
		<ul className={styles["rank-list-container"]}>
			{rankList.map((rank) => (
				<li className={styles["rank-container"]} key={rank.rank}>
					<span>{rank.rank}位</span>
					<span className={styles["name-date-wrap"]}>
						<span>{rank.name}</span>{" "}
						<span className={styles["date-style"]}>{rank.date}</span>
					</span>
					<span className={styles["time-style"]}>{rank.time}</span>
				</li>
			))}
		</ul>
	);
};
