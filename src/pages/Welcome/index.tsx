import Tab from "../../components/features/welcome/tab";
import Signup from "./items/SignupForm";
import Login from "./items/LoginForm";
import styles from "./index.module.css";

const Welcome = () => {
  return (
    <main className={styles["welcome-body"]}>
      <h2>ばーちゃるぼっくす</h2>
      <Tab
        labels={["ろぐいん", "とうろく"]}
        contents={[<Login key="login" />, <Signup key="signup" />]}
        id={""}
      />
      <img
        src="/cats/catsTower-circle.png"
        className={styles["main-logo"]}
        alt="logo"
        width="84"
        height="132"
      />
    </main>
  );
};

export default Welcome;
