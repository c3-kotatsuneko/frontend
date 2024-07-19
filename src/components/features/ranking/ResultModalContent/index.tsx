import type { ResultStatus } from "../../../../pages/Ranking/hooks";
import { formatTime } from "../../../../utils/formatTime";
import { DefaultButton } from "../../../ui/Button";
import { TextButton } from "../../../ui/TextButton";

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
		<div>
			{resultStatus.isNew && <p>⭐️自己ベスト更新⭐️</p>}
			<p>きろくは{formatTime(clearTime)}！</p>
			{!resultStatus.canRecord && (
				<p>前回の最高記録は{formatTime(lastHighestTime)}！</p>
			)}
			{resultStatus.canRecord && (
				<div>
					<DefaultButton
						variant="contained"
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
				<DefaultButton variant="contained" onClick={() => setIsOpen(false)}>
					らんきんぐへ
				</DefaultButton>
			)}
		</div>
	);
};
