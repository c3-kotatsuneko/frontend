import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Tab from "../../components/features/welcome/tab";
import Signup from "./items/SignupForm";
import Login from "./items/LoginForm";
import styles from "./index.module.css";
import { DownloadButton } from "../../components/features/welcome/DownloadButton";
import { useSocketRefStore } from "../../store/useSocketRefStore";

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const setRoomId = useSocketRefStore((state) => state.setRoomId);

  useEffect(() => {
    const roomIdParam = searchParams.get("roomId");
    if (roomIdParam) {
      setRoomId(roomIdParam);
      console.log("Room ID 取得", roomIdParam);
    }
  }, [searchParams, setRoomId]);

  return (
    <main className={styles["welcome-body"]}>
      <div className={styles["download-button"]}>
        <DownloadButton />
      </div>
      <h2>ばーちゃるぼっくす</h2>
      <Tab
        labels={["ろぐいん", "とうろく"]}
        contents={[<Login key="login" />, <Signup key="signup" />]}
        id={""}
      />
      <img
        src="/cats/boss.webp"
        className={styles["boss-cat"]}
        alt="ボスねこ"
        width="98"
        height="130"
      />
      <img
        src="/cats/maru.webp"
        className={styles["maru-cat"]}
        alt="丸ねこ"
        width="110"
        height="50"
      />
      <img
        src="/cats/sikaku.webp"
        className={styles["sikaku-cat"]}
        alt="四角ねこ"
        width="95"
        height="50"
      />
    </main>
  );
};

export default Welcome;
