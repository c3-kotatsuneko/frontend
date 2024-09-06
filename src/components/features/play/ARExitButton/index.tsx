import { useState } from "react";
import { ARDefaultButton } from "../../../ui/ARbutton";
import { ARModal } from "../../../ui/ARModal";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleExitButtonClick = () => {
    setIsOpen(false);
    //canvasを全て削除する
    const canvases = document.querySelectorAll("canvas");
    for (const canvas of canvases) {
      canvas.remove();
    }
    //type="module"のscriptタグ以外全て削除する
    const scripts = document.querySelectorAll("script");
    for (const script of scripts) {
      if (script.type !== "module") {
        script.remove();
      }
    }
    navigate("/mode_select");
  };

  return (
    <>
      <ARDefaultButton
        className={styles["button-style"]}
        onClick={() => setIsOpen(true)}
        color="blue"
        variant="outlined"
        size="md"
      >
        おかたづけ
      </ARDefaultButton>
      <ARModal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent
          setIsOpen={setIsOpen}
          onExitButtonClick={handleExitButtonClick}
        />
      </ARModal>
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
          width={280}
          height={490}
        />
      </div>
      <div className={styles["modal-selection-wrapper"]}>
        <ARDefaultButton
          className={styles["selection-button"]}
          variant="outlined"
          onClick={() => setIsOpen(false)}
        >
          もどる
        </ARDefaultButton>
        <ARDefaultButton
          className={styles["selection-button"]}
          variant="contained"
          onClick={onExitButtonClick}
        >
          おうちへ
        </ARDefaultButton>
      </div>
    </div>
  );
};

export default ExitButton;
