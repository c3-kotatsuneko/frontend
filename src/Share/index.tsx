import clsx from "clsx";

import { HomeIcon } from "../components/icon/home";
import { DefaultButton } from "../components/ui/Button";
import buttonStyles from "../components/ui/Button/index.module.css";
import styles from "./index.module.css";

const SAMPLE_RANK = 1;
const SAMPLE_TIME = "02:10";

export const SharePage = () => {
	const rank = SAMPLE_RANK;
	const time = SAMPLE_TIME;

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>ユーザー名</p>

			<div className={styles["share-container"]}>
				<div className={styles["share-text"]}>
					<img
						alt="おすわりねこ"
						src="cats/sitDown.png"
						width={64}
						height={65}
					/>
					<div>
						<span>おつかれさまにゃ！</span>
						<span>結果を共有してにゃ〜</span>
					</div>
				</div>

				<a
					className={styles["x-share-button"]}
					href={`http://twitter.com/share?text=ランキング${rank}位!%20タイム${time}!%0a%0a&hashtags=ばーちゃるぼっくす`}
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					X で結果をシェアする
				</a>
				<a
					className={styles["line-share-button"]}
					href={`https://social-plugins.line.me/lineit/share?&text=ランキング${rank}位!%20タイム${time}!%0a%0aばーちゃるぼっくすであそんだよ`}
					target="_blank"
					rel="noreferrer"
				>
					LINE で結果をシェアする
				</a>
			</div>

			<a className={styles["return-game"]} href="/mode-select">
				もういちどあそびにいく
			</a>

			<DefaultButton
				variant="outlined"
				className={clsx(buttonStyles["button-style"], styles["return-home"])}
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
