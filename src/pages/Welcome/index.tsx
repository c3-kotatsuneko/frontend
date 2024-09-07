import Tab from "../../components/features/welcome/tab";
import Signup from "./items/SignupForm";
import Login from "./items/LoginForm";
import styles from "./index.module.css";
import { DownloadButton } from "../../components/features/welcome/DownloadButton";

const Welcome = () => {
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
				src="/cats/catsTower-circle.webp"
				className={styles["main-logo"]}
				alt="logo"
				width="84"
				height="132"
			/>
		</main>
	);
};

export default Welcome;
