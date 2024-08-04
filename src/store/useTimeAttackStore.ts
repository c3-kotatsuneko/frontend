import { create } from "zustand";

type State = {
  clearTime: number;
  resultStatus: {
    isNew: boolean;
    canRecord: boolean;
  };
  rank: number;
};

type Action = {
  setClearTime: (clearTime: State["clearTime"]) => void;
  setResultStatus: (resultStatus: State["resultStatus"]) => void;
  setRank: (rank: State["rank"]) => void;
};

export const useTimeAttackStore = create<State & Action>()((set) => ({
  clearTime: 0,
  resultStatus: {
    isNew: false,
    canRecord: false,
  },
  rank: 0,
  setClearTime: (clearTime) => set(() => ({ clearTime: clearTime })),
  setResultStatus: (resultStatus) =>
    set(() => ({ resultStatus: resultStatus })),
  setRank: (rank) => set(() => ({ rank: rank })),
}));
