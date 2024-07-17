import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

console.log(location.pathname);

const url = location.pathname;

let handLandmarker: HandLandmarker | undefined;
let enableWebcamButton: HTMLButtonElement;
let video: HTMLVideoElement;
let webcamRunning = false;

const startSetup = () => {
  startAR();
};

const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 2,
  });
  webcamRunning = true;
  enableCam();
};
createHandLandmarker();

const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

if (url === "/ar") {
  //body要素を取得
  const body = document.querySelector("body");
  //bodyの中身を削除
  //bodyにa-sceneを追加
  const scene = document.createElement("a-scene");
  scene.setAttribute("embedded", "");
  scene.setAttribute("arjs", "");
  //bodyの中にsceneを追加
  if (body !== null) {
    body.appendChild(scene);
  }

  //id="arButton"の要素を作成
  const arButton = document.createElement("button");
  arButton.textContent = "ARstart";
  arButton.addEventListener("click", startSetup);
  //id="video"の要素を作成
  const handTrack = document.createElement("video");
  handTrack.setAttribute("id", "video");
  handTrack.setAttribute("autoplay", "");
  handTrack.setAttribute("muted", "");
  //styleを設定
  handTrack.style.display = "none";
  //bodyの中に追加
  if (body !== null) {
    body.appendChild(handTrack);
  }
  enableWebcamButton = arButton;
  video = handTrack;
  if (hasGetUserMedia()) {
    console.log("getUserMedia()が使えるよ");
    //id="arButton"の要素を取得
    if (enableWebcamButton === null) {
      console.warn("enableWebcamButtonが存在しないよ");
    }
    enableWebcamButton.addEventListener("click", startSetup);
  } else {
    console.warn(
      "getUserMedia()がこのブラウザでは対応してないよ、そんなブラウザ捨ててしまえ！"
    );
  }
  startSetup();
}

function enableCam() {
  if (!handLandmarker) {
    console.log("まだ映像が読み込めてないよ");
    return;
  }
  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

let lastVideoTime = -1;
let detections = undefined;
async function predictWebcam() {
  console.log("predictWebcam");
  const startTimeMs = performance.now();
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime;
    if (handLandmarker) {
      detections = handLandmarker.detectForVideo(video, startTimeMs);
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
        //handTopPosの原点からの距離の絶対値が0.1以上なら掌を開いている
        const dist = Math.sqrt(
          handTopPos.x * handTopPos.x +
            handTopPos.y * handTopPos.y +
            handTopPos.z * handTopPos.z
        );
        console.log(dist);
        let status: string;
        if (dist > 0.4) {
          status = "red";
        } else {
          status = "blue";
        }
        //handMidPosとhandTopPosから手の向きを判定
        const handDir = {
          x: handMidPos.x - handTopPos.x,
          y: handMidPos.y - handTopPos.y,
          z: handMidPos.z - handTopPos.z,
        };
        //handDirを度数法に変換しx軸y軸z軸の回転を求める
        const angleX = Math.atan2(handDir.z, handDir.y) * (180 / Math.PI);
        const angleY = Math.atan2(handDir.x, handDir.z) * (180 / Math.PI);
        const angleZ = Math.atan2(handDir.y, handDir.x) * (180 / Math.PI);
        //id="marker"にa-boxを追加
        const frontMarker = document.getElementById("frontMarker");
        //id="box"が存在する場合は属性だけ変更
        const box = document.getElementById("box");
        if (box !== null) {
          box.setAttribute(
            "position",
            `${handPos.x} ${handPos.y} ${handPos.z}`
          );
          box.setAttribute("color", status);
          box.setAttribute("rotation", `${angleX} ${angleY} ${angleZ}`);
        } else {
          const box = document.createElement("a-box");
          box.setAttribute("id", "box");
          box.setAttribute(
            "position",
            `${handPos.x} ${handPos.y} ${handPos.z}`
          );
          box.setAttribute("color", status);
          box.setAttribute("width", "0.1");
          box.setAttribute("height", "0.1");
          box.setAttribute("depth", "0.1");
          box.setAttribute("rotation", `${angleX} ${angleY} ${angleZ}`);
          frontMarker?.appendChild(box);
        }
        console.log(handPos);
      }
    }
  }
  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam);
  }
}

function startAR() {
  //body要素を取得
  const body = document.querySelector("body");
  //a-sceneを取得
  const scene = document.querySelector("a-scene");
  //a-sceneの中にa-marker-cameraを追加
  const frontMarker = document.createElement("a-marker");
  frontMarker.setAttribute("type", "pattern");
  frontMarker.setAttribute("url", "/pattern-hackU.patt");
  frontMarker.setAttribute("id", "frontMarker");
  //sceneの中にfrontMarkerを追加
  //frontMarkerにa-boxを追加
  const box = document.createElement("a-box");
  box.setAttribute("position", "0 0 0");
  box.setAttribute("width", "0.5");
  box.setAttribute("height", "0.5");
  box.setAttribute("depth", "0.5");
  const stage = document.createElement("a-box");

  stage.setAttribute("position", "0 -0.7 1");
  stage.setAttribute("width", "5");
  stage.setAttribute("height", "2");
  stage.setAttribute("depth", "0.5");
  frontMarker.appendChild(box);

  if (scene !== null) {
    scene.appendChild(frontMarker);
  }
  //<a-entity camera></a-entity>を定義
  const camera = document.createElement("a-entity");
  camera.setAttribute("camera", "");
  //bodyの中に追加
  if (body !== null) {
    body.appendChild(camera);
  }
}

// const createHandLandmarker = async () => {
//   const vision = await FilesetResolver.forVisionTasks(
//     "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//   );
//   const handLandmarker = await HandLandmarker.createFromOptions(vision, {
//     baseOptions: {
//       modelAssetPath:
//         "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
//       delegate: "CPU",
//     },
//     numHands: 1,
//   });
//   const videoChange = async () => {
//     handLandmarker.setOptions({ runningMode: "VIDEO" }).then(() => {
//       if (source.currentTime !== time) {
//         const detections = handLandmarker.detectForVideo(source, time);
//         time = source.currentTime;
//         if (detections.landmarks.length > 0) {
//           const handMidPos = {
//             x: detections.landmarks[0][9].x - detections.landmarks[0][0].x,
//             y: detections.landmarks[0][9].y - detections.landmarks[0][0].y,
//             z: detections.landmarks[0][9].z - detections.landmarks[0][0].z,
//           };
//           const handTopPos = {
//             x: detections.landmarks[0][12].x - detections.landmarks[0][0].x,
//             y: detections.landmarks[0][12].y - detections.landmarks[0][0].y,
//             z: detections.landmarks[0][12].z - detections.landmarks[0][0].z,
//           };
//           const handPos = {
//             x: (detections.landmarks[0][0].x - 0.5) * 5,
//             y: (detections.landmarks[0][0].y - 0.5) * 5,
//             z: detections.landmarks[0][0].z,
//           };
//           //handTopPosの原点からの距離の絶対値が0.1以上なら掌を開いている
//           const dist = Math.sqrt(
//             handTopPos.x * handTopPos.x +
//               handTopPos.y * handTopPos.y +
//               handTopPos.z * handTopPos.z
//           );
//           console.log(dist);
//           var status;
//           if (dist > 0.4) {
//             status = "red";
//           } else {
//             status = "blue";
//           }
//           //id="marker"にa-boxを追加
//           const marker = document.getElementById("marker");
//           const box = document.createElement("a-box");
//           box.setAttribute(
//             "position",
//             `${handPos.x} ${handPos.y} ${handPos.z}`
//           );
//           box.setAttribute("color", status);
//           box.setAttribute("width", "0.1");
//           box.setAttribute("height", "0.1");
//           box.setAttribute("depth", "0.1");
//           marker?.appendChild(box);
//           console.log(handPos);
//         }
//       }
//     });
//     requestAnimationFrame(() => {
//       videoChange();
//     });
//   };
//   videoChange();
// };
