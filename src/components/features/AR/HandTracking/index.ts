import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";

export const HandTracking = (targetElement: HTMLVideoElement) => {
  const [cameraIsAble, setCameraIsAble] = useState<boolean>(false);

  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });
  };

  let lastVideoTime = -1;
  const processFrame = async (
    videoElement: HTMLVideoElement
  ): Promise<void> => {
    console.log("processFrame");
    const startTimeMs = performance.now();
    if (lastVideoTime !== videoElement.currentTime) {
      lastVideoTime = videoElement.currentTime;
      if (handLandmarkerRef.current) {
        await handLandmarkerRef.current.detectForVideo(
          videoElement,
          startTimeMs
        );
      }
    }
  };

  useEffect(() => {
    if (targetElement.srcObject) {
      let getCameraElement: HTMLVideoElement = document.createElement("video");
      getCameraElement.srcObject = targetElement.srcObject;
      getCameraElement.addEventListener("loadeddata", () => {
        setCameraIsAble(true);
        if (cameraIsAble) {
          requestAnimationFrame(() => processFrame(getCameraElement));
        }
      });
    }
    if (handLandmarkerRef.current != null) {
      createHandLandmarker();
    }
  }, []);

  useEffect(() => {}, []);
};
