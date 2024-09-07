import { toFullWidth } from "../../../../utils/toFullWidth";
import styles from "./index.module.css";

type RankProps = {
	rankList: {
		name: string;
		time: string;
	}[];
};

export const RankList = ({ rankList }: RankProps) => {
	return (
		<ul className={styles.ranking}>
			{rankList.map((item, index) => (
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
						<span>{toFullWidth(item.name)}</span>
					</div>
					<span className={styles["ranking-time"]}>
						{toFullWidth(item.time)}
					</span>
				</li>
			))}
		</ul>
	);
};
