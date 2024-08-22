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
  const { arToolkitSource, arToolkitContext } = useARToolkit({
    camera: cameraRef.current ?? new THREE.Camera(),
    cameraParaDatURL: cameraPara,
    domElement: rendererRef.current
      ? rendererRef.current.domElement
      : undefined,
    markerPatternURL: markerURL,
    scene: sceneRef.current ? sceneRef.current : undefined,
  });

  useEffect(() => {
    function animate() {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        console.log(arToolkitSource);
        if (arToolkitSource?.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
          sceneRef.current.visible = cameraRef.current.visible;
        }
      }
      const detect = HandTracking(arToolkitSource.domElement);
      console.log(detect);

      requestAnimationFrame(animate);
    }
    animate();
  }, [arToolkitContext, arToolkitSource, rendererRef, sceneRef, cameraRef]);
  return <h1>test Page</h1>;
};
