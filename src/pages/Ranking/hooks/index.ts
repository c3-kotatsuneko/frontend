import { useEffect, useState } from "react";
import type { Rank } from "../../../components/features/ranking/RankList";
import { useTimeAttackStore } from "../../../store/useTimeAttackStore";
import { useUserStore } from "../../../store/useUserStore";
import { useRanking } from "./useRanking";

export type ResultStatus = {
	isNew: boolean;
	canRecord: boolean;
};

type UseRankingPage = {
	rankingList: Rank[];
	clearTime: number;
	lastHighestTime: number;
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	resultStatus: ResultStatus;
	handleUpdateRanking: (clearTime: number, limit: number) => void;
};

export const useRankingPage = (): UseRankingPage => {
	const { isGuest } = useUserStore();
	const { getRanking, getGuestRanking, updateRanking } = useRanking();

	const { clearTime, resultStatus, setResultStatus, setRank } =
		useTimeAttackStore();
	const [rankingList, setRankingList] = useState<Rank[]>([]);
	const [lastHighestTime, setLastHighestTime] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState(true);

	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
	}, []);

	const handleGetRanking = async (clearTime: number, limit: number) => {
		await getRanking(clearTime, limit).then((data) => {
			if (!data) return;
			setRankingList(data.rankingList);
			setLastHighestTime(data.lastHighestTime);
			setResultStatus(data.resultStatus);
		});
	};

	const handleGetGuestRanking = async (limit: number) => {
		await getGuestRanking(limit).then((data) => {
			if (!data) return;
			setRankingList(data);
		});
	};

	useEffect(() => {
		if (isGuest) {
			handleGetGuestRanking(3);
		} else {
			handleGetRanking(clearTime, 3);
		}
	}, []);

	const handleUpdateRanking = async (clearTime: number, limit: number) => {
		await updateRanking(clearTime, limit).then((data) => {
			if (!data) return;
			setRankingList(data.rankingList);
			setRank(data.rank);
		});
		setIsModalOpen(false);
	};

	return {
		rankingList,
		clearTime,
		lastHighestTime,
		isModalOpen,
		setIsModalOpen,
		resultStatus,
		handleUpdateRanking,
	};
};
