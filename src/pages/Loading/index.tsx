import styles from "./index.module.css";

export const LoadingPage = () => {
  return (
    <main className={styles.root}>
      <p className={styles["loading-message"]}>ちょっと待ってね</p>
      <img alt="ボスねこ" src="/cats/boss.webp" width={182} height={242} />
    </main>
  );
};
