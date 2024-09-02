import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const ARScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [markerDetected, setMarkerDetected] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("カメラのアクセスに失敗しました:", error);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    const markerFoundHandler = () => {
      setMarkerDetected(true);
    };
    const markerLostHandler = () => {
      setMarkerDetected(false);
    };
    window.addEventListener("markerFound", markerFoundHandler);
    window.addEventListener("markerLost", markerLostHandler);
  }, []);

  if (markerDetected) {
    return null;
  }

  return (
    <div>
      <div className={styles.overlay}>
        <p className={styles.text}>すきゃん</p>
        <div className={styles.scanner}>
          {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <video ref={videoRef} autoPlay></video>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div className={styles["marker-frame"]}></div>
          <p className={styles.attention}>
            あそんでるあいだも
            <br />
            マーカーは画面内に写してね
          </p>
        </div>
      </div>
    </div>
  );
};

export default ARScanner;
