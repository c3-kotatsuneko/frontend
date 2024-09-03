import LoginAnonymous from "../../../../components/features/welcome/LoginAnonimos";
import { TextInput } from "../../../../components/ui/TextInput";
import { PasswordInput } from "../../../../components/ui/PasswordInput";
import { WelcomeButton } from "../../../../components/features/welcome/WelcomeButton";
import { useLoginForm } from "../../hooks/useLoginForm";
import styles from "./index.module.css";

const Login = () => {
	const { userName, password, loginError, setUserName, setPassword, onSubmit } =
		useLoginForm();

	return (
		<form className={styles["login-form"]} onSubmit={onSubmit}>
			<TextInput
				label={"おなまえ"}
				type="text"
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<PasswordInput
				label={"おまじない"}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				<WelcomeButton
					color="brown"
					disabled={userName === "" || password === ""}
				>
					あそびにいく
				</WelcomeButton>
				{loginError && <p className={styles.error}>{loginError}</p>}
			</div>

			<LoginAnonymous />
		</form>
	);
};

export default Login;
