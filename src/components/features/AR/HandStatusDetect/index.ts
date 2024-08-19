export const HandStatusDetect = (handTopPos: {
  x: number;
  y: number;
  z: number;
}) => {
  const dist = Math.sqrt(
    handTopPos.x * handTopPos.x +
      handTopPos.y * handTopPos.y +
      handTopPos.z * handTopPos.z
  );
  if (dist > 0.6) {
    return false;
  } else {
    return true;
  }
};
