import { THREEx } from "@ar-js-org/ar.js-threejs";
import type { Camera, Scene } from "three";

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
  const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
    sourceWidth: 640,
    sourceHeight: 480,
  });

  const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: cameraParaDatURL,
    detectionMode: "mono",
  });

  const arMarkerControls = new THREEx.ArMarkerControls(
    arToolkitContext,
    camera,
    {
      type: "pattern",
      patternUrl: markerPatternURL,
      changeMatrixMode: "cameraTransformMatrix",
    }
  );

  arToolkitSource.init(
    () => {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(domElement);
      //bodyの背景を透明にする
      document.body.style.background = "transparent";

      const rootElement = document.getElementById("root");
      if (rootElement) {
        rootElement.appendChild(arToolkitSource.domElement);
      }
      const wrapper = document.getElementById("wrapper");
      if (wrapper) {
        wrapper.appendChild(domElement);
      }
      arToolkitSource.copyElementSizeTo(domElement);
      //   console.error(arToolkitSource.domElementHeight(), window.innerHeight);
      //   console.error(arToolkitSource.domElementWidth(), window.innerWidth);
      arToolkitSource.domElement.addEventListener("canplay", () => {
        initARContext();
      });
      window.arToolkitSource = arToolkitSource;
      setTimeout(() => {
        onResize();
      }, 2000);
    },
    () => {}
  );

  window.addEventListener("resize", () => {
    onResize();
  });

  function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(domElement);
    if (window.arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(
        window.arToolkitContext.arController.canvas
      );
    }
  }

  function initARContext() {
    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

      arToolkitContext.arController.orientation = getSourceOrientation();
      arToolkitContext.arController.options.orientation =
        getSourceOrientation();

      window.arToolkitContext = arToolkitContext;
    });

    scene.visible = false;

    window.arMarkerControls = arMarkerControls;
  }

  function getSourceOrientation(): string {
    console.error("hoge", arToolkitSource.domElement.videoWidth);
    console.error("hoge", arToolkitSource.domElement.videoHeight);
    // return arToolkitSource.domElement.videoWidth >
    //   arToolkitSource.domElement.videoHeight
    //   ? "landscape"
    //   : "portrait";
    return "landscape";
  }

  return {
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  };
};
