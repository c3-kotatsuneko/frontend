import { useState } from "react";
import { DefaultButton } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import styles from "./LoginAnonymous.module.css"
import { TextButton } from "../components/ui/TextButton";

const LoginAnonymous = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<TextButton onClick={() => setIsOpen(true)} color="blue">
				ゲストとしてあそびにいく
			</TextButton>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalContent setIsOpen={setIsOpen} />
			</Modal>
		</>
	);
};

type ModalContentProps = {
	setIsOpen: (isOpen: boolean) => void;
};

const ModalContent: React.FC<ModalContentProps> = ({ setIsOpen }) => {
	return (
		<div className={styles['modal-wrapper']}>
			<p className={styles['modal-description']}>ゲストだとランキング機能が 使えないよ？</p>
			<div className={styles['modal-selection-wrapper']}>
				<DefaultButton
					className={styles['selection-button']}
					variant="outlined"
					onClick={() => setIsOpen(false)}
				>
					もどる！
				</DefaultButton>
				<DefaultButton className={styles['selection-button']} variant="contained">
					いいよ！
				</DefaultButton>
			</div>
		</div>
	);
};

export default LoginAnonymous;
