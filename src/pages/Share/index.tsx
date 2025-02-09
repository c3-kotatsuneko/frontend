import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../components/icon/Home";
import { DefaultButton } from "../../components/ui/Button";
import buttonStyles from "../../components/ui/Button/index.module.css";
import { formatTime } from "../../utils/formatTime";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";

export const SharePage = () => {
	const navigate = useNavigate();
	const { name: userName } = useUserStore();
	const { clearTime, resultStatus, rank } = useTimeAttackStore();

	const shareMessage = resultStatus?.isNew
		? `自己ベスト更新！タイム${formatTime(clearTime)}!`
		: rank
			? `ランキング${rank}位！ タイム${formatTime(clearTime)}！`
			: `タイムは${formatTime(clearTime)}！`;

	const encodedLineShareMessage = encodeURIComponent(
		`${shareMessage}\n\nばーちゃるぼっくすであそんだよ`,
	);

	return (
		<main className={styles.root}>
			<p className={styles["user-name"]}>{userName}</p>
			<div className={styles["share-container"]}>
				<div className={styles["share-text"]}>
					<img
						className={styles.image}
						alt="ボスねこ笑"
						src="cats/boss_smile.webp"
						width={48}
						height={65}
					/>
					<div>おつかれさまにゃ！ 結果を共有してにゃ〜</div>
				</div>

				<a
					className={styles["x-share-button"]}
					href={`http://twitter.com/share?text=${shareMessage}%0a%0a&hashtags=ばーちゃるぼっくす`}
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					X で結果をシェアする
				</a>
				<a
					className={styles["line-share-button"]}
					href={`https://line.me/R/share?text=${encodedLineShareMessage}`}
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					LINE で結果をシェアする
				</a>
			</div>

			<Link className={styles["return-game"]} to="/guest_login">
				もういちどあそびにいく
			</Link>
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
