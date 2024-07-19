import type { ResultStatus } from "../../../../pages/Ranking/hooks";
import { formatTime } from "../../../../utils/formatTime";
import { DefaultButton } from "../../../ui/Button";
import { TextButton } from "../../../ui/TextButton";
import styles from "../ResultModalContent/index.module.css";

type ModalContentProps = {
	clearTime: number;
	lastHighestTime: number;
	resultStatus?: ResultStatus;
	setIsOpen: (isOpen: boolean) => void;
	handleUpdateRanking: (clearTime: number, limit: number) => void;
};

export const ResultModalContent: React.FC<ModalContentProps> = ({
	clearTime,
	lastHighestTime,
	resultStatus = {
		isNew: false,
		canRecord: false,
	},
	setIsOpen,
	handleUpdateRanking,
}) => {
	return (
		<div className={styles["modal-wrapper"]}>
			{resultStatus.isNew && (
				<p className={styles["modal-description"]}>⭐️自己ベスト更新⭐️</p>
			)}
			<p className={styles["modal-description"]}>
				きろくは{formatTime(clearTime)}！
			</p>
			{!resultStatus.canRecord && (
				<p className={styles["modal-description"]}>
					前回の最高記録は{formatTime(lastHighestTime)}！
				</p>
			)}
			{resultStatus.canRecord && (
				<div className={styles["modal-selection-wrapper"]}>
					<DefaultButton
						variant="contained"
						size="md"
						onClick={() => handleUpdateRanking(clearTime, 3)}
					>
						らんきんぐを更新する
					</DefaultButton>
					<TextButton onClick={() => setIsOpen(false)}>
						きろくを更新せず、らんきんぐへ
					</TextButton>
				</div>
			)}
			{!resultStatus.canRecord && (
				<div className={styles["modal-selection-wrapper"]}>
					<DefaultButton
						variant="contained"
						size="md"
						onClick={() => setIsOpen(false)}
					>
						らんきんぐへ
					</DefaultButton>
				</div>
			)}
		</div>
	);
};
