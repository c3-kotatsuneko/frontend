import { useState } from "react";
import { DefaultButton } from "../../../ui/Button";
import { Modal } from "../../../ui/Modal";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleExitButtonClick = () => {
		setIsOpen(false);
		navigate("/mode_select");
	};

	return (
		<>
			<DefaultButton
				className={styles["button-style"]}
				onClick={() => setIsOpen(true)}
				color="blue"
				variant="outlined"
				size="sm"
			>
				おかたづけ
			</DefaultButton>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalContent
					setIsOpen={setIsOpen}
					onExitButtonClick={handleExitButtonClick}
				/>
			</Modal>
		</>
	);
};

type ModalContentProps = {
	setIsOpen: (isOpen: boolean) => void;
	onExitButtonClick: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
	setIsOpen,
	onExitButtonClick,
}) => {
	return (
		<div className={styles["modal-wrapper"]}>
			<div className={styles["modal-row"]}>
				<p className={styles["modal-description"]}>あれ？かえっちゃうの？</p>
				<img
					alt="猫たわー"
					src="cats/catsTower-circle.webp"
					width={40}
					height={70}
				/>
			</div>
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
					onClick={onExitButtonClick}
				>
					おうちへ
				</DefaultButton>
			</div>
		</div>
	);
};

export default ExitButton;
