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
  console.log(dist * handTopPos.z);
  if (dist > 1) {
    return false;
  }
  return true;
};
