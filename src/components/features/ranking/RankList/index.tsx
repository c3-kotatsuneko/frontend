import styles from "./index.module.css";

export type Rank = {
  userName: string;
  clearTime: string;
  date: string;
};

type RankProps = {
  rankList: Rank[];
};

export const RankList = ({ rankList }: RankProps) => {
  return (
    <ul className={styles["rank-list-container"]}>
      {rankList.map((rank, index) => (
        <li className={styles["rank-container"]} key={rank.userName}>
          <div className={styles["rank-wrap"]}>
            <div data-rank={index + 1}>{index + 1}位</div>
            <span className={styles["name-date-wrap"]}>
              <span>{rank.userName}</span>
              <span className={styles["date-style"]}>{rank.date}</span>
            </span>
          </div>

          <span className={styles["time-style"]}>{rank.clearTime}</span>
        </li>
      ))}
    </ul>
  );
};
