import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";
import { useSocketRefStore } from "../../store/useSocketRefStore";

export const MultiModePage = () => {
  const navigate = useNavigate();
  const { name: userName } = useUserStore();
  // TODO: useSocketRefStoreを更新し、positionを取得する
  const position = useSocketRefStore((state) => state.eventState.direction);

  return (
    <main className={styles.root}>
      <p className={styles["user-name"]}>{userName}</p>
      <p className={styles.message}>ここに移動してね</p>
      <img
        className={styles.marker}
        src={`/marker/${position}.webp`}
        alt={position}
        width={300}
        height={300}
      />
      <DefaultButton
        color="redorange"
        onClick={() => navigate(`/multi_Entrance?position=${position}`)}
      >
        いどう、したよ！
      </DefaultButton>
    </main>
  );
};
