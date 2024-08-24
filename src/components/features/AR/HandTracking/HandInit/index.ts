import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

export const useHandInit = async (
  handLandMarkerRef: React.RefObject<HandLandmarker>
) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  handLandMarkerRef.current = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });
};

export const useCameraInit = async (
  handCameraRef: React.RefObject<HTMLVideoElement>
) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 480,
      height: 640,
      facingMode: "environment",
    },
  });
  if (handCameraRef.current) {
    handCameraRef.current.srcObject = stream;
    console.log(handCameraRef.current.srcObject);
  }
};

export const usePredictWebcam = async (
  handLandMarkerRef: React.RefObject<HandLandmarker>,
  handCameraRef: React.RefObject<HTMLVideoElement>,
  handResultRef: React.RefObject<HandLandmarkerResult>
) => {
  let lastVideoTime = -1;
  const startTimeMs = performance.now();
  async function predictWebcam() {
    console.log("predictWebcam");
    if (handCameraRef.current) {
      if (lastVideoTime !== handCameraRef.current.currentTime) {
        lastVideoTime = handCameraRef.current.currentTime;
        if (handLandMarkerRef.current) {
          const results = await handLandMarkerRef.current.detectForVideo(
            handCameraRef.current,
            startTimeMs
          );
          handResultRef.current = results;
          return handResultRef;
        }
      }
    }
    requestAnimationFrame(predictWebcam);
  }
  predictWebcam();
};
