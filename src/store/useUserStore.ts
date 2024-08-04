import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
	token: string;
	name: string;
	isGuest: boolean;
};

type Action = {
	setToken: (token: State["token"]) => void;
	setName: (name: State["name"]) => void;
	setIsGuest: (isGuest: State["isGuest"]) => void;
};

export const useUserStore = create<State & Action>()(
	persist(
		(set) => ({
			token: "",
			name: "",
			isGuest: false,
			setToken: (token) => set(() => ({ token: token })),
			setName: (name) => set(() => ({ name: name })),
			setIsGuest: (isGuest) => set(() => ({ isGuest: isGuest })),
		}),
		{
			name: "user-storage",
		},
	),
);
