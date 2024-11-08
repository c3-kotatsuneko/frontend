import { DefaultButton } from "../../components/ui/Button";
import { TextInput } from "../../components/ui/TextInput";
import { useGuestLogin } from "./hooks";
import styles from "./index.module.css";

export const GuestLoginPage = () => {
  const { guestName, setGuestName, handleSubmit } = useGuestLogin();

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
        src="cats/boss_smile.webp"
        width={149}
        height={200}
      />
    </main>
  );
};
