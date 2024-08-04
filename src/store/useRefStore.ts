import type { MutableRefObject } from "react";
import { create } from "zustand";
import type ReconnectingWebSocket from "reconnecting-websocket";

type State = {
  socketRef: MutableRefObject<ReconnectingWebSocket | undefined> | null;
};

type Action = {
  setRef: (ref: MutableRefObject<ReconnectingWebSocket | undefined>) => void;
};

export const useRefStore = create<State & Action>()((set) => ({
  socketRef: null,
  setRef: (ref) => set(() => ({ socketRef: ref })),
}));
