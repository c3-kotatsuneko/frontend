import { useEffect, useState } from "react";
import styles from "./index.module.css";

const ARScanner = () => {
  const [markerDetected, setMarkerDetected] = useState(false);

  useEffect(() => {
    const markerFoundHandler = () => {
      setMarkerDetected(true);
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
  }, []);

  if (markerDetected) {
    return null;
  }

  return (
    <div>
      <div className={styles.overlay}>
        <p className={styles.text}>すきゃん</p>
        <div className={styles.scanner}>
          <div className={styles["marker-frame"]} />
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
