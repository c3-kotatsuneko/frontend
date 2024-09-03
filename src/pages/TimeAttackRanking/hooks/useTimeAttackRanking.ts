import type { Rank } from "../../../components/features/timeAttackRanking/RankList";
import { baseUrl } from "../../../utils/baseUrl";
import { formatTime } from "../../../utils/formatTime";

type TimeAttackRankingResponse = {
	highest_clear_time: number;
	is_new: boolean;
	can_record: boolean;
	ranking_list: {
		username: string;
		clear_time: number;
		update_at: string;
	}[];
};

type UpdateTimeAttackRankingResponse = {
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

const transformResToRank = (
	data: TimeAttackRankingResponse["ranking_list"],
) => {
	const transformedData: Rank[] = data.map(
		(item: { username: string; clear_time: number; update_at: string }) => ({
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
	return transformedData;
};

export const useTimeAttackRanking = () => {
	const getRanking = async (clearTime: number, limit: number) => {
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

			const data: TimeAttackRankingResponse = await response.json();

			const rankingList: Rank[] = transformResToRank(data.ranking_list);
			const lastHighestTime = data.highest_clear_time;
			const resultStatus = {
				isNew: data.is_new,
				canRecord: data.can_record,
			};
			return { rankingList, lastHighestTime, resultStatus };
		} catch (error) {
			console.error("Ranking error:", error);
		}
	};

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
				TimeAttackRankingResponse,
				"highest_clear_time" | "is_new" | "can_record"
			> = await response.json();

			const rankingList: Rank[] = transformResToRank(data.ranking_list);
			return rankingList;
		} catch (error) {
			console.error("Guest Ranking error:", error);
		}
	};

	const updateRanking = async (clearTime: number, limit: number) => {
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
			const data: UpdateTimeAttackRankingResponse = await response.json();

			const rankingList: Rank[] = transformResToRank(data.ranking_list);
			const rank = data.rank;
			return {
				rankingList,
				rank,
			};
		} catch (error) {
			console.error("Update Ranking error:", error);
		}
	};

	return {
		getRanking,
		getGuestRanking,
		updateRanking,
	};
};
