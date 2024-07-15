import styles from "./index.module.css";

export const LoadingPage = () => {
  return (
    <main className={styles.root}>
      <p className={styles.loadingMessage}>ちょっと待ってね</p>
      <img
        className={styles.catsImage}
        alt="丸ねこタワー"
        src="catsTower-circle.png"
        height={216}
      />
    </main>
  );
};
