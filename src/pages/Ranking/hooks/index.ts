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

type UpdateRankingResponse = {
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
  const [rankList, setRankList] = useState<Rank[]>([]);
  const [lastHighestTime, setLastHighestTime] = useState<number>(0);
  const [resultStatus, setResultStatus] = useState<ResultStatus>({
    isNew: false,
    canRecord: false,
  });
  // TODO: zunstadでresultとる?
  const clearTime = 88;

  useEffect(() => {
    getRanking(clearTime, 3);
  }, []);

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
      setRankList(transformedData);

      setLastHighestTime(data.highest_clear_time);

      setResultStatus({
        isNew: data.is_new,
        canRecord: data.can_record,
      });
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
        })
      );
      setRankList(transformedData);
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
