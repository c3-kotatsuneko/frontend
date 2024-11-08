import { useEffect } from "react";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useSocketRefStore } from "../../store/useSocketRefStore";
import { Event, Mode, type Player } from "../../proto/game/resources/game_pb";
import { useUserStore } from "../../store/useUserStore";

export const PlayStart = () => {
  const navigate = useNavigate();
  const position = useSocketRefStore((state) => state.eventState.direction);
  const eventSend = useSocketRefStore((state) => state.eventSend);
  const roomId = useSocketRefStore((state) => state.eventState.roomId);
  const name = useUserStore((state) => state.name);

  useEffect(() => {
    document.getElementById("arjs-video")?.remove();
  }, []);

  return (
    <main className={styles.root}>
      <p className={styles["start-message"]}>みんなあつまったかな？</p>
      <DefaultButton
        color="redorange"
        size="lg"
        onClick={() => {
          eventSend({
            roomId: roomId,
            event: Event.GAME_START,
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

          navigate(`/play_multi?position=${position}`);
        }}
      >
        げーむ すたーと！
      </DefaultButton>
      <img
        className={styles["cats-image"]}
        alt="ボスねこ笑"
        src="/cats/boss_smile.webp"
        width={180}
        height={242}
      />
    </main>
  );
};
