import { create } from "zustand";

type State = {
	mode: "timeAttack" | "battle" | "brainTraining";
};

type Action = {
	setMode: (mode: State["mode"]) => void;
};

export const useModeStore = create<State & Action>()((set) => ({
	mode: "timeAttack",
	setMode: (mode) => set(() => ({ mode: mode })),
}));
