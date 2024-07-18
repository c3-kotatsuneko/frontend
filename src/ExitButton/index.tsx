import { useState } from "react";
import { DefaultButton } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import styles from "./index.module.css";

const ExitButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <DefaultButton onClick={() => setIsOpen(true)} color="blue" variant="outlined" size="sm">
                おかたづけ
            </DefaultButton>
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
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-row"]}>
                <p className={styles["modal-description"]}>
                    あれ？かえっちゃうの？
                </p>
                <img
                    alt="猫たわー"
                    src="cats/catsTower-circle.png"
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
                >
                    おうちへ
                </DefaultButton>
            </div>
        </div>
    );
};

export default ExitButton;
