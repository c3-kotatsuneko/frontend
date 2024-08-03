import { useEffect, useState } from "react";
import { Timer } from "../components/features/play/Timer";
import ARApp from "../Test/Test";
import styles from "./index.module.css";
import { useUserName } from "../utils/setUserName";
import ExitButton from "../components/features/play/ExitButton";
import { useNavigate } from "react-router-dom";

export const AR = () => {
  const navigate = useNavigate();
  const { userName } = useUserName();
  const [time, setTime] = useState(10);

  useEffect(() => {
    setInterval(() => {
      setTime(time - 1);
    }, 1000);
  }, [time]);

  // timeが0になったらrankingページへ遷移する
  useEffect(() => {
    localStorage.setItem("clearTime", "18");

    if (time === 0) {
      navigate("/ranking");
    }
  }, [navigate, time]);

  return (
    <main>
      <Timer remainingTime={time} />
      <p className={styles["user-name"]}>{userName}</p>
      <ARApp />
      <ExitButton />
    </main>
  );
};
