import { useEffect, useState } from "react";
import type { Rank } from "../../../components/features/ranking/RankList";
import { baseUrl } from "../../../utils/baseUrl";
import { formatTime } from "../../../utils/formatTime";

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

export type ResultStatus = {
  isNew: boolean;
  canRecord: boolean;
};

type UseRankingPage = {
  rankList: Rank[];
  clearTime: number;
  lastHighestTime: number;
  resultStatus: ResultStatus;
  handleUpdateRanking: (clearTime: number) => void;
};

export const useRankingPage = (): UseRankingPage => {
  const [rankList, setRankList] = useState<Rank[]>([]);
  const [lastHighestTime, setLastHighestTime] = useState<number>(0);
  const [resultStatus, setResultStatus] = useState<ResultStatus>({
    isNew: true,
    canRecord: true,
  });
  // TODO: zunstadでresultとる?
  const clearTime = 120;

  useEffect(() => {
    getRanking(3);
  }, []);

  const getRanking = async (limit: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/ranking?limit=${limit}&clear_time=${clearTime}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
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
        })
      );

      setLastHighestTime(data.highest_clear_time);

      setResultStatus({
        isNew: data.is_new,
        canRecord: data.can_record,
      });

      setRankList(transformedData);
      console.log("Ranking response:", data.ranking_list);
    } catch (error) {
      console.error("Ranking error:", error);
    }
  };

  const handleUpdateRanking = async (clearTime: number) => {
    const body = JSON.stringify({ clear_time: clearTime });

    try {
      const response = await fetch(`${baseUrl}/ranking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Update ranking response:", data);
      getRanking(3);
    } catch (error) {
      console.error("Update ranking error:", error);
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
