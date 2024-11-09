import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scanStyles from "../../components/features/AR/scan/index.module.css";
import { ARfunction } from "../AR";

const ARNaviScanner = () => {
	const navigate = useNavigate();
	const [markerDetected, setMarkerDetected] = useState(false);

	useEffect(() => {
		const markerFoundHandler = () => {
			setMarkerDetected(true);
			//canvasを全て削除する
			const canvases = document.querySelectorAll("canvas");
			for (const canvas of canvases) {
				canvas.remove();
			}
			//type="module"のscriptタグ以外全て削除する
			const scripts = document.querySelectorAll("script");
			for (const script of scripts) {
				if (script.type !== "module") {
					script.remove();
				}
			}
			navigate("/play_start");
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
	}, [navigate]);

	if (markerDetected) {
		return null;
	}

	return (
		<div className={scanStyles.overlay}>
			<p className={scanStyles.text}>すきゃん</p>
			<div className={scanStyles.scanner}>
				<div className={scanStyles["marker-frame"]} />
				<p className={scanStyles.attention}>
					あそんでるあいだも
					<br />
					マーカーは画面内に写してね
				</p>
			</div>
		</div>
	);
};

export default ARNaviScanner;

export const PlayMultiMode = () => {
	return (
		<>
			<ARNaviScanner />
			<ARfunction />
		</>
	);
};
