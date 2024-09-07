// @generated by protoc-gen-es v2.0.0
// @generated from file game/rpc/game.proto (package game.rpc, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type {
	Event,
	GameState,
	Hand,
	Mode,
	Object$,
	Player,
} from "../resources/game_pb";

/**
 * Describes the file game/rpc/game.proto.
 */
export declare const file_game_rpc_game: GenFile;

/**
 * @generated from message game.rpc.GameStatusRequest
 */
export declare type GameStatusRequest =
	Message<"game.rpc.GameStatusRequest"> & {
		/**
		 * @generated from field: string room_id = 1;
		 */
		roomId: string;

		/**
		 * @generated from field: game.resources.Event event = 2;
		 */
		event: Event;

		/**
		 * @generated from field: game.resources.Mode mode = 3;
		 */
		mode: Mode;

		/**
		 * @generated from field: game.resources.Player player = 4;
		 */
		player?: Player;
	};

/**
 * Describes the message game.rpc.GameStatusRequest.
 * Use `create(GameStatusRequestSchema)` to create a new message.
 */
export declare const GameStatusRequestSchema: GenMessage<GameStatusRequest>;

/**
 * @generated from message game.rpc.GameStatusResponse
 */
export declare type GameStatusResponse =
	Message<"game.rpc.GameStatusResponse"> & {
		/**
		 * @generated from field: string room_id = 1;
		 */
		roomId: string;

		/**
		 * @generated from field: game.resources.Event event = 2;
		 */
		event: Event;

		/**
		 * @generated from field: game.resources.Mode mode = 3;
		 */
		mode: Mode;

		/**
		 * @generated from field: repeated game.resources.Player players = 4;
		 */
		players: Player[];

		/**
		 * @generated from field: int32 time = 5;
		 */
		time: number;
	};

/**
 * Describes the message game.rpc.GameStatusResponse.
 * Use `create(GameStatusResponseSchema)` to create a new message.
 */
export declare const GameStatusResponseSchema: GenMessage<GameStatusResponse>;

/**
 * @generated from message game.rpc.PhysicsInitRequest
 */
export declare type PhysicsInitRequest =
	Message<"game.rpc.PhysicsInitRequest"> & {
		/**
		 * @generated from field: string sender_id = 1;
		 */
		senderId: string;

		/**
		 * @generated from field: string room_id = 2;
		 */
		roomId: string;

		/**
		 * @generated from field: repeated game.resources.Object objects = 3;
		 */
		objects: Object$[];
	};

/**
 * Describes the message game.rpc.PhysicsInitRequest.
 * Use `create(PhysicsInitRequestSchema)` to create a new message.
 */
export declare const PhysicsInitRequestSchema: GenMessage<PhysicsInitRequest>;

/**
 * @generated from message game.rpc.PhysicsInitResponse
 */
export declare type PhysicsInitResponse =
	Message<"game.rpc.PhysicsInitResponse"> & {
		/**
		 * @generated from field: string sender_id = 1;
		 */
		senderId: string;

		/**
		 * @generated from field: string room_id = 2;
		 */
		roomId: string;

		/**
		 * @generated from field: game.resources.GameState state = 3;
		 */
		state: GameState;

		/**
		 * @generated from field: repeated game.resources.Object objects = 4;
		 */
		objects: Object$[];

		/**
		 * @generated from field: repeated game.resources.Hand hands = 5;
		 */
		hands: Hand[];
	};

/**
 * Describes the message game.rpc.PhysicsInitResponse.
 * Use `create(PhysicsInitResponseSchema)` to create a new message.
 */
export declare const PhysicsInitResponseSchema: GenMessage<PhysicsInitResponse>;

/**
 * @generated from message game.rpc.PhysicsRequest
 */
export declare type PhysicsRequest = Message<"game.rpc.PhysicsRequest"> & {
	/**
	 * @generated from field: string sender_id = 1;
	 */
	senderId: string;

	/**
	 * @generated from field: string room_id = 2;
	 */
	roomId: string;

	/**
	 * @generated from field: game.resources.Hand hands = 3;
	 */
	hands?: Hand;
};

/**
 * Describes the message game.rpc.PhysicsRequest.
 * Use `create(PhysicsRequestSchema)` to create a new message.
 */
export declare const PhysicsRequestSchema: GenMessage<PhysicsRequest>;

/**
 * @generated from message game.rpc.PhysicsResponse
 */
export declare type PhysicsResponse = Message<"game.rpc.PhysicsResponse"> & {
	/**
	 * @generated from field: string sender_id = 1;
	 */
	senderId: string;

	/**
	 * @generated from field: string room_id = 2;
	 */
	roomId: string;

	/**
	 * @generated from field: repeated game.resources.Object objects = 3;
	 */
	objects: Object$[];
};

/**
 * Describes the message game.rpc.PhysicsResponse.
 * Use `create(PhysicsResponseSchema)` to create a new message.
 */
export declare const PhysicsResponseSchema: GenMessage<PhysicsResponse>;
