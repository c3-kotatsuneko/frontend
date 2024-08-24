import { ThreeInit } from "../../components/features/AR/ThreeInit";
import {
  useCameraInit,
  useHandInit,
  usePredictWebcam,
} from "../../components/features/AR/HandTracking/HandInit";
import { HandDetect } from "../../components/features/AR/HandTracking/HandDetect";
import { useARToolkit } from "../../hooks/useARTools";
import cameraPara from "../../assets/camera_para.dat?url";
import markerURL from "../../../public/pattern-frontMarker.patt?url";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Add this import statement
import type {
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

export const Test = () => {
  const handCameraRef = useRef<HTMLVideoElement | null>(null);
  const handLandMarkerRef = useRef<HandLandmarker | null>(null);
  const handResultRef = useRef<HandLandmarkerResult | null>(null);
  useEffect(() => {
    useHandInit(handLandMarkerRef);
    useCameraInit(handCameraRef);
  }, []);
  useEffect(() => {
    usePredictWebcam(handLandMarkerRef, handCameraRef, handResultRef);
  }, [handLandMarkerRef, handCameraRef]);
  const { rendererRef, sceneRef, cameraRef, lightRef, allBlockSet, handBlock } =
    ThreeInit();
  const { arToolkitSource, arToolkitContext } = useARToolkit({
    camera: cameraRef.current ?? new THREE.Camera(),
    cameraParaDatURL: cameraPara,
    domElement:
      rendererRef.current?.domElement ?? document.createElement("canvas"),
    markerPatternURL: markerURL,
    scene: sceneRef.current ?? new THREE.Scene(),
  });

  function animate() {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        sceneRef.current.visible = cameraRef.current.visible;
      }
    }
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    animate();
  }, [arToolkitSource, arToolkitContext]);

  return (
    <video ref={handCameraRef} id="video" autoPlay muted>
      <track kind="captions" src="" label="No captions available" default />
    </video>
  );
};
