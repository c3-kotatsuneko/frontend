import { ThreeInit } from "../../components/features/AR/ThreeInit";
import { HandTracking } from "../../components/features/AR/HandTracking";
import { useARToolkit } from "../../hooks/useARTools";
import cameraPara from "../../assets/camera_para.dat?url";
import markerURL from "../../assets/marker.patt?url";
import { useEffect } from "react";
import * as THREE from "three"; // Add this import statement

export const Test = () => {
  const { rendererRef, sceneRef, cameraRef, lightRef, allBlockSet, handBlock } =
    ThreeInit();
  console.log(
    rendererRef,
    sceneRef,
    cameraRef,
    lightRef,
    allBlockSet,
    handBlock
  );
  const { arToolkitSource, arToolkitContext, arMarkerControls } = useARToolkit({
    camera: cameraRef.current ?? new THREE.Camera(),
    cameraParaDatURL: cameraPara,
    domElement: rendererRef.current
      ? rendererRef.current.domElement
      : undefined,
    markerPatternURL: markerURL,
    scene: sceneRef.current ? sceneRef.current : undefined,
  });

  function animate() {
    requestAnimationFrame(animate);
    if (arToolkitSource.ready) {
      arToolkitContext.update(arToolkitSource.domElement);
    }
    rendererRef.current?.render(
      sceneRef.current ?? new THREE.Scene(),
      cameraRef.current ?? new THREE.Camera()
    );
  }

  useEffect(() => {
    animate();
  }, [arToolkitContext, arToolkitSource]);
  return <h1>test Page</h1>;
};
