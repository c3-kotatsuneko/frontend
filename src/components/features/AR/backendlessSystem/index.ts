import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import type { HandInfo, AllObject } from "../converter";
import type { Tumiki } from "../../../../pages/AR";

export const handBlockCatch = (
  status: "front" | "left" | "right" | "back",
  handResultRef: React.RefObject<HandLandmarkerResult>,
  allBlockSet: React.RefObject<AllObject>,
  tumikiRef: React.RefObject<Tumiki>,
  worldHandInfo: HandInfo
) => {
  const catchDist = 1;
  if (worldHandInfo.handStatus) {
    if (
      handResultRef.current &&
      handResultRef.current.landmarks.length > 0 &&
      allBlockSet.current
    ) {
      const handPos = {
        x: (handResultRef.current.landmarks[0][0].x - 0.5) * 7,
        y: (handResultRef.current.landmarks[0][0].z + 0.4) * 10 - 3,
        z: (handResultRef.current.landmarks[0][0].y - 0.5) * 10 - 2,
      };
      //statusによって距離測定するブロックを変更
      //frontだったら0~4、leftだったら5~9、rightだったら10~14、backだったら15~19
      let distance = catchDist;
      let blockIndex = null;
      let detectBlockIndex = 0;
      switch (status) {
        case "front":
          detectBlockIndex = 0;
          break;
        case "left":
          detectBlockIndex = 5;
          break;
        case "right":
          detectBlockIndex = 10;
          break;
        case "back":
          detectBlockIndex = 15;
          break;
      }
      for (let i = 0; i < 5; i++) {
        if (i !== 2) {
          if (tumikiRef.current?.isOverlap[i]) {
            continue;
          }
          const block = allBlockSet.current?.BlockSet[i + detectBlockIndex];
          const blockPos = block.position;
          const blockDistance = Math.sqrt(
            (handPos.x - blockPos.x) ** 2 +
              (handPos.y - blockPos.y) ** 2 +
              (handPos.z - blockPos.z) ** 2
          );
          if (blockDistance <= distance) {
            distance = blockDistance;
            blockIndex = i;
          }
        }
      }

      if (blockIndex !== null) {
        console.log("handBlockCatch");
        allBlockSet.current.BlockSet[blockIndex].position.set(
          handPos.x,
          handPos.y,
          handPos.z
        );
      }
    }
  }
};
