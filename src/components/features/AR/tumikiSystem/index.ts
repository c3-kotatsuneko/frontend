import type { AllObject } from "../Converter";
import type { Tumiki } from "../../../../pages/AR";

export const tumikiSystem = (
  status: "front" | "left" | "right" | "back",
  tumikiRef: React.RefObject<Tumiki>,
  allBlockSet: React.RefObject<AllObject>
) => {
  //配列の最後の要素を取得
  if (tumikiRef.current) {
    const lastBlockIndex =
      tumikiRef.current.overlapedBlockIndex[
        tumikiRef.current.overlapedBlockIndex.length - 1
      ];
    if (allBlockSet.current) {
      const lastBrock = allBlockSet.current.BlockSet[lastBlockIndex];
      const lastBlockPos = lastBrock.position;
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
      const lastBlockTop = {
        x: lastBlockPos.x,
        y: lastBlockPos.y,
        z: lastBlockPos.z - 0.3,
      };
      for (let i = 0; i < 5; i++) {
        if (tumikiRef.current.isOverlap[i]) {
          continue;
        }
        const block = allBlockSet.current.BlockSet[i + detectBlockIndex];
        const blockPos = block.position;
        const blockBottom = {
          x: blockPos.x,
          y: blockPos.y,
          z: blockPos.z + 0.3,
        };
        const blockDistance = Math.sqrt(
          (lastBlockTop.x - blockBottom.x) ** 2 +
            (lastBlockTop.y - blockBottom.y) ** 2 +
            (lastBlockTop.z - blockBottom.z) ** 2
        );
        if (blockDistance <= 0.3) {
          tumikiRef.current.isOverlap[i] = true;
          allBlockSet.current.BlockSet[i + detectBlockIndex].position.set(
            lastBlockTop.x,
            lastBlockTop.y,
            lastBlockTop.z - 0.3
          );
          tumikiRef.current.overlapedBlockIndex.push(i + detectBlockIndex);
        }
      }
    }
  }
};
