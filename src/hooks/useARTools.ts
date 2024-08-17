import { useCallback, useEffect, useState } from "react";
import { THREEx } from "@ar-js-org/ar.js-threejs";
import type { ArToolkitSource } from "@ar-js-org/ar.js-threejs/types/ArToolkitSource";
import type { ArToolkitContext } from "@ar-js-org/ar.js-threejs/types/ArToolkitContext";
import type { ArMarkerControls } from "@ar-js-org/ar.js-threejs/types/ArMarkerControls";
import type { Camera, Scene } from "three";

export type ARToolkitInitOptions = {
	domElement: HTMLCanvasElement | undefined;
	camera: Camera;
	cameraParaDatURL: string | undefined;
	markerPatternURL: string;
	scene: Scene | undefined;
};

export const useARToolkit = ({
	domElement,
	camera,
	cameraParaDatURL,
	markerPatternURL,
	scene,
}: ARToolkitInitOptions) => {
	const [arToolkitSource, setArToolkitSource] =
		useState<ArToolkitSource | null>(null);
	const [arToolkitContext, setArToolkitContext] =
		useState<ArToolkitContext | null>(null);
	const [arMarkerControls, setArMarkerControls] =
		useState<ArMarkerControls | null>(null);

	const onResize = useCallback(() => {
		if (arToolkitSource) {
			arToolkitSource.onResizeElement();
			arToolkitSource.copyElementSizeTo(domElement);
			if (
				window.arToolkitContext &&
				window.arToolkitContext.arController !== null
			) {
				arToolkitSource.copyElementSizeTo(
					window.arToolkitContext.arController.canvas,
				);
			}
		}
	}, [arToolkitSource, domElement]);

	const getSourceOrientation = useCallback((): string => {
		const a =
			arToolkitSource &&
			arToolkitSource.domElement.videoWidth >
				arToolkitSource.domElement.videoHeight
				? "landscape"
				: "portrait";
		console.log("getSourceOrientation", a);
		return "landscape";
	}, [arToolkitSource]);

	const initARContext = useCallback(() => {
		if (arToolkitContext) {
			arToolkitContext.init(() => {
				camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

				if (arToolkitContext.arController) {
					arToolkitContext.arController.orientation = getSourceOrientation();
					arToolkitContext.arController.options.orientation =
						getSourceOrientation();
				}

				window.arToolkitContext = arToolkitContext;
			});
			if (scene) {
				scene.visible = false;
			}
			if (arMarkerControls) {
				window.arMarkerControls = arMarkerControls;
			}
		}
	}, [
		arMarkerControls,
		arToolkitContext,
		camera.projectionMatrix,
		getSourceOrientation,
		scene,
	]);

	useEffect(() => {
		const arToolkitSourceInstance = new THREEx.ArToolkitSource({
			sourceType: "webcam",
			sourceWidth: window.innerWidth > window.innerHeight ? 640 : 480,
			sourceHeight: window.innerWidth > window.innerHeight ? 480 : 640,
		});

		const arToolkitContextInstance = new THREEx.ArToolkitContext({
			cameraParametersUrl: cameraParaDatURL ?? "",
			detectionMode: "mono",
		});

		const arMarkerControlsInstance = new THREEx.ArMarkerControls(
			arToolkitContextInstance,
			camera,
			{
				type: "pattern",
				patternUrl: markerPatternURL,
				changeMatrixMode: "cameraTransformMatrix",
				// minConfidence: 0.1,
			},
		);

		setArToolkitSource(arToolkitSourceInstance);
		setArToolkitContext(arToolkitContextInstance);
		setArMarkerControls(arMarkerControlsInstance);

		arToolkitSourceInstance.init(
			() => {
				arToolkitSourceInstance.domElement.addEventListener("canplay", () => {
					initARContext();
				});
				window.arToolkitSource = arToolkitSourceInstance;
				setTimeout(() => {
					onResize();
				}, 2000);
			},
			() => {},
		);

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [camera, cameraParaDatURL, initARContext, markerPatternURL, onResize]);

	useEffect(() => {
		if (arToolkitSource) {
			initARContext();
		}
	}, [arToolkitSource, initARContext]);

	return {
		arToolkitSource,
		arToolkitContext,
		arMarkerControls,
	};
};
