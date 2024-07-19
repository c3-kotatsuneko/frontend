import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const HandTrackingComponent = () => {
  const [webcamRunning, setWebcamRunning] = useState(false);
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
              status = "red";
            } else {
              status = "blue";
            }
            const handDir = {
              x: handMidPos.x - handTopPos.x,
              y: handMidPos.y - handTopPos.y,
              z: handMidPos.z - handTopPos.z,
            };
            const angleX = Math.atan2(handDir.z, handDir.y) * (180 / Math.PI);
            const angleY = Math.atan2(handDir.x, handDir.z) * (180 / Math.PI);
            const angleZ = Math.atan2(handDir.y, handDir.x) * (180 / Math.PI);
            const frontMarker = document.getElementById("frontMarker");
            const box = document.getElementById("box");
            if (box !== null) {
              box.setAttribute(
                "position",
                `${handPos.x} ${handPos.y} ${handPos.z}`
              );
              box.setAttribute("color", status);
              box.setAttribute("rotation", `${angleX} ${angleY} ${angleZ}`);
            } else {
              const newBox = document.createElement("a-box");
              newBox.setAttribute("id", "box");
              newBox.setAttribute(
                "position",
                `${handPos.x} ${handPos.y} ${handPos.z}`
              );
              newBox.setAttribute("color", status);
              newBox.setAttribute("width", "0.1");
              newBox.setAttribute("height", "0.1");
              newBox.setAttribute("depth", "0.1");
              newBox.setAttribute("rotation", `${angleX} ${angleY} ${angleZ}`);
              frontMarker?.appendChild(newBox);
            }
            // console.log(handPos);
          }
          //   console.log(detections);
        }
      }

      if (webcamRunning) {
        requestAnimationFrame(processFrame);
      }
    };

    processFrame();
  };

  return (
    <div>
      {/* <video
        ref={videoRef}
        id="video"
        style={{ display: "none" }}
        autoPlay
        muted
      ></video> */}
    </div>
  );
};

export default HandTrackingComponent;
