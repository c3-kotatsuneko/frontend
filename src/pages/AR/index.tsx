import { ThreeInit } from "../../components/features/AR/ThreeInit";
import ARScanner from "../../components/features/AR/scan";
import {
	cameraInit,
	handInit,
	predictWebcam,
} from "../../components/features/AR/HandTracking";
import { useARToolkit } from "./hooks/useARTools";
import cameraPara from "../../assets/camera_para.dat?url";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three"; // Add this import statement
import type {
	HandLandmarker,
	HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useLocation } from "react-router-dom";
import { HandPosToDataConverter } from "../../components/features/AR/Converter";

export const ARfunction = () => {
	const handCameraRef = useRef<HTMLVideoElement | null>(null);
	const handLandMarkerRef = useRef<HandLandmarker | null>(null);
	const handResultRef = useRef<HandLandmarkerResult | null>(null);
	const param = new URLSearchParams(useLocation().search);
	const position = param.get("position") as "front" | "left" | "right" | "back";
	console.log(position);
	let marker = "../../../public/pattern-frontMarker.patt";
	switch (position) {
		case "front":
			marker = "../../../public/pattern-frontMarker.patt";
			break;
		case "left":
			marker = "../../../public/pattern-leftMarker.patt";
			break;
		case "right":
			marker = "../../../public/pattern-rightMarker.patt";
			break;
		case "back":
			marker = "../../../public/pattern-backMarker.patt";
			break;
	}
	useEffect(() => {
		handInit(handLandMarkerRef);
		cameraInit(handCameraRef);
	}, []);
	useEffect(() => {
		predictWebcam(handLandMarkerRef, handCameraRef, handResultRef);
	}, []);
	const { rendererRef, sceneRef, cameraRef, handBlock } = ThreeInit(); //lightRef, allBlockSet,をlint回避のため一度削除
	const { arToolkitSource, arToolkitContext } = useARToolkit({
		camera: cameraRef.current ?? new THREE.Camera(),
		cameraParaDatURL: cameraPara,
		domElement:
			rendererRef.current?.domElement ?? document.createElement("canvas"),
		markerPatternURL: marker,
		scene: sceneRef.current ?? new THREE.Scene(),
	});

	const animate = useCallback(() => {
		if (position !== null) {
			if (handResultRef.current) {
				if (handResultRef.current.landmarks.length > 0) {
					HandPosToDataConverter(position, handResultRef, handBlock);
					console.log(handBlock);
				}
			}
		} else {
			if (handResultRef.current) {
				if (handResultRef.current.landmarks.length > 0) {
					HandPosToDataConverter("front", handResultRef, handBlock);
					console.log(handBlock);
				}
			}
		}

		if (rendererRef.current && sceneRef.current && cameraRef.current) {
			rendererRef.current.render(sceneRef.current, cameraRef.current);
			if (arToolkitSource.ready) {
				arToolkitContext.update(arToolkitSource.domElement);
				sceneRef.current.visible = cameraRef.current.visible;
			}
		}
		requestAnimationFrame(animate);
	}, [
		arToolkitContext,
		arToolkitSource,
		cameraRef,
		rendererRef,
		sceneRef,
		position,
		handBlock,
	]);
	useEffect(() => {
		animate();
	}, [animate]);

	return (
		<>
			<ARScanner />
			<video ref={handCameraRef} id="video" autoPlay muted>
				<track kind="captions" src="" label="No captions available" default />
			</video>
		</>
	);
};
