import { memo, useCallback, useEffect, useRef } from "react";
import { ThreeInit } from "../../components/features/AR/ThreeInit";
import {
  handInit,
  predictWebcam,
} from "../../components/features/AR/HandTracking";
import cameraPara from "../../assets/camera_para.dat?url";
import * as THREE from "three";
import type {
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useLocation } from "react-router-dom";
import {
  HandPosToDataConverter,
  // DataToPosConverter,
} from "../../components/features/AR/converter";
// import { handBlockCatch } from "../../components/features/AR/BackendlessSystem";
// import testData from "./testData";
// import { tumikiSystem } from "../../components/features/AR/tumikiSystem";
import { useARToolkit } from "./hooks/useARTools";
import { ObjectSetting } from "./DataToPosConverter";

type Position = "front" | "left" | "right" | "back";

export type Tumiki = {
  overlapedBlockIndex: number[];
  isOverlap: boolean[];
};

const Component = () => {
  const handCameraRef = useRef<HTMLVideoElement | null>(null);
  const handLandMarkerRef = useRef<HandLandmarker | null>(null);
  const handResultRef = useRef<HandLandmarkerResult | null>(null);
  const param = new URLSearchParams(useLocation().search);
  const position = (param.get("position") ?? "front") as Position;
  console.log(position);
  const marker = `/pattern-${position}Marker.patt`;

  const { rendererRef, sceneRef, cameraRef, handBlock, allBlockSet } =
    ThreeInit(); //lightRef, allBlockSet,をlint回避のため一度削除
  const tt = document.createElement("canvas");
  tt.width = window.innerWidth;
  tt.height = window.innerHeight;
  const { arToolkitSource, arToolkitContext } = useARToolkit({
    camera: cameraRef.current ?? new THREE.Camera(),
    cameraParaDatURL: cameraPara,
    domElement: rendererRef.current?.domElement ?? tt,
    markerPatternURL: marker,
    scene: sceneRef.current ?? new THREE.Scene(),
  });

  useEffect(() => {
    handInit(handLandMarkerRef);
  }, []);
  useEffect(() => {
    handCameraRef.current = arToolkitSource.domElement;
    predictWebcam(handLandMarkerRef, handCameraRef, handResultRef);
  }, [arToolkitSource]);

  const animate = useCallback(() => {
    if (position !== null) {
      if (handResultRef.current) {
        if (handResultRef.current.landmarks.length > 0) {
          HandPosToDataConverter(position, handResultRef, handBlock);
          console.log(handBlock);
        }
      }
    } else {
      if (handResultRef.current) {
        if (handResultRef.current.landmarks.length > 0) {
          HandPosToDataConverter("front", handResultRef, handBlock);
          console.log(handBlock);
        }
      }
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        sceneRef.current.visible = cameraRef.current.visible;
      }
    }
    console.log(handResultRef.current);
    requestAnimationFrame(animate);
  }, [
    arToolkitContext,
    arToolkitSource,
    cameraRef,
    rendererRef,
    sceneRef,
    position,
    handBlock,
  ]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <>
      <div id="wrapper" />
      <ObjectSetting position={position} allBlockSet={allBlockSet} />
    </>
  );
};
export const ARfunction = memo(Component);
