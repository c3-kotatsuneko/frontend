import { useEffect, useRef, useState } from "react";
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

type Position = "front" | "left" | "right" | "back";

//three.jsのオブジェクトデータ
type AllObject = {
  frontBlockSet: THREE.Mesh[];
  leftBlockSet: THREE.Mesh[];
  rightBlockSet: THREE.Mesh[];
  backBlockSet: THREE.Mesh[];
  stage: THREE.Mesh;
};

//websocketで受け取るデータ
type AllObjectInfo = {
  frontBlockSet: objectInfo[]; //frontのブロックの情報
  leftBlockSet: objectInfo[]; //leftのブロックの情報
  rightBlockSet: objectInfo[]; //rightのブロックの情報
  backBlockSet: objectInfo[]; //backのブロックの情報
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
    light.position.set(2.4, 2, 5);
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
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
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
  return {
    rendererRef: useRef<THREE.WebGLRenderer | null>(null),
    sceneRef: useRef<THREE.Scene | null>(null),
    cameraRef: useRef<THREE.PerspectiveCamera | null>(null),
    lightRef: useRef<THREE.DirectionalLight | null>(null),
    allBlockSet: useRef<AllObject | null>(null),
    handBlock: useRef<THREE.Mesh | null>(null),
  };
};

const handTracking = (position: Position) => {
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [handInfo, setHandInfo] = useState<handInfo | null>(null);
  const [handPos, setHandPos] = useState<position | null>(null);
  const [handAngle, setHandAngle] = useState<angle | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handLandmarkerRef = useRef<HandLandmarker | undefined>(undefined);
  useEffect(() => {
    const arCamera = document.getElementById("arjs-video") as HTMLVideoElement;
    videoRef.current = arCamera;
    console.log("videoRef", arCamera);
  }, []);
  useEffect(() => {
    const arCamera = document.getElementById("arjs-video") as HTMLVideoElement;
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
            delegate: "CPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        }
      );
      setWebcamRunning(true);
      enableCam();
    };

    createHandLandmarker();
  }, []);

  const predictWebcam = async () => {
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
            // front, left, right, backの場合に分けて手の座標をworld座標に変換
            //以下クソ長処理ゾーン
            const angle: angle = {
              x: angleX,
              y: angleY,
              z: angleZ,
            };
            let handInfo: handInfo;
            let handObject: objectInfo;
            switch (position) {
              case "front":
                handObject = frontObjectToWorld({
                  position: handPos,
                  angle,
                  scale: { x: 1, y: 1, z: 1 },
                }).object;
                handInfo = {
                  handStatus: status,
                  handPos: handObject.position,
                  handAngle: handObject.angle,
                };
                setHandInfo(handInfo);
                setHandPos(handPos);
                setHandAngle(angle);
                break;
              case "left":
                handObject = leftObjectToWorld({
                  position: handPos,
                  angle,
                  scale: { x: 1, y: 1, z: 1 },
                }).object;
                handInfo = {
                  handStatus: status,
                  handPos: handObject.position,
                  handAngle: handObject.angle,
                };
                setHandInfo(handInfo);
                setHandPos(handPos);
                setHandAngle(angle);
                break;
              case "right":
                handObject = rightObjectToWorld({
                  position: handPos,
                  angle,
                  scale: { x: 1, y: 1, z: 1 },
                }).object;
                handInfo = {
                  handStatus: status,
                  handPos: handObject.position,
                  handAngle: handObject.angle,
                };
                setHandInfo(handInfo);
                setHandPos(handPos);
                setHandAngle(angle);
                break;
              case "back":
                handObject = backObjectToWorld({
                  position: handPos,
                  angle,
                  scale: { x: 1, y: 1, z: 1 },
                }).object;
                handInfo = {
                  handStatus: status,
                  handPos: handObject.position,
                  handAngle: handObject.angle,
                };
                setHandInfo(handInfo);
                setHandPos(handPos);
                setHandAngle(angle);
                break;
            }
          }
        }
      }

      if (webcamRunning) {
        requestAnimationFrame(processFrame);
        console.log("processFrame");
      }
    };

    processFrame();
  };

  return {
    handInfo,
    handPos,
    handAngle,
  };
};

const ARApp = () => {
  //three.jsゾーン
  const [position, setPosition] = useState<Position>("right");
  const [allObject, setAllObject] = useState<AllObject | null>(null);
  const [allObjectInfo, setallObjectInfo] = useState<AllObjectInfo | null>(
    null
  );
  const [handInfo, setHandInfo] = useState<handInfo | null>(null);
  const { rendererRef, sceneRef, cameraRef, allBlockSet, handBlock } =
    useInitializeThreeJS();
  let markerURL = "";

  //ハンドトラッキング
  const { handInfo: handInfoData, handPos, handAngle } = handTracking(position);
  useEffect(() => {
    if (handInfoData) {
      setHandInfo(handInfoData);
      if (handPos) {
        handBlock?.current?.position.set(handPos.x, handPos.y, handPos.z);
      }
      if (handAngle) {
        handBlock?.current?.rotation.set(handAngle.x, handAngle.y, handAngle.z);
      }
    }
  }, [handInfoData, handPos, handAngle, handBlock]);

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

  useEffect(() => {
    const debugLog = (e: Event) => {
      console.log("marker found!", e);
    };
    window.addEventListener("markerFound", debugLog);
    const animate = () => {
      requestAnimationFrame(animate);
      //front, left, right, backの場合に分けて処理を行う
      //以下クソ長処理ゾーン
      switch (position) {
        case "front":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontPos: objectInfo = worldObjectToFront(
                  allObjectInfo.frontBlockSet[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontPos.position.x,
                  frontPos.position.y,
                  frontPos.position.z
                );
                const leftPos: objectInfo = worldObjectToFront(
                  allObjectInfo.leftBlockSet[i]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftPos.position.x,
                  leftPos.position.y,
                  leftPos.position.z
                );
                const rightPos: objectInfo = worldObjectToFront(
                  allObjectInfo.rightBlockSet[i]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightPos.position.x,
                  rightPos.position.y,
                  rightPos.position.z
                );
                const backPos: objectInfo = worldObjectToFront(
                  allObjectInfo.backBlockSet[i]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backPos.position.x,
                  backPos.position.y,
                  backPos.position.z
                );
              }
            }
          }
          break;
        case "left":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontPos: objectInfo = worldObjectToLeft(
                  allObjectInfo.frontBlockSet[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontPos.position.x,
                  frontPos.position.y,
                  frontPos.position.z
                );
                const leftPos: objectInfo = worldObjectToLeft(
                  allObjectInfo.leftBlockSet[i]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftPos.position.x,
                  leftPos.position.y,
                  leftPos.position.z
                );
                const rightPos: objectInfo = worldObjectToLeft(
                  allObjectInfo.rightBlockSet[i]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightPos.position.x,
                  rightPos.position.y,
                  rightPos.position.z
                );
                const backPos: objectInfo = worldObjectToLeft(
                  allObjectInfo.backBlockSet[i]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backPos.position.x,
                  backPos.position.y,
                  backPos.position.z
                );
              }
            }
          }
          break;
        case "right":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontPos: objectInfo = worldObjectToRight(
                  allObjectInfo.frontBlockSet[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontPos.position.x,
                  frontPos.position.y,
                  frontPos.position.z
                );
                const leftPos: objectInfo = worldObjectToRight(
                  allObjectInfo.leftBlockSet[i]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftPos.position.x,
                  leftPos.position.y,
                  leftPos.position.z
                );
                const rightPos: objectInfo = worldObjectToRight(
                  allObjectInfo.rightBlockSet[i]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightPos.position.x,
                  rightPos.position.y,
                  rightPos.position.z
                );
                const backPos: objectInfo = worldObjectToRight(
                  allObjectInfo.backBlockSet[i]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backPos.position.x,
                  backPos.position.y,
                  backPos.position.z
                );
              }
            }
          }
          break;
        case "back":
          if (allBlockSet) {
            if (allObjectInfo) {
              for (let i = 0; i < 5; i++) {
                const frontPos: objectInfo = worldObjectToBack(
                  allObjectInfo.frontBlockSet[i]
                ).object;
                allBlockSet.current?.frontBlockSet[i]?.position.set(
                  frontPos.position.x,
                  frontPos.position.y,
                  frontPos.position.z
                );
                const leftPos: objectInfo = worldObjectToBack(
                  allObjectInfo.leftBlockSet[i]
                ).object;
                allBlockSet.current?.leftBlockSet[i]?.position.set(
                  leftPos.position.x,
                  leftPos.position.y,
                  leftPos.position.z
                );
                const rightPos: objectInfo = worldObjectToBack(
                  allObjectInfo.rightBlockSet[i]
                ).object;
                allBlockSet.current?.rightBlockSet[i]?.position.set(
                  rightPos.position.x,
                  rightPos.position.y,
                  rightPos.position.z
                );
                const backPos: objectInfo = worldObjectToBack(
                  allObjectInfo.backBlockSet[i]
                ).object;
                allBlockSet.current?.backBlockSet[i]?.position.set(
                  backPos.position.x,
                  backPos.position.y,
                  backPos.position.z
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

  //ハンドトラッキングゾーン

  return null;
};

export default ARApp;
