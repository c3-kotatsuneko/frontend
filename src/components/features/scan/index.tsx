import { useEffect, useRef } from 'react';
import styles from './index.module.css';

const ARScanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('カメラのアクセスに失敗しました:', error);
            }
        };

        startCamera();
    }, []);

    return (
        <div>
            <div className={styles.overlay}>
                <p className={styles.text}>すきゃん</p>
                <div className={styles.scanner}>
                    {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
                    {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                    <video ref={videoRef} autoPlay></video>
                    {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                    <div className={styles.markerFrame}></div>
                    <p className={styles.attention}>
                    あそんでるあいだも<br />
                    マーカーは画面内に写してね
                </p>
                </div>
            </div>
        </div>
    );
};

export default ARScanner;
