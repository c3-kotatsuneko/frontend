import { memo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeInit } from "../../components/features/AR/ThreeInit";
import {
	handInit,
	predictWebcam,
} from "../../components/features/AR/HandTracking";
import cameraPara from "../../assets/camera_para.dat?url";
import * as THREE from "three";
import type {
	HandLandmarker,
	HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useLocation } from "react-router-dom";
import {
	HandPosToDataConverter,
	DataToPosConverter,
} from "../../components/features/AR/Converter";
import { handBlockCatch } from "../../components/features/AR/BackendlessSystem";
import testData from "./testData";
import { tumikiSystem } from "../../components/features/AR/tumikiSystem";
import { useARToolkit } from "./hooks/useARTools";
import { ObjectSetting } from "./DataToPosConverter";

type Position = "front" | "left" | "right" | "back";

export type Tumiki = {
	overlapedBlockIndex: number[];
	isOverlap: boolean[];
};

const Component = () => {
	const navigate = useNavigate();
	const handCameraRef = useRef<HTMLVideoElement | null>(null);
	const handLandMarkerRef = useRef<HandLandmarker | null>(null);
	const handResultRef = useRef<HandLandmarkerResult | null>(null);

	const param = new URLSearchParams(useLocation().search);
	const position = (param.get("position") ?? "front") as Position;
	let lastBlockIndex = 2;
	switch (position) {
		case "front":
			lastBlockIndex = 2;
			break;
		case "left":
			lastBlockIndex = 7;
			break;
		case "right":
			lastBlockIndex = 12;
			break;
		case "back":
			lastBlockIndex = 17;
			break;
	}
	const tumikiRef = useRef<Tumiki>({
		overlapedBlockIndex: [lastBlockIndex],
		isOverlap: [false, false, true, false, false],
	});
	console.log(position);
	const marker = `/pattern-${position}Marker.patt`;

	const { rendererRef, sceneRef, cameraRef, handBlock, allBlockSet } =
		ThreeInit(); //lightRef, allBlockSet,をlint回避のため一度削除

	DataToPosConverter(position, testData, allBlockSet);
	const tt = document.createElement("canvas");
	tt.width = window.innerWidth;
	tt.height = window.innerHeight;
	const { arToolkitSource, arToolkitContext } = useARToolkit({
		camera: cameraRef.current ?? new THREE.Camera(),
		cameraParaDatURL: cameraPara,
		domElement: rendererRef.current?.domElement ?? tt,
		markerPatternURL: marker,
		scene: sceneRef.current ?? new THREE.Scene(),
	});

	useEffect(() => {
		handInit(handLandMarkerRef);
	}, []);
	useEffect(() => {
		handCameraRef.current = arToolkitSource.domElement;
		predictWebcam(handLandMarkerRef, handCameraRef, handResultRef);
	}, [arToolkitSource]);

	const animate = useCallback(() => {
		if (position !== null) {
			if (handResultRef.current) {
				if (handResultRef.current.landmarks.length > 0) {
					const worldHandInfo = HandPosToDataConverter(
						position,
						handResultRef,
						handBlock,
					);
					if (worldHandInfo) {
						handBlockCatch(
							position,
							handResultRef,
							allBlockSet,
							tumikiRef,
							worldHandInfo,
						);
					}
				}
			}
			if (tumikiRef.current && allBlockSet.current && position) {
				tumikiSystem(position, tumikiRef, allBlockSet);
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
		//tumikiRefが5つtrueなら/congratulation_share_snsに遷移
		if (tumikiRef.current) {
			if (tumikiRef.current.isOverlap.every((value) => value)) {
				//type="module"のscriptタグ以外全て削除する
				const scripts = document.querySelectorAll("script");
				for (const script of scripts) {
					if (script.type !== "module") {
						script.remove();
					}
				}
				//videoタグを削除
				const video = document.querySelectorAll("video");
				for (const canvas of video) {
					canvas.remove();
				}
				//canvasを全て削除する
				const canvases = document.querySelectorAll("canvas");
				for (const canvas of canvases) {
					canvas.remove();
				}
				navigate("/congratulation_share_sns");
			}
		}
		requestAnimationFrame(animate);
	}, [
		position,
		rendererRef,
		sceneRef,
		cameraRef,
		allBlockSet,
		handBlock,
		arToolkitSource.ready,
		arToolkitSource.domElement,
		arToolkitContext,
		navigate,
	]);

	useEffect(() => {
		animate();
	}, [animate]);

	return (
		<>
			<div id="wrapper" />
			<ObjectSetting position={position} allBlockSet={allBlockSet} />
		</>
	);
};
export const ARfunction = memo(Component);
