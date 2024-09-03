import { THREEx } from "@ar-js-org/ar.js-threejs";
import type { ArToolkitSource } from "@ar-js-org/ar.js-threejs/types/ArToolkitSource";
import type { ArToolkitContext } from "@ar-js-org/ar.js-threejs/types/ArToolkitContext";
import type { ArMarkerControls } from "@ar-js-org/ar.js-threejs/types/ArMarkerControls";
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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [arToolkitSource, setArToolkitSource] = useState<any>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [arToolkitContext, setArToolkitContext] = useState<any>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [arMarkerControls, setArMarkerControls] = useState<any>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const arToolkitSourceInstance = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      sourceWidth: window.innerWidth > window.innerHeight ? 640 : 480,
      sourceHeight: window.innerWidth > window.innerHeight ? 480 : 640,
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
      if (scene) {
        scene.visible = false;
      }
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
