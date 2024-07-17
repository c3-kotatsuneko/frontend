import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import cameraPara from "../assets/camera_para.dat?url";
import markerURL from "../assets/marker.patt?url";
import { useARToolkit } from "../hooks/useARTools";
import "./index.css";

const useInitializeThreeJS = () => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const boxRef = useRef<THREE.Mesh | null>(null);

  if (
    !rendererRef.current ||
    !sceneRef.current ||
    !cameraRef.current ||
    !lightRef.current ||
    !boxRef.current
  ) {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    const reactRoot = document.body.firstChild;
    document.body.insertBefore(renderer.domElement, reactRoot);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, 640 / 480, 0.01, 20);
    camera.position.set(1, 1.5, 1.5);
    camera.lookAt(new THREE.Vector3(0, 0.5, 0));
    scene.add(camera);
    cameraRef.current = camera;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2.4, 2, 5);
    scene.add(light);
    lightRef.current = light;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xe5e5e5 })
    );
    box.position.set(0, 0, 0);
    scene.add(box);
    boxRef.current = box;
  }
  console.log(rendererRef, sceneRef, cameraRef, lightRef, boxRef);
  return { rendererRef, sceneRef, cameraRef, lightRef, boxRef };
};

const ARApp = () => {
  const { rendererRef, sceneRef, cameraRef } = useInitializeThreeJS();
  const { arToolkitContext, arToolkitSource } = useARToolkit({
    camera: cameraRef.current!,
    cameraParaDatURL: cameraPara,
    domElement: rendererRef.current!.domElement,
    markerPatternURL: markerURL,
    scene: sceneRef.current!,
  });

  useEffect(() => {
    const debugLog = (e: Event) => {
      console.log("marker found!", e);
    };
    window.addEventListener("markerFound", debugLog);
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        if (arToolkitSource && arToolkitSource.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
          sceneRef.current.visible = cameraRef.current.visible;
        }
      }
    };
    animate();

    return () => {
      window.removeEventListener("markerFound", debugLog);
    };
  }, [arToolkitContext, arToolkitSource, rendererRef, sceneRef, cameraRef]);

  return null;
};

export default ARApp;
