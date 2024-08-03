import { TextInput } from "../../../../components/ui/TextInput";
import { PasswordInput } from "../../../../components/ui/PasswordInput";
import { WelcomeButton } from "../../../../components/features/welcome/WelcomeButton";
import { useSignupForm } from "../../hooks/useSignupForm";
import styles from "./index.module.css";

const Signup = () => {
  const {
    userName,
    omajinai,
    userExistsMessage,
    handleChangeUserName,
    setOmajinai,
    onSubmit,
  } = useSignupForm();

  return (
    <form className={styles["login-form"]} onSubmit={onSubmit}>
      <div>
        <TextInput
          label={"おなまえ"}
          type="text"
          value={userName}
          onChange={handleChangeUserName}
        />
        {userExistsMessage && (
          <p className={styles.message}>{userExistsMessage}</p>
        )}
      </div>

      <PasswordInput
        label={"おまじない"}
        value={omajinai}
        onChange={(e) => setOmajinai(e.target.value)}
      />
      <WelcomeButton
        type="submit"
        color="redorange"
        disabled={
          userExistsMessage !== "" || userName === "" || omajinai === ""
        }
      >
        とうろくする
      </WelcomeButton>
    </form>
  );
};

export default Signup;
