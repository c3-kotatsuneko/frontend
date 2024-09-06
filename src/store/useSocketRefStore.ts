import type { MutableRefObject } from "react";
import { create } from "zustand";
import type ReconnectingWebSocket from "reconnecting-websocket";
import {
  GameStatusRequestSchema,
  GameStatusResponseSchema,
  type PhysicsRequest,
  PhysicsRequestSchema,
  PhysicsResponseSchema,
} from "../proto/game/rpc/game_pb";
import {
  Event,
  type Hand,
  Mode,
  type Player,
} from "../proto/game/resources/game_pb";
import { create as toProto, toBinary, fromBinary } from "@bufbuild/protobuf";
import { objectInfo } from "../components/features/AR/Converter/arTransform";

type EventState = {
  roomId: string;
  event: Event;
  mode: Mode;
  players: Player[];
  time: number;
  objetcts: objectInfo[];
};

export type SendEventSchema = {
  roomId: string;
  event: Event;
  mode: Mode;
  player?: Player;
};

export type SendPhysicsSchema = {
  senderId: string;
  roomId: string;
  hands?: Hand[];
};

type State = {
  socketEventRef: MutableRefObject<ReconnectingWebSocket | undefined> | null;
  socketPhysicsRef: MutableRefObject<ReconnectingWebSocket | undefined> | null;
  eventState: EventState;
};

type Action = {
  setEventRef: (
    ref: MutableRefObject<ReconnectingWebSocket | undefined>
  ) => void;
  setPhysicsRef: (
    ref: MutableRefObject<ReconnectingWebSocket | undefined>
  ) => void;
  setEventState: (state: EventState) => void;
  setRoomId: (roomId: string) => void;
  setEvent: (event: Event) => void;
  setMode: (mode: Mode) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  setTime: (time: number) => void;
  setObjects: (objects: objectInfo[]) => void;
  eventSend: (req: SendEventSchema) => void;
  physicsSend: (req: PhysicsRequest) => void;
};

export const useSocketRefStore = create<State & Action>()((set, get) => ({
  socketEventRef: null,
  socketPhysicsRef: null,
  eventState: {
    roomId: "",
    event: Event.UNKNOWN,
    mode: Mode.UNKNOWN,
    players: [],
    time: 0,
    objetcts: [],
  },
  setEventState: (state) => set(() => ({ eventState: state })),
  setRoomId: (roomId) =>
    set((state) => ({
      eventState: { ...state.eventState, roomId: roomId },
    })),
  setEvent: (event) =>
    set((state) => ({
      eventState: { ...state.eventState, event: event },
    })),
  setMode: (mode) =>
    set((state) => ({
      eventState: { ...state.eventState, mode: mode },
    })),
  setPlayers: (players) =>
    set((state) => ({
      eventState: { ...state.eventState, players: players },
    })),
  addPlayer: (player) =>
    set((state) => ({
      eventState: {
        ...state.eventState,
        players: [...state.eventState.players, player],
      },
    })),
  setTime: (time) =>
    set((state) => ({
      eventState: { ...state.eventState, time: time },
    })),
  setObjects: (objects) =>
    set((state) => ({
      eventState: { ...state.eventState, objetcts: objects },
    })),
  setEventRef: (ref) => {
    if (ref?.current) {
      ref.current.onopen = () => {
        console.log("connected");
      };
      ref.current.onmessage = (event) => {
        console.log(event);
        const res = fromBinary(
          GameStatusResponseSchema,
          new Uint8Array(event.data)
        );
        switch (res.mode) {
          case Mode.MULTI:
            console.log("multi");
            switch (res.event) {
              case Event.ENTER_ROOM:
                console.log("waiting");
                break;
              case Event.EXIT_ROOM:
                console.log("playing");
                break;
              case Event.GAME_START:
                console.log("finished");
                break;
              case Event.RESULT:
                console.log("finished");
                break;
              case Event.STATS:
                console.log("finished");
                break;
              case Event.TIMER:
                get().setTime(res.time);
                console.log(res.time);
                break;
              case Event.UNKNOWN:
                console.error("event unknown");
                break;
            }
            break;
          case Mode.TIME_ATTACK:
            console.log("timeAttack");
            switch (res.event) {
              case Event.ENTER_ROOM:
                console.log("waiting");
                break;
              case Event.EXIT_ROOM:
                console.log("playing");
                break;
              case Event.GAME_START:
                console.log("finished");
                break;
              case Event.RESULT:
                console.log("finished");
                break;
              case Event.STATS:
                console.log("finished");
                break;
              case Event.TIMER:
                console.log("finished");
                break;
              case Event.UNKNOWN:
                console.error("event unknown");
                break;
            }
            break;
          case Mode.TRAINING:
            console.log("training");
            switch (res.event) {
              case Event.ENTER_ROOM:
                console.log("waiting");
                break;
              case Event.EXIT_ROOM:
                console.log("playing");
                break;
              case Event.GAME_START:
                console.log("finished");
                break;
              case Event.RESULT:
                console.log("finished");
                break;
              case Event.STATS:
                console.log("finished");
                break;
              case Event.TIMER:
                console.log("finished");
                break;
              case Event.UNKNOWN:
                console.error("event unknown");
                break;
            }
            break;
          case Mode.UNKNOWN:
            console.error("mode unknown");
            break;
        }
      };
      ref.current.onclose = () => {
        console.log("disconnected");
      };
    }
    return set(() => ({ socketEventRef: ref }));
  },
  setPhysicsRef: (ref) => {
    if (ref?.current) {
      ref.current.onopen = () => {
        console.log("connected");
      };
      ref.current.onmessage = (event) => {
        const res = fromBinary(
          PhysicsResponseSchema,
          new Uint8Array(event.data)
        );

        const obj = res.objects.map((o) => {
          const t: objectInfo = {
            position: {
              x: o.position?.x ?? 0,
              y: o.position?.y ?? 0,
              z: o.position?.z ?? 0,
            },
            angle: {
              x: 0,
              y: 0,
              z: 0,
            },
            scale: {
              x: o.size?.x ?? 1,
              y: o.size?.y ?? 1,
              z: o.size?.z ?? 1,
            },
          };
          return t;
        });
        get().setObjects(obj);
        console.log(res);
      };
      ref.current.onclose = () => {
        console.log("disconnected");
      };
    }
    return set(() => ({ socketPhysicsRef: ref }));
  },
  eventSend: (req) => {
    const { socketEventRef } = get();
    if (socketEventRef?.current) {
      socketEventRef.current.send(
        toBinary(GameStatusRequestSchema, toProto(GameStatusRequestSchema, req))
      );
    }
  },
  physicsSend: (req) => {
    const { socketPhysicsRef } = get();
    if (socketPhysicsRef?.current) {
      socketPhysicsRef.current.send(
        toBinary(PhysicsRequestSchema, toProto(PhysicsRequestSchema, req))
      );
    }
  },
}));
