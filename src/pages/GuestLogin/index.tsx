import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { TextInput } from "../../components/ui/TextInput";
import styles from "./index.module.css";
import { useTimeAttackStore } from "../../store/useTimeAttackStore";
import { useUserStore } from "../../store/useUserStore";

export const GuestLoginPage = () => {
  const navigate = useNavigate();
  const { setResultStatus, setRank } = useTimeAttackStore();
  const { setName, setIsGuest } = useUserStore();
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    setResultStatus({ isNew: false, canRecord: false });
    // localStorage.removeItem("resultStatus");
    setName("");
    // localStorage.removeItem("userName");
    setRank(0);
    // localStorage.removeItem("userRank");
  }, [setRank, setResultStatus, setName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGuest(true);
    setName(guestName);
    // localStorage.setItem("guestName", name);
    navigate("/mode_select");
  };
  return (
    <main className={styles.root}>
      <p className={styles.title}>おなまえをおしえてください</p>
      <form className={styles["form-style"]} onSubmit={handleSubmit}>
        <TextInput
          label="おなまえ"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <DefaultButton color="redorange" type="submit">
          あそびにいく
        </DefaultButton>
      </form>
      <img
        className={styles["cats-image"]}
        alt="丸ねこタワー"
        src="cats/catsTower-circle.png"
        width={148}
        height={242}
      />
    </main>
  );
};
