import { create } from "zustand";

type State = {
	mode: "timeAttack" | "multi" | "training";
};

type Action = {
	setMode: (mode: State["mode"]) => void;
};

export const useModeStore = create<State & Action>()((set) => ({
	mode: "timeAttack",
	setMode: (mode) => set(() => ({ mode: mode })),
}));
