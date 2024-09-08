import { useEffect } from "react";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { ARfunction } from "../AR";
// import { ARTimer } from "../../components/features/play/ARTimer";
// import { usePlayTimeAttack } from "./hooks";
// import styles from "./index.module.css";
// import ExitButton from "../../components/features/play/ARExitButton";
// import { useUserStore } from "../../store/useUserStore";
// import { useSocketRefStore } from "../../store/useSocketRefStore";

export const PlayTimeAttack = () => {
  const setClearTime = useTimeAttackStore((state) => state.setClearTime);
  // const { name: userName } = useUserStore();
  // const time = useSocketRefStore((state) => state.eventState.time);

  // timeが0になったらrankingページへ遷移する
  useEffect(() => {
    setClearTime(18);

    // if (time === 0) {
    //   navigate("/ranking_timeAttack");
    // }
  }, [setClearTime]);

  return (
    <main>
      <ARfunction />
    </main>
  );
};
