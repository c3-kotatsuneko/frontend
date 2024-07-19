import { useCallback, useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import * as THREE from "three";
import cameraPara from "../assets/camera_para.dat?url";
import { useARToolkit } from "../hooks/useARTools";
import {
  frontObjectToWorld, // frontのオブジェクトをworldオブジェクトに変換
  leftObjectToWorld, // leftのオブジェクトをworldオブジェクトに変換
  rightObjectToWorld, // rightのオブジェクトをworldオブジェクトに変換
  backObjectToWorld, // backのオブジェクトをworldオブジェクトに変換
  worldObjectToFront, // worldのオブジェクトをfrontオブジェクトに変換
  worldObjectToLeft, // worldのオブジェクトをleftオブジェクトに変換
  worldObjectToRight, // worldのオブジェクトをrightオブジェクトに変換
  worldObjectToBack, // worldのオブジェクトをbackオブジェクトに変換
} from "./arTransform";
import type {
  angle, // オブジェクトの角度 x y z
  position, // オブジェクトの位置 x y z
  scale, // オブジェクトの大きさ x y z
  objectInfo, // オブジェクトの情報 position angle scale
} from "./arTransform";
import "./index.css";

import testData from "./testData";

type Position = "front" | "left" | "right" | "back";

//three.jsのオブジェクトデータ
type AllObject = {
  frontBlockSet: THREE.Mesh[];
  leftBlockSet: THREE.Mesh[];
  rightBlockSet: THREE.Mesh[];
  backBlockSet: THREE.Mesh[];
  stage: THREE.Mesh;
};

//websocketで送るデータの型
type handInfo = {
  handStatus: string; //手の状態
  handPos: position; //手の位置
  handAngle: angle; //手の角度
};

const useInitializeThreeJS = () => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const allBlockSet = useRef<AllObject | null>(null); //積み木のオブジェクト
  const handBlock = useRef<THREE.Mesh | null>(null); //手のオブジェクト

  if (
    !rendererRef.current ||
    !sceneRef.current ||
    !cameraRef.current ||
    !lightRef.current ||
    !allBlockSet.current
  ) {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    const reactRoot = document.body.firstChild;
    document.body.insertBefore(renderer.domElement, reactRoot);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 2000);
    camera.position.set(1, 1.5, 1.5);
    camera.lookAt(new THREE.Vector3(0, 0.5, 0));
    scene.add(camera);
    cameraRef.current = camera;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2.4, 2, -5);
    scene.add(light);
    lightRef.current = light;

    //frontは色は赤系統の色でpositionは0 -0.8 0、scaleは0.1 0.1 0.1で初期化
    const frontBlockSet: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const frontBlock = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
      );
      frontBlock.position.set(0, -0.8, 0);
      scene.add(frontBlock);
      frontBlockSet.push(frontBlock);
    }
    //leftは色は青系統の色でpositionは-1 -0.8 0、scaleは0.1 0.1 0.1で初期化
    const leftBlockSet: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const leftBlock = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x0000ff })
      );
      leftBlock.position.set(0, -0.8, 0);
      scene.add(leftBlock);
      leftBlockSet.push(leftBlock);
    }
    //rightは色は緑系統の色でpositionは1 -0.8 0、scaleは0.1 0.1 0.1で初期化
    const rightBlockSet: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const rightBlock = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      );
      rightBlock.position.set(0, -0.8, 0);
      scene.add(rightBlock);
      rightBlockSet.push(rightBlock);
    }
    //backは色は黄色系統の色でpositionは0 -0.8 1、scaleは0.1 0.1 0.1で初期化
    const backBlockSet: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const backBlock = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0xffff00 })
      );
      backBlock.position.set(0, -0.8, 0);
      scene.add(backBlock);
      backBlockSet.push(backBlock);
    }
    //マーカーと被せるキューブ
    const markerBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.4, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xdddddd })
    );
    //ハンドトラッキングの手
    const hand = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    handBlock.current = hand;
    hand.position.set(0, -0.8, 0);
    scene.add(hand);
    markerBox.position.set(0, -0.8, 0);
    scene.add(markerBox);
    //useRefを使ってオブジェクトを保存
    allBlockSet.current = {
      frontBlockSet,
      leftBlockSet,
      rightBlockSet,
      backBlockSet,
      stage: markerBox,
    };
  }
  console.log(rendererRef, sceneRef, cameraRef, lightRef, allBlockSet);
  return { rendererRef, sceneRef, cameraRef, lightRef, allBlockSet, handBlock };
};

const ARApp = () => {
  //three.jsゾーン
  const [position, setPosition] = useState<Position>("left");
  const [allObjectInfo, setallObjectInfo] = useState<objectInfo[] | null>(
    testData
  );
  const [handInfo, setHandInfo] = useState<handInfo | null>(null);
  const { rendererRef, sceneRef, cameraRef, allBlockSet, handBlock } =
    useInitializeThreeJS();
  let markerURL = "";
  //ポジションごとにマーカーのURLを変える

  switch (position) {
    case "front":
      markerURL = "../../public/pattern-testFrontMarker.patt?url";
      break;
    case "left":
      markerURL = "../../public/pattern-testLeftMarker.patt?url";
      break;
    case "right":
      markerURL = "../../public/pattern-testRightMarker.patt?url";
      break;
    case "back":
      markerURL = "../../public/pattern-testBackMarker.patt?url";
      break;
  }

  const { arToolkitContext, arToolkitSource } = useARToolkit({
    camera: cameraRef.current!,
    cameraParaDatURL: cameraPara,
    domElement: rendererRef.current!.domElement,
    markerPatternURL: markerURL,
    scene: sceneRef.current!,
  });

  const HandTrackingComponent = () => {
    const [webcamRunning, setWebcamRunning] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const handLandmarkerRef = useRef<HandLandmarker | undefined>(undefined);
    const predictWebcam = useCallback(async () => {
      console.log("predictWebcam");
      const video = videoRef.current;
      if (!video) return;

      let lastVideoTime = -1;
      let detections = undefined;

      const processFrame = async () => {
        const startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          if (handLandmarkerRef.current) {
            detections = handLandmarkerRef.current.detectForVideo(
              video,
              startTimeMs
            );

            if (detections.landmarks.length > 0) {
              const handMidPos = {
                x: detections.landmarks[0][9].x - detections.landmarks[0][0].x,
                y: detections.landmarks[0][9].y - detections.landmarks[0][0].y,
                z: detections.landmarks[0][9].z - detections.landmarks[0][0].z,
              };
              const handTopPos = {
                x: detections.landmarks[0][12].x - detections.landmarks[0][0].x,
                y: detections.landmarks[0][12].y - detections.landmarks[0][0].y,
                z: detections.landmarks[0][12].z - detections.landmarks[0][0].z,
              };
              const handPos = {
                x: (detections.landmarks[0][0].x - 0.5) * 5,
                y: (detections.landmarks[0][0].y - 0.5) * 5,
                z: detections.landmarks[0][0].z,
              };
              // console.log("x/y/z", handMidPos);
              const dist = Math.sqrt(
                handTopPos.x * handTopPos.x +
                  handTopPos.y * handTopPos.y +
                  handTopPos.z * handTopPos.z
              );
              console.log(dist);
              let status = "";
              if (dist > 0.4) {
                status = "open";
              } else {
                status = "close";
              }
              const handDir = {
                x: handMidPos.x - handTopPos.x,
                y: handMidPos.y - handTopPos.y,
                z: handMidPos.z - handTopPos.z,
              };
              const angleX = Math.atan2(handDir.z, handDir.y) * (180 / Math.PI);
              const angleY = Math.atan2(handDir.x, handDir.z) * (180 / Math.PI);
              const angleZ = Math.atan2(handDir.y, handDir.x) * (180 / Math.PI);
              const handAngle = {
                x: angleX,
                y: angleZ,
                z: angleY,
              };
              handBlock.current?.position.set(handPos.x, handPos.z, handPos.y);
              handBlock.current?.rotation.set(angleX, angleZ, angleY);
              // クソ長処理ゾーン
            }
            //   console.log(detections);
          }
        }

        if (webcamRunning) {
          requestAnimationFrame(processFrame);
        }
      };

      processFrame();
    }, [webcamRunning, videoRef, handLandmarkerRef]);
    // useEffect(() => {
    //   const arCamera = document.getElementById("arjs-video") as HTMLVideoElement;
    //   videoRef.current = arCamera;
    //   console.log("videoRef", arCamera);
    // }, [predictWebcam]);
    useEffect(() => {
      const targetNode = document.documentElement;

      // MutationObserverのコールバック関数を定義
      const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            for (let node of mutation.addedNodes) {
              if (node.id === "arjs-video") {
                console.log('Element with id "hoge" has been added.');
                // ここに対象要素が追加された際の処理を記述する
                const arCamera = document.getElementById(
                  "arjs-video"
                ) as HTMLVideoElement;
                videoRef.current = arCamera;
                console.log("videoRef", arCamera);
              }
            }
          }
        }
      };

      // MutationObserverのオプションを設定
      const config = { childList: true, subtree: true };

      // MutationObserverをインスタンス化し、監視を開始
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);

      const arCamera = document.getElementById(
        "arjs-video"
      ) as HTMLVideoElement;
      videoRef.current = arCamera;
      console.log("videoRef", arCamera);
      const enableCam = () => {
        if (!handLandmarkerRef.current) {
          console.log("まだ映像が読み込めてないよ");
          return;
        }
        console.log("映像読み込み完了", handLandmarkerRef);

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadeddata", predictWebcam);
          }
        });
      };

      const createHandLandmarker = async () => {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
          }
        );
        setWebcamRunning(true);
        enableCam();
      };

      createHandLandmarker();
    }, [predictWebcam]);

    return (
      <div>
        <video
          ref={videoRef}
          id="video"
          style={{ display: "none" }}
          autoPlay
          muted
        />
      </div>
    );
  };

  useEffect(() => {
    const debugLog = (e: Event) => {
      console.log("marker found!", e);
    };
    window.addEventListener("markerFound", debugLog);
    const animate = () => {
      //front, left, right, backの場合に分けて処理を行う
      //以下クソ長処理ゾーン
      switch (position) {
        case "front":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontInfo: objectInfo = worldObjectToFront(
                  allObjectInfo[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontInfo.position.x,
                  frontInfo.position.y,
                  frontInfo.position.z
                );
                allBlockSet.current?.frontBlockSet[i]?.rotation.set(
                  frontInfo.angle.x,
                  frontInfo.angle.y,
                  frontInfo.angle.z
                );
                const leftInfo: objectInfo = worldObjectToFront(
                  allObjectInfo[i + 5]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftInfo.position.x,
                  leftInfo.position.y,
                  leftInfo.position.z
                );
                allBlockSet.current?.leftBlockSet[i]?.rotation.set(
                  leftInfo.angle.x,
                  leftInfo.angle.y,
                  leftInfo.angle.z
                );
                const rightInfo: objectInfo = worldObjectToFront(
                  allObjectInfo[i + 10]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightInfo.position.x,
                  rightInfo.position.y,
                  rightInfo.position.z
                );
                allBlockSet.current?.rightBlockSet[i]?.rotation.set(
                  rightInfo.angle.x,
                  rightInfo.angle.y,
                  rightInfo.angle.z
                );
                const backInfo: objectInfo = worldObjectToFront(
                  allObjectInfo[i + 15]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backInfo.position.x,
                  backInfo.position.y,
                  backInfo.position.z
                );
                allBlockSet.current?.backBlockSet[i]?.rotation.set(
                  backInfo.angle.x,
                  backInfo.angle.y,
                  backInfo.angle.z
                );
              }
            }
          }
          break;
        case "left":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontInfo: objectInfo = worldObjectToLeft(
                  allObjectInfo[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontInfo.position.x,
                  frontInfo.position.y,
                  frontInfo.position.z
                );
                allBlockSet.current?.frontBlockSet[i]?.rotation.set(
                  frontInfo.angle.x,
                  frontInfo.angle.y,
                  frontInfo.angle.z
                );
                const leftInfo: objectInfo = worldObjectToLeft(
                  allObjectInfo[i + 5]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftInfo.position.x,
                  leftInfo.position.y,
                  leftInfo.position.z
                );
                allBlockSet.current?.leftBlockSet[i]?.rotation.set(
                  leftInfo.angle.x,
                  leftInfo.angle.y,
                  leftInfo.angle.z
                );
                const rightInfo: objectInfo = worldObjectToLeft(
                  allObjectInfo[i + 10]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightInfo.position.x,
                  rightInfo.position.y,
                  rightInfo.position.z
                );
                allBlockSet.current?.rightBlockSet[i]?.rotation.set(
                  rightInfo.angle.x,
                  rightInfo.angle.y,
                  rightInfo.angle.z
                );
                const backInfo: objectInfo = worldObjectToLeft(
                  allObjectInfo[i + 15]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backInfo.position.x,
                  backInfo.position.y,
                  backInfo.position.z
                );
                allBlockSet.current?.backBlockSet[i]?.rotation.set(
                  backInfo.angle.x,
                  backInfo.angle.y,
                  backInfo.angle.z
                );
              }
            }
          }
          break;
        case "right":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontInfo: objectInfo = worldObjectToRight(
                  allObjectInfo[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontInfo.position.x,
                  frontInfo.position.y,
                  frontInfo.position.z
                );
                allBlockSet.current?.frontBlockSet[i]?.rotation.set(
                  frontInfo.angle.x,
                  frontInfo.angle.y,
                  frontInfo.angle.z
                );
                const leftInfo: objectInfo = worldObjectToRight(
                  allObjectInfo[i + 5]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftInfo.position.x,
                  leftInfo.position.y,
                  leftInfo.position.z
                );
                allBlockSet.current?.leftBlockSet[i]?.rotation.set(
                  leftInfo.angle.x,
                  leftInfo.angle.y,
                  leftInfo.angle.z
                );
                const rightInfo: objectInfo = worldObjectToRight(
                  allObjectInfo[i + 10]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightInfo.position.x,
                  rightInfo.position.y,
                  rightInfo.position.z
                );
                allBlockSet.current?.rightBlockSet[i]?.rotation.set(
                  rightInfo.angle.x,
                  rightInfo.angle.y,
                  rightInfo.angle.z
                );
                const backInfo: objectInfo = worldObjectToRight(
                  allObjectInfo[i + 15]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backInfo.position.x,
                  backInfo.position.y,
                  backInfo.position.z
                );
                allBlockSet.current?.backBlockSet[i]?.rotation.set(
                  backInfo.angle.x,
                  backInfo.angle.y,
                  backInfo.angle.z
                );
              }
            }
          }
          break;
        case "back":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontInfo: objectInfo = worldObjectToBack(
                  allObjectInfo[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontInfo.position.x,
                  frontInfo.position.y,
                  frontInfo.position.z
                );
                allBlockSet.current?.frontBlockSet[i]?.rotation.set(
                  frontInfo.angle.x,
                  frontInfo.angle.y,
                  frontInfo.angle.z
                );
                const leftInfo: objectInfo = worldObjectToBack(
                  allObjectInfo[i + 5]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftInfo.position.x,
                  leftInfo.position.y,
                  leftInfo.position.z
                );
                allBlockSet.current?.leftBlockSet[i]?.rotation.set(
                  leftInfo.angle.x,
                  leftInfo.angle.y,
                  leftInfo.angle.z
                );
                const rightInfo: objectInfo = worldObjectToBack(
                  allObjectInfo[i + 10]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightInfo.position.x,
                  rightInfo.position.y,
                  rightInfo.position.z
                );
                allBlockSet.current?.rightBlockSet[i]?.rotation.set(
                  rightInfo.angle.x,
                  rightInfo.angle.y,
                  rightInfo.angle.z
                );
                const backInfo: objectInfo = worldObjectToBack(
                  allObjectInfo[i + 15]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backInfo.position.x,
                  backInfo.position.y,
                  backInfo.position.z
                );
                allBlockSet.current?.backBlockSet[i]?.rotation.set(
                  backInfo.angle.x,
                  backInfo.angle.y,
                  backInfo.angle.z
                );
              }
            }
          }
          break;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        if (arToolkitSource?.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
          sceneRef.current.visible = cameraRef.current.visible;
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("markerFound", debugLog);
    };
  }, [
    arToolkitContext,
    arToolkitSource,
    rendererRef,
    sceneRef,
    cameraRef,
    allBlockSet,
    allObjectInfo,
    position,
  ]);

  return (
    <>
      <HandTrackingComponent />
    </>
  );
};

export default ARApp;
