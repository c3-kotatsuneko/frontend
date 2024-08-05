import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import { HomeIcon } from "../../components/icon/Home";
import { DefaultButton } from "../../components/ui/Button";
import buttonStyles from "../../components/ui/Button/index.module.css";
import styles from "./index.module.css";
import { useUserName } from "../../utils/setUserName";
import { useEffect, useState } from "react";
import type { ResultStatus } from "../Ranking/hooks";
import { formatTime } from "../../utils/formatTime";

export const SharePage = () => {
	const navigate = useNavigate();
	const { userName } = useUserName();
	const [userRank, setUserRank] = useState(0);
	const [clearTime, setClearTime] = useState(0);
	const [resultStatus, setResultStatus] = useState<ResultStatus>({
		isNew: false,
		canRecord: false,
	});

	useEffect(() => {
		const getUserRank = Number(localStorage.getItem("userRank"));
		const getClearTime = Number(localStorage.getItem("clearTime"));
		const getResultStatus = localStorage.getItem("resultStatus");

		if (getUserRank) {
			setUserRank(getUserRank);
		}
		if (getClearTime) {
			setClearTime(getClearTime);
		}
		if (getResultStatus) {
			setResultStatus(JSON.parse(getResultStatus));
		}

		// userRankが-1の場合はランキングに登録されていない
		if (getUserRank === -1) {
			setUserRank(0);
		}
	}, []);

	const shareMessage = resultStatus?.isNew
		? `自己ベスト更新！タイム${formatTime(clearTime)}!`
		: userRank
			? `ランキング${userRank}位！ タイム${formatTime(clearTime)}！`
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
						alt="おすわりねこ"
						src="cats/sitDown.webp"
						width={64}
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
