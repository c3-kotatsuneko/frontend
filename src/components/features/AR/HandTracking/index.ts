import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

export const handInit = async (
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

export const cameraInit = async (
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

export const predictWebcam = async (
  handLandMarkerRef: React.RefObject<HandLandmarker>,
  handCameraRef: React.RefObject<HTMLVideoElement>,
  handResultRef: React.RefObject<HandLandmarkerResult>
) => {
  let lastVideoTime = -1;

  async function predictWebcam() {
    if (handCameraRef.current) {
      const currentTime = handCameraRef.current.currentTime;

      if (lastVideoTime !== currentTime) {
        lastVideoTime = currentTime;
        if (handLandMarkerRef.current) {
          const results = await handLandMarkerRef.current.detectForVideo(
            handCameraRef.current,
            performance.now()
          );
          handResultRef.current = results;
        }
      }
    }

    // フレームが処理されるたびに次のフレームをリクエスト
    requestAnimationFrame(predictWebcam);
  }

  predictWebcam();
};
