import { useEffect, useState } from "react";
import { THREEx } from "@ar-js-org/ar.js-threejs";
import { Camera, Scene } from "three";

export type ARToolkitInitOptions = {
  domElement: HTMLCanvasElement;
  camera: Camera;
  cameraParaDatURL: string;
  markerPatternURL: string;
  scene: Scene;
};

export const useARToolkit = ({
  domElement,
  camera,
  cameraParaDatURL,
  markerPatternURL,
  scene,
}: ARToolkitInitOptions) => {
  const [arToolkitSource, setArToolkitSource] = useState<any>(null);
  const [arToolkitContext, setArToolkitContext] = useState<any>(null);
  const [arMarkerControls, setArMarkerControls] = useState<any>(null);

  useEffect(() => {
    const arToolkitSourceInstance = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      sourceWidth: window.innerWidth > window.innerHeight ? 640 : 480,
      sourceHeight: window.innerWidth > window.innerHeight ? 480 : 640,
    });

    const arToolkitContextInstance = new THREEx.ArToolkitContext({
      cameraParametersUrl: cameraParaDatURL,
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
      }
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
      () => {}
    );

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [camera, cameraParaDatURL, domElement, markerPatternURL, scene]);

  useEffect(() => {
    if (arToolkitSource) {
      initARContext();
    }
  }, [arToolkitSource]);

  const onResize = () => {
    if (arToolkitSource) {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(domElement);
      if (
        window.arToolkitContext &&
        window.arToolkitContext.arController !== null
      ) {
        arToolkitSource.copyElementSizeTo(
          window.arToolkitContext.arController.canvas
        );
      }
    }
  };

  const initARContext = () => {
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

      scene.visible = false;

      window.arMarkerControls = arMarkerControls;
    }
  };

  const getSourceOrientation = (): string => {
    const a =
      arToolkitSource &&
      arToolkitSource.domElement.videoWidth >
        arToolkitSource.domElement.videoHeight
        ? "landscape"
        : "portrait";
    console.log("getSourceOrientation", a);
    return "landscape";
  };

  return {
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  };
};
