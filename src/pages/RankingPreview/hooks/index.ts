import { useEffect, useState } from "react";
import type { Rank } from "../../../components/features/ranking/RankList";
import { baseUrl } from "../../../utils/baseUrl";
import { formatTime } from "../../../utils/formatTime";

type RankingResponse = {
	ranking_list: {
		username: string;
		clear_time: number;
		update_at: string;
	}[];
};

type UseRankingPreviewPage = {
	rankList: Rank[];
};

export const useRankingPreviewPage = (): UseRankingPreviewPage => {
	const [rankList, setRankList] = useState<Rank[]>([]);

	useEffect(() => {
		getRanking(3);
	}, []);

	const getRanking = async (limit: number) => {
		try {
			const response = await fetch(`${baseUrl}/ranking?limit=${limit}`, {
				headers: {
					Accept: "application/json",
				},
			});
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
		} catch (error) {
			console.error("Update ranking error:", error);
		}
	};

	return {
		rankList,
	};
};
