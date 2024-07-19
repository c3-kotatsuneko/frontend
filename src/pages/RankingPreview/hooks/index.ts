import { baseUrl } from "../../../utils/baseUrl";

type UseRankingPreviewPage = {
	getRanking: (limit: number) => Promise<Response>;
};

export const useRankingPreviewPage = (): UseRankingPreviewPage => {
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
