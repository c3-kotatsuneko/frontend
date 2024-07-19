import { DefaultButton } from "../../components/ui/Button";
import { Rank, RankList } from "../../components/features/ranking/RankList";
import styles from "./index.module.css";
import { useRankingPreviewPage } from "./hooks";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";

type RankingResponse = {
  ranking_list: {
    username: string;
    clear_time: number;
    update_at: string;
  }[];
};

let rankList: Rank[] | null = null;

export const RankingPreviewPage = () => {
  const { getRanking } = useRankingPreviewPage();
  const navigate = useNavigate();

  if (rankList === null) {
    throw getRanking(3).then(async (res: Response) => {
      const data: RankingResponse = await res.json();
      rankList = data.ranking_list.map(
        (item: {
          username: string;
          clear_time: number;
          update_at: string;
        }) => ({
          userName: item.username,
          clearTime: formatTime(item.clear_time),
          date: new Date(item.update_at).toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
      );
    });
  }

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
