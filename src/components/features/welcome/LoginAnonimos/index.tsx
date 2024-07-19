import { useState } from "react";
import { DefaultButton } from "../../../ui/Button";
import { Modal } from "../../../ui/Modal";
import styles from "./index.module.css";
import { TextButton } from "../../../ui/TextButton";
import { useNavigate } from "react-router-dom";

const LoginAnonymous = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleGuestLoginClick = () => {
		setIsOpen(false);
		navigate("/guest_login");
	};

	return (
		<>
			<TextButton onClick={() => setIsOpen(true)} color="blue">
				ゲストとしてあそびにいく
			</TextButton>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalContent
					setIsOpen={setIsOpen}
					onGuestLoginClick={handleGuestLoginClick}
				/>
			</Modal>
		</>
	);
};

type ModalContentProps = {
	setIsOpen: (isOpen: boolean) => void;
	onGuestLoginClick: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
	setIsOpen,
	onGuestLoginClick,
}) => {
	return (
		<div className={styles["modal-wrapper"]}>
			<p className={styles["modal-description"]}>
				ゲストだとランキング機能が 使えないよ？
			</p>
			<div className={styles["modal-selection-wrapper"]}>
				<DefaultButton
					className={styles["selection-button"]}
					variant="outlined"
					onClick={() => setIsOpen(false)}
				>
					もどる
				</DefaultButton>
				<DefaultButton
					className={styles["selection-button"]}
					variant="contained"
					onClick={onGuestLoginClick}
				>
					いいよ
				</DefaultButton>
			</div>
		</div>
	);
};

export default LoginAnonymous;
