import type React from "react";
import styles from "./index.module.css";
import Signup from "../../components/features/welcome/SignupForm";
import Login from "../../components/features/welcome/LoginForm";
import Tab from "../../components/features/welcome/tab";

interface WelcomeProps {
	onLoginSubmit: (name: string, password: string) => void;
	onSignupSubmit: (name: string, password: string) => void;
	loginError: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({
	onLoginSubmit,
	onSignupSubmit,
	loginError,
}) => {
	return (
		<main className={styles["welcome-body"]}>
			<h2>ばーちゃるぼっくす</h2>
			<Tab
				labels={["ろぐいん", "とうろく"]}
				contents={[
					<Login
						key="login"
						onSubmit={onLoginSubmit}
						loginError={loginError}
					/>,
					<Signup key="signup" onSubmit={onSignupSubmit} />,
				]}
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
