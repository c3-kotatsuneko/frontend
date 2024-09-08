import { ThreeInit } from "../../components/features/AR/ThreeInit";
import {
  handInit,
  predictWebcam,
} from "../../components/features/AR/HandTracking";
import cameraPara from "../../assets/camera_para.dat?url";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Add this import statement
import type {
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useLocation, useNavigate } from "react-router-dom";
import { HandPosToDataConverter } from "../../components/features/AR/Converter";
import { useARToolkit } from "../AR/hooks/useARTools";
import scanStyles from "../../components/features/AR/scan/index.module.css";
import { ObjectSetting } from "../AR/DataToPosConverter";

const ARScanner = () => {
  const navigate = useNavigate();
  const [markerDetected, setMarkerDetected] = useState(false);

  useEffect(() => {
    const markerFoundHandler = () => {
      setMarkerDetected(true);
      //canvasを全て削除する
      const canvases = document.querySelectorAll("canvas");
      for (const canvas of canvases) {
        canvas.remove();
      }
      //type="module"のscriptタグ以外全て削除する
      const scripts = document.querySelectorAll("script");
      for (const script of scripts) {
        if (script.type !== "module") {
          script.remove();
        }
      }
      navigate("/play_start");
    };
    const markerLostHandler = () => {
      setMarkerDetected(false);
    };
    window.addEventListener("markerFound", markerFoundHandler);
    window.addEventListener("markerLost", markerLostHandler);

    return () => {
      window.removeEventListener("markerFound", markerFoundHandler);
      window.removeEventListener("markerLost", markerLostHandler);
    };
  }, [navigate]);

  if (markerDetected) {
    return null;
  }

  return (
    <div className={scanStyles.overlay}>
      <p className={scanStyles.text}>すきゃん</p>
      <div className={scanStyles.scanner}>
        <div className={scanStyles["marker-frame"]} />
        <p className={scanStyles.attention}>
          あそんでるあいだも
          <br />
          マーカーは画面内に写してね
        </p>
      </div>
    </div>
  );
};

export default ARScanner;

export const PlayMultiMode = () => {
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
      <ARScanner />
      <div id="wrapper" />
      <ObjectSetting position={position} allBlockSet={allBlockSet} />
    </>
  );
};
