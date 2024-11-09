import * as THREE from "three";
import {
	worldObjectToFront,
	worldObjectToLeft,
	worldObjectToRight,
	worldObjectToBack,
} from "./arTransform";
import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import type {
	angle, // オブジェクトの角度 x y z
	position, // オブジェクトの位置 x y z
	objectInfo, // オブジェクトの情報 position angle scale
} from "./arTransform";
import { HandStatusDetect } from "../HandStatusDetect";

export type AllObject = {
	BlockSet: THREE.Mesh[];
	//   frontBlockSet: THREE.Mesh[];
	//   leftBlockSet: THREE.Mesh[];
	//   rightBlockSet: THREE.Mesh[];
	//   backBlockSet: THREE.Mesh[];
	stage: THREE.Mesh;
};

export type HandInfo = {
	handStatus: boolean; //手の状態
	handPos: position; //手の位置
	handAngle: angle; //手の角度
};

export const HandPosToDataConverter = (
	//入力 状態、手の情報、手のthreejsの情報
	//出力 世界座標に変換した手の情報(状態、位置、角度)
	status: "front" | "left" | "right" | "back",
	handResultRef: React.RefObject<HandLandmarkerResult>,
	handBlockRef: React.RefObject<THREE.Mesh>,
) => {
	if (handResultRef.current) {
		// const handMidPos = {
		//   x:
		//     handResultRef.current.landmarks[0][9].x -
		//     handResultRef.current.landmarks[0][0].x -
		//     0.5,
		//   y:
		//     handResultRef.current.landmarks[0][9].y -
		//     handResultRef.current.landmarks[0][0].y -
		//     0.5,
		//   z:
		//     handResultRef.current.landmarks[0][9].z -
		//     handResultRef.current.landmarks[0][0].z -
		//     0.5,
		// };
		const handTopPos = {
			x:
				handResultRef.current.landmarks[0][12].x -
				handResultRef.current.landmarks[0][0].x -
				0.5,
			y:
				handResultRef.current.landmarks[0][12].y -
				handResultRef.current.landmarks[0][0].y -
				0.5,
			z:
				handResultRef.current.landmarks[0][12].z -
				handResultRef.current.landmarks[0][0].z -
				0.5,
		};
		const handPos = {
			x: (handResultRef.current.landmarks[0][0].x - 0.5) * 7,
			y: (handResultRef.current.landmarks[0][0].z + 0.4) * 10 - 3,
			z: (handResultRef.current.landmarks[0][0].y - 0.5) * 10 - 2,
		};
		//handMidPosを利用して手の角度を計算
		const handAngle = {
			//   x: Math.atan2(handMidPos.y, handMidPos.z),
			//   y: Math.atan2(handMidPos.z, handMidPos.x),
			//   z: Math.atan2(handMidPos.x, handMidPos.y),
			x: 0,
			y: 0,
			z: 0,
		};
		const handStatus = HandStatusDetect(handTopPos);
		if (handBlockRef.current) {
			handBlockRef.current.position.set(handPos.x, handPos.y, handPos.z);
			handBlockRef.current.rotation.set(handAngle.x, handAngle.y, handAngle.z);
		}
		//trueならblockの色を赤に変更falseなら青に変更
		if (handStatus) {
			if (handBlockRef.current) {
				handBlockRef.current.material = new THREE.MeshStandardMaterial({
					color: 0xff0000,
				});
			}
		} else {
			if (handBlockRef.current) {
				handBlockRef.current.material = new THREE.MeshStandardMaterial({
					color: 0x0000ff,
				});
			}
		}
		let worldHandInfo: HandInfo;
		switch (status) {
			case "front": {
				const worldBlockFrontBrock = worldObjectToFront({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandInfo = {
					handStatus: handStatus,
					handPos: worldBlockFrontBrock.object.position,
					handAngle: worldBlockFrontBrock.object.angle,
				};
				return worldHandInfo;
			}
			case "left": {
				const worldBlockLeftBrock = worldObjectToLeft({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandInfo = {
					handStatus: handStatus,
					handPos: worldBlockLeftBrock.object.position,
					handAngle: worldBlockLeftBrock.object.angle,
				};
				return worldHandInfo;
			}
			case "right": {
				const worldBlockRightBrock = worldObjectToRight({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandInfo = {
					handStatus: handStatus,
					handPos: worldBlockRightBrock.object.position,
					handAngle: worldBlockRightBrock.object.angle,
				};
				return worldHandInfo;
			}
			case "back": {
				const worldBlockBackBrock = worldObjectToBack({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandInfo = {
					handStatus: handStatus,
					handPos: worldBlockBackBrock.object.position,
					handAngle: worldBlockBackBrock.object.angle,
				};
				return worldHandInfo;
			}
		}
	}
};
export const DataToPosConverter = (
	status: "front" | "left" | "right" | "back",
	worldBlockData: objectInfo[],
	originalBlockRef: React.RefObject<AllObject>,
) => {
	if (originalBlockRef.current) {
		switch (status) {
			case "front":
				for (let i = 0; i < worldBlockData.length; i++) {
					const worldBlock = worldObjectToFront(worldBlockData[i]);
					originalBlockRef.current.BlockSet[i].position.set(
						worldBlock.object.position.x,
						worldBlock.object.position.y,
						worldBlock.object.position.z,
					);
					originalBlockRef.current.BlockSet[i].rotation.set(
						worldBlock.object.angle.x,
						worldBlock.object.angle.y,
						worldBlock.object.angle.z,
					);
					originalBlockRef.current.BlockSet[i].scale.set(
						worldBlock.object.scale.x,
						worldBlock.object.scale.y,
						worldBlock.object.scale.z,
					);
				}
				break;
			case "left":
				for (let i = 0; i < worldBlockData.length; i++) {
					const worldBlock = worldObjectToLeft(worldBlockData[i]);
					originalBlockRef.current.BlockSet[i].position.set(
						worldBlock.object.position.x,
						worldBlock.object.position.y,
						worldBlock.object.position.z,
					);
					originalBlockRef.current.BlockSet[i].rotation.set(
						worldBlock.object.angle.x,
						worldBlock.object.angle.y,
						worldBlock.object.angle.z,
					);
					originalBlockRef.current.BlockSet[i].scale.set(
						worldBlock.object.scale.x,
						worldBlock.object.scale.y,
						worldBlock.object.scale.z,
					);
				}
				break;
			case "right":
				for (let i = 0; i < worldBlockData.length; i++) {
					const worldBlock = worldObjectToRight(worldBlockData[i]);
					originalBlockRef.current.BlockSet[i].position.set(
						worldBlock.object.position.x,
						worldBlock.object.position.y,
						worldBlock.object.position.z,
					);
					originalBlockRef.current.BlockSet[i].rotation.set(
						worldBlock.object.angle.x,
						worldBlock.object.angle.y,
						worldBlock.object.angle.z,
					);
					originalBlockRef.current.BlockSet[i].scale.set(
						worldBlock.object.scale.x,
						worldBlock.object.scale.y,
						worldBlock.object.scale.z,
					);
				}
				break;
			case "back":
				for (let i = 0; i < worldBlockData.length; i++) {
					const worldBlock = worldObjectToBack(worldBlockData[i]);
					originalBlockRef.current.BlockSet[i].position.set(
						worldBlock.object.position.x,
						worldBlock.object.position.y,
						worldBlock.object.position.z,
					);
					originalBlockRef.current.BlockSet[i].rotation.set(
						worldBlock.object.angle.x,
						worldBlock.object.angle.y,
						worldBlock.object.angle.z,
					);
					originalBlockRef.current.BlockSet[i].scale.set(
						worldBlock.object.scale.x,
						worldBlock.object.scale.y,
						worldBlock.object.scale.z,
					);
				}
				break;
		}
	}
};
