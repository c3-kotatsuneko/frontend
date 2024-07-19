import { DefaultButton } from "../../components/ui/Button";
import { RankList } from "../../components/features/ranking/RankList";
import { Modal } from "../../components/ui/Modal";
import styles from "./index.module.css";
import { useRankingPage } from "./hooks";
import { useState } from "react";
import { ResultModalContent } from "../../components/features/ranking/ResultModalContent";

export const RankingPage = () => {
  const {
    rankList,
    clearTime,
    lastHighestTime,
    resultStatus,
    handleUpdateRanking,
  } = useRankingPage();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className={styles.root}>
      <img alt="crown" src="crown.png" width={120} height={120} />

      <div className={styles["ranking-container"]}>
        <span className={styles["title-text"]}>たいむあたっく</span>
        <RankList rankList={rankList} />
      </div>

      <DefaultButton>おっけー</DefaultButton>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ResultModalContent
          clearTime={clearTime}
          setIsOpen={setIsOpen}
          lastHighestTime={lastHighestTime}
          resultStatus={resultStatus}
          handleUpdateRanking={handleUpdateRanking}
        />
      </Modal>

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
