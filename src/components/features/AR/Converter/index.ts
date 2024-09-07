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

type AllObject = {
	frontBlockSet: THREE.Mesh[];
	leftBlockSet: THREE.Mesh[];
	rightBlockSet: THREE.Mesh[];
	backBlockSet: THREE.Mesh[];
	stage: THREE.Mesh;
};

type handInfo = {
	handStatus: boolean; //手の状態
	handPos: position; //手の位置
	handAngle: angle; //手の角度
};

export const HandPosToDataConverter = (
	status: "front" | "left" | "right" | "back",
	handResultRef: React.RefObject<HandLandmarkerResult>,
	handBlockRef: React.RefObject<THREE.Mesh>,
) => {
	if (handResultRef.current) {
		const handMidPos = {
			x:
				handResultRef.current.landmarks[0][9].x -
				handResultRef.current.landmarks[0][0].x -
				0.5,
			y:
				handResultRef.current.landmarks[0][9].y -
				handResultRef.current.landmarks[0][0].y -
				0.5,
			z:
				handResultRef.current.landmarks[0][9].z -
				handResultRef.current.landmarks[0][0].z -
				0.5,
		};
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
			y: (handResultRef.current.landmarks[0][0].y - 0.5) * 10,
			z: handResultRef.current.landmarks[0][0].z - 0.5,
		};
		//handMidPosを利用して手の角度を計算
		const handAngle = {
			x: Math.atan2(handMidPos.y, handMidPos.z),
			y: Math.atan2(handMidPos.z, handMidPos.x),
			z: Math.atan2(handMidPos.x, handMidPos.y),
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
		let worldHandPos: handInfo;
		switch (status) {
			case "front": {
				const worldBlockFrontBrock = worldObjectToFront({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandPos = {
					handStatus: handStatus,
					handPos: worldBlockFrontBrock.object.position,
					handAngle: worldBlockFrontBrock.object.angle,
				};
				return worldHandPos;
			}
			case "left": {
				const worldBlockLeftBrock = worldObjectToLeft({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandPos = {
					handStatus: handStatus,
					handPos: worldBlockLeftBrock.object.position,
					handAngle: worldBlockLeftBrock.object.angle,
				};
				return worldHandPos;
			}
			case "right": {
				const worldBlockRightBrock = worldObjectToRight({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandPos = {
					handStatus: handStatus,
					handPos: worldBlockRightBrock.object.position,
					handAngle: worldBlockRightBrock.object.angle,
				};
				return worldHandPos;
			}
			case "back": {
				const worldBlockBackBrock = worldObjectToBack({
					position: handPos,
					angle: handAngle,
					scale: { x: 0.1, y: 0.1, z: 0.1 },
				});
				worldHandPos = {
					handStatus: handStatus,
					handPos: worldBlockBackBrock.object.position,
					handAngle: worldBlockBackBrock.object.angle,
				};
				return worldHandPos;
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
				for (let i = 0; i < 5; i++) {
					const worldBlockFrontBrock = worldObjectToFront(worldBlockData[i]);
					originalBlockRef.current.frontBlockSet[i].position.set(
						worldBlockFrontBrock.object.position.x,
						worldBlockFrontBrock.object.position.y,
						worldBlockFrontBrock.object.position.z,
					);
					originalBlockRef.current.frontBlockSet[i].rotation.set(
						worldBlockFrontBrock.object.angle.x,
						worldBlockFrontBrock.object.angle.y,
						worldBlockFrontBrock.object.angle.z,
					);
					originalBlockRef.current.frontBlockSet[i].scale.set(
						worldBlockFrontBrock.object.scale.x,
						worldBlockFrontBrock.object.scale.y,
						worldBlockFrontBrock.object.scale.z,
					);
					const worldBlockLeftSet = worldObjectToFront(worldBlockData[i + 5]);
					originalBlockRef.current.leftBlockSet[i].position.set(
						worldBlockLeftSet.object.position.x,
						worldBlockLeftSet.object.position.y,
						worldBlockLeftSet.object.position.z,
					);
					originalBlockRef.current.leftBlockSet[i].rotation.set(
						worldBlockLeftSet.object.angle.x,
						worldBlockLeftSet.object.angle.y,
						worldBlockLeftSet.object.angle.z,
					);
					originalBlockRef.current.leftBlockSet[i].scale.set(
						worldBlockLeftSet.object.scale.x,
						worldBlockLeftSet.object.scale.y,
						worldBlockLeftSet.object.scale.z,
					);
					const worldBlockRightSet = worldObjectToFront(worldBlockData[i + 10]);
					originalBlockRef.current.rightBlockSet[i].position.set(
						worldBlockRightSet.object.position.x,
						worldBlockRightSet.object.position.y,
						worldBlockRightSet.object.position.z,
					);
					originalBlockRef.current.rightBlockSet[i].rotation.set(
						worldBlockRightSet.object.angle.x,
						worldBlockRightSet.object.angle.y,
						worldBlockRightSet.object.angle.z,
					);
					originalBlockRef.current.rightBlockSet[i].scale.set(
						worldBlockRightSet.object.scale.x,
						worldBlockRightSet.object.scale.y,
						worldBlockRightSet.object.scale.z,
					);
					const worldBlockBackSet = worldObjectToFront(worldBlockData[i + 15]);
					originalBlockRef.current.backBlockSet[i].position.set(
						worldBlockBackSet.object.position.x,
						worldBlockBackSet.object.position.y,
						worldBlockBackSet.object.position.z,
					);
					originalBlockRef.current.backBlockSet[i].rotation.set(
						worldBlockBackSet.object.angle.x,
						worldBlockBackSet.object.angle.y,
						worldBlockBackSet.object.angle.z,
					);
					originalBlockRef.current.backBlockSet[i].scale.set(
						worldBlockBackSet.object.scale.x,
						worldBlockBackSet.object.scale.y,
						worldBlockBackSet.object.scale.z,
					);
				}
				break;
			case "left":
				for (let i = 0; i < 5; i++) {
					const worldBlockFrontBrock = worldObjectToLeft(worldBlockData[i]);
					originalBlockRef.current.frontBlockSet[i].position.set(
						worldBlockFrontBrock.object.position.x,
						worldBlockFrontBrock.object.position.y,
						worldBlockFrontBrock.object.position.z,
					);
					originalBlockRef.current.frontBlockSet[i].rotation.set(
						worldBlockFrontBrock.object.angle.x,
						worldBlockFrontBrock.object.angle.y,
						worldBlockFrontBrock.object.angle.z,
					);
					originalBlockRef.current.frontBlockSet[i].scale.set(
						worldBlockFrontBrock.object.scale.x,
						worldBlockFrontBrock.object.scale.y,
						worldBlockFrontBrock.object.scale.z,
					);
					const worldBlockLeftSet = worldObjectToLeft(worldBlockData[i + 5]);
					originalBlockRef.current.leftBlockSet[i].position.set(
						worldBlockLeftSet.object.position.x,
						worldBlockLeftSet.object.position.y,
						worldBlockLeftSet.object.position.z,
					);
					originalBlockRef.current.leftBlockSet[i].rotation.set(
						worldBlockLeftSet.object.angle.x,
						worldBlockLeftSet.object.angle.y,
						worldBlockLeftSet.object.angle.z,
					);
					originalBlockRef.current.leftBlockSet[i].scale.set(
						worldBlockLeftSet.object.scale.x,
						worldBlockLeftSet.object.scale.y,
						worldBlockLeftSet.object.scale.z,
					);
					const worldBlockRightSet = worldObjectToLeft(worldBlockData[i + 10]);
					originalBlockRef.current.rightBlockSet[i].position.set(
						worldBlockRightSet.object.position.x,
						worldBlockRightSet.object.position.y,
						worldBlockRightSet.object.position.z,
					);
					originalBlockRef.current.rightBlockSet[i].rotation.set(
						worldBlockRightSet.object.angle.x,
						worldBlockRightSet.object.angle.y,
						worldBlockRightSet.object.angle.z,
					);
					originalBlockRef.current.rightBlockSet[i].scale.set(
						worldBlockRightSet.object.scale.x,
						worldBlockRightSet.object.scale.y,
						worldBlockRightSet.object.scale.z,
					);
					const worldBlockBackSet = worldObjectToLeft(worldBlockData[i + 15]);
					originalBlockRef.current.backBlockSet[i].position.set(
						worldBlockBackSet.object.position.x,
						worldBlockBackSet.object.position.y,
						worldBlockBackSet.object.position.z,
					);
					originalBlockRef.current.backBlockSet[i].rotation.set(
						worldBlockBackSet.object.angle.x,
						worldBlockBackSet.object.angle.y,
						worldBlockBackSet.object.angle.z,
					);
					originalBlockRef.current.backBlockSet[i].scale.set(
						worldBlockBackSet.object.scale.x,
						worldBlockBackSet.object.scale.y,
						worldBlockBackSet.object.scale.z,
					);
				}
				break;
			case "right":
				for (let i = 0; i < 5; i++) {
					const worldBlockFrontBrock = worldObjectToRight(worldBlockData[i]);
					originalBlockRef.current.frontBlockSet[i].position.set(
						worldBlockFrontBrock.object.position.x,
						worldBlockFrontBrock.object.position.y,
						worldBlockFrontBrock.object.position.z,
					);
					originalBlockRef.current.frontBlockSet[i].rotation.set(
						worldBlockFrontBrock.object.angle.x,
						worldBlockFrontBrock.object.angle.y,
						worldBlockFrontBrock.object.angle.z,
					);
					originalBlockRef.current.frontBlockSet[i].scale.set(
						worldBlockFrontBrock.object.scale.x,
						worldBlockFrontBrock.object.scale.y,
						worldBlockFrontBrock.object.scale.z,
					);
					const worldBlockLeftSet = worldObjectToRight(worldBlockData[i + 5]);
					originalBlockRef.current.leftBlockSet[i].position.set(
						worldBlockLeftSet.object.position.x,
						worldBlockLeftSet.object.position.y,
						worldBlockLeftSet.object.position.z,
					);
					originalBlockRef.current.leftBlockSet[i].rotation.set(
						worldBlockLeftSet.object.angle.x,
						worldBlockLeftSet.object.angle.y,
						worldBlockLeftSet.object.angle.z,
					);
					originalBlockRef.current.leftBlockSet[i].scale.set(
						worldBlockLeftSet.object.scale.x,
						worldBlockLeftSet.object.scale.y,
						worldBlockLeftSet.object.scale.z,
					);
					const worldBlockRightSet = worldObjectToRight(worldBlockData[i + 10]);
					originalBlockRef.current.rightBlockSet[i].position.set(
						worldBlockRightSet.object.position.x,
						worldBlockRightSet.object.position.y,
						worldBlockRightSet.object.position.z,
					);
					originalBlockRef.current.rightBlockSet[i].rotation.set(
						worldBlockRightSet.object.angle.x,
						worldBlockRightSet.object.angle.y,
						worldBlockRightSet.object.angle.z,
					);
					originalBlockRef.current.rightBlockSet[i].scale.set(
						worldBlockRightSet.object.scale.x,
						worldBlockRightSet.object.scale.y,
						worldBlockRightSet.object.scale.z,
					);
					const worldBlockBackSet = worldObjectToRight(worldBlockData[i + 15]);
					originalBlockRef.current.backBlockSet[i].position.set(
						worldBlockBackSet.object.position.x,
						worldBlockBackSet.object.position.y,
						worldBlockBackSet.object.position.z,
					);
					originalBlockRef.current.backBlockSet[i].rotation.set(
						worldBlockBackSet.object.angle.x,
						worldBlockBackSet.object.angle.y,
						worldBlockBackSet.object.angle.z,
					);
					originalBlockRef.current.backBlockSet[i].scale.set(
						worldBlockBackSet.object.scale.x,
						worldBlockBackSet.object.scale.y,
						worldBlockBackSet.object.scale.z,
					);
				}
				break;
			case "back":
				for (let i = 0; i < 5; i++) {
					const worldBlockFrontBrock = worldObjectToBack(worldBlockData[i]);
					originalBlockRef.current.frontBlockSet[i].position.set(
						worldBlockFrontBrock.object.position.x,
						worldBlockFrontBrock.object.position.y,
						worldBlockFrontBrock.object.position.z,
					);
					originalBlockRef.current.frontBlockSet[i].rotation.set(
						worldBlockFrontBrock.object.angle.x,
						worldBlockFrontBrock.object.angle.y,
						worldBlockFrontBrock.object.angle.z,
					);
					originalBlockRef.current.frontBlockSet[i].scale.set(
						worldBlockFrontBrock.object.scale.x,
						worldBlockFrontBrock.object.scale.y,
						worldBlockFrontBrock.object.scale.z,
					);
					const worldBlockLeftSet = worldObjectToBack(worldBlockData[i + 5]);
					originalBlockRef.current.leftBlockSet[i].position.set(
						worldBlockLeftSet.object.position.x,
						worldBlockLeftSet.object.position.y,
						worldBlockLeftSet.object.position.z,
					);
					originalBlockRef.current.leftBlockSet[i].rotation.set(
						worldBlockLeftSet.object.angle.x,
						worldBlockLeftSet.object.angle.y,
						worldBlockLeftSet.object.angle.z,
					);
					originalBlockRef.current.leftBlockSet[i].scale.set(
						worldBlockLeftSet.object.scale.x,
						worldBlockLeftSet.object.scale.y,
						worldBlockLeftSet.object.scale.z,
					);
					const worldBlockRightSet = worldObjectToBack(worldBlockData[i + 10]);
					originalBlockRef.current.rightBlockSet[i].position.set(
						worldBlockRightSet.object.position.x,
						worldBlockRightSet.object.position.y,
						worldBlockRightSet.object.position.z,
					);
					originalBlockRef.current.rightBlockSet[i].rotation.set(
						worldBlockRightSet.object.angle.x,
						worldBlockRightSet.object.angle.y,
						worldBlockRightSet.object.angle.z,
					);
					originalBlockRef.current.rightBlockSet[i].scale.set(
						worldBlockRightSet.object.scale.x,
						worldBlockRightSet.object.scale.y,
						worldBlockRightSet.object.scale.z,
					);
					const worldBlockBackSet = worldObjectToBack(worldBlockData[i + 15]);
					originalBlockRef.current.backBlockSet[i].position.set(
						worldBlockBackSet.object.position.x,
						worldBlockBackSet.object.position.y,
						worldBlockBackSet.object.position.z,
					);
					originalBlockRef.current.backBlockSet[i].rotation.set(
						worldBlockBackSet.object.angle.x,
						worldBlockBackSet.object.angle.y,
						worldBlockBackSet.object.angle.z,
					);
					originalBlockRef.current.backBlockSet[i].scale.set(
						worldBlockBackSet.object.scale.x,
						worldBlockBackSet.object.scale.y,
						worldBlockBackSet.object.scale.z,
					);
				}
				break;
		}
	}
};
