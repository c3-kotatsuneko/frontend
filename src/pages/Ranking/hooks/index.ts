import { useCallback, useEffect, useState } from "react";
import type { Rank } from "../../../components/features/ranking/RankList";
import { baseUrl } from "../../../utils/baseUrl";
import { formatTime } from "../../../utils/formatTime";
import { useUserName } from "../../../utils/setUserName";

type RankingResponse = {
	highest_clear_time: number;
	is_new: true;
	can_record: true;
	ranking_list: {
		username: string;
		clear_time: number;
		update_at: string;
	}[];
};

type UpdateRankingResponse = {
	rank: number;
	is_new: false;
	clear_time: number;
	update_at: string;
	ranking_list: {
		username: string;
		clear_time: number;
		update_at: string;
	}[];
};

export type ResultStatus = {
	isNew: boolean;
	canRecord: boolean;
};

type UseRankingPage = {
	rankList: Rank[];
	clearTime: number;
	lastHighestTime: number;
	resultStatus: ResultStatus;
	handleUpdateRanking: (clearTime: number, limit: number) => void;
};

export const useRankingPage = (): UseRankingPage => {
	const { isGuest } = useUserName();
	const [clearTime, setClearTime] = useState(0);
	const [rankList, setRankList] = useState<Rank[]>([]);
	const [lastHighestTime, setLastHighestTime] = useState<number>(0);
	const [resultStatus, setResultStatus] = useState<ResultStatus>({
		isNew: false,
		canRecord: false,
	});

	const getRanking = useCallback(async (clearTime: number, limit: number) => {
		try {
			const response = await fetch(
				`${baseUrl}/record?clear_time=${clearTime}&limit=${limit}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data: RankingResponse = await response.json();

			const transformedData: Rank[] = data.ranking_list.map(
				(item: {
					username: string;
					clear_time: number;
					update_at: string;
				}) => ({
					userName: item.username,
					clearTime: formatTime(item.clear_time),
					date: new Date(item.update_at).toLocaleString([], {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					}),
				}),
			);
			setRankList(transformedData);
			setLastHighestTime(data.highest_clear_time);
			setResultStatus({
				isNew: data.is_new,
				canRecord: data.can_record,
			});

			localStorage.setItem(
				"resultStatus",
				JSON.stringify({
					isNew: data.is_new,
					canRecord: data.can_record,
				}),
			);
		} catch (error) {
			console.error("Update ranking error:", error);
		}
	}, []);

	useEffect(() => {
		const getClearTime = Number(localStorage.getItem("clearTime"));
		setClearTime(getClearTime);

		if (isGuest) {
			getGuestRanking(3);
		} else {
			getRanking(clearTime, 3);
		}
	}, [clearTime, getRanking, isGuest]);

	const getGuestRanking = async (limit: number) => {
		try {
			const response = await fetch(`${baseUrl}/ranking?limit=${limit}`, {
				headers: {
					Accept: "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data: Omit<
				RankingResponse,
				"highest_clear_time" | "is_new" | "can_record"
			> = await response.json();

			const transformedData: Rank[] = data.ranking_list.map(
				(item: {
					username: string;
					clear_time: number;
					update_at: string;
				}) => ({
					userName: item.username,
					clearTime: formatTime(item.clear_time),
					date: new Date(item.update_at).toLocaleString([], {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					}),
				}),
			);
			setRankList(transformedData);
		} catch (error) {
			console.error("Update ranking error:", error);
		}
	};

	const handleUpdateRanking = async (clearTime: number, limit: number) => {
		const body = JSON.stringify({ clear_time: clearTime, limit: limit });

		try {
			const response = await fetch(`${baseUrl}/ranking`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: body,
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: UpdateRankingResponse = await response.json();

			const transformedData: Rank[] = data.ranking_list.map(
				(item: {
					username: string;
					clear_time: number;
					update_at: string;
				}) => ({
					userName: item.username,
					clearTime: formatTime(item.clear_time),
					date: new Date(item.update_at).toLocaleString([], {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					}),
				}),
			);
			setRankList(transformedData);

			localStorage.setItem("userRank", data.rank.toString());
		} catch (error) {
			console.error("Ranking error:", error);
		}
	};

	return {
		rankList,
		clearTime,
		lastHighestTime,
		resultStatus,
		handleUpdateRanking,
	};
};
