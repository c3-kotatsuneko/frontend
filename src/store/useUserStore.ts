import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
	token: string;
	name: string;
	isGuest: boolean;
};

type Action = {
	setLoginUser: (token: State["token"], name: State["name"]) => void;
	setGuestUser: (name: State["name"]) => void;
};

export const useUserStore = create<State & Action>()(
	persist(
		(set) => ({
			token: "",
			name: "",
			isGuest: false,
			setLoginUser: (token, name) =>
				set({ token: token, name: name, isGuest: false }),
			setGuestUser: (name) => set({ token: "", name: name, isGuest: true }),
		}),
		{
			name: "user-storage",
		},
	),
);
