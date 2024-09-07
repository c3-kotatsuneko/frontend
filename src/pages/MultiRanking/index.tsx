import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../../components/icon/Home";
import { DefaultButton } from "../../components/ui/Button";
import buttonStyles from "../../components/ui/Button/index.module.css";
import { RankList } from "../../components/features/multipyayRanking/RankList";
import { useUserStore } from "../../store/useUserStore";
import styles from "./index.module.css";
import { useSocketRefStore } from "../../store/useSocketRefStore";
import { formatTime } from "../../utils/formatTime";
import { useEffect } from "react";
import { Event, Mode, Player } from "../../proto/game/resources/game_pb";

export const MultiRankingPage = () => {
  const navigate = useNavigate();
  const { name: userName } = useUserStore();
  const players = useSocketRefStore((state) => state.eventState.players);

  const eventSend = useSocketRefStore((state) => state.eventSend);
  const roomId = useSocketRefStore((state) => state.eventState.roomId);
  const name = useUserStore((state) => state.name);

  useEffect(() => {
    eventSend({
      roomId: roomId,
      event: Event.RESULT,
      mode: Mode.MULTI,
      player: {
        playerId: name,
        name: name,
        color: "red",
        score: 0,
        rank: 1,
        time: 0,
      } as Player,
    });
  }, []);
  const result = players.map((player) => ({
    name: player.name,
    time: formatTime(player.time),
  }));

  return (
    <main className={styles.root}>
      <p className={styles["user-name"]}>{userName}</p>

      <p className={styles.title}>けっかはっぴょう</p>

      <div>
        <RankList rankList={result} />
        <img
          className={styles.image}
          alt="猫たわー"
          src="cats/catsTower-circle.webp"
          width={44}
          height={73}
        />
      </div>

      <DefaultButton color="redorange" onClick={() => navigate("/guest_login")}>
        もういちどあそぶ
      </DefaultButton>
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
