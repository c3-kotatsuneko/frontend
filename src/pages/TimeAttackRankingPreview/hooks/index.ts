import { baseUrl } from "../../../utils/baseUrl";

type UseTimeAttackRankingPreviewPage = {
	getRanking: (limit: number) => Promise<Response>;
};

export const useTimeAttackRankingPreviewPage =
	(): UseTimeAttackRankingPreviewPage => {
		const getRanking = async (limit: number) => {
			return await fetch(`${baseUrl}/ranking?limit=${limit}`, {
				headers: {
					Accept: "application/json",
				},
			});
		};

		return {
			getRanking,
		};
	};
