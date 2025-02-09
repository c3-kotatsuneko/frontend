import * as THREE from "three";
import { useRef } from "react";

type AllObject = {
	BlockSet: THREE.Mesh[];
	// frontBlockSet: THREE.Mesh[];
	// leftBlockSet: THREE.Mesh[];
	// rightBlockSet: THREE.Mesh[];
	// backBlockSet: THREE.Mesh[];
	stage: THREE.Mesh;
};

export const ThreeInit = () => {
	const rendererRef = useRef<THREE.WebGLRenderer>();
	const sceneRef = useRef<THREE.Scene>();
	const cameraRef = useRef<THREE.PerspectiveCamera>();
	const lightRef = useRef<THREE.DirectionalLight | null>(null);
	const allBlockSet = useRef<AllObject | null>(null); //積み木のオブジェクト
	const handBlock = useRef<THREE.Mesh | null>(null); //手のオブジェクト
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
	});
	renderer.setClearColor(new THREE.Color("lightgrey"), 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	rendererRef.current = renderer;

	const scene = new THREE.Scene();
	sceneRef.current = scene;

	const camera = new THREE.PerspectiveCamera(50, 1, 100, 2000);
	camera.position.set(100, 100, 100);
	camera.lookAt(new THREE.Vector3(100, 150, 100));
	scene.add(camera);
	cameraRef.current = camera;

	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(2.4, 2, -5);
	scene.add(light);
	lightRef.current = light;

	//frontは色は赤系統の色でpositionは0 -0.8 0、scaleは0.1 0.1 0.1で初期化
	//テストで色を変えて積み木っぽい色にする
	const blockSet: THREE.Mesh[] = [];
	for (let i = 0; i < 4; i++) {
		let blockObject = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.6, 0.6),
			new THREE.MeshStandardMaterial({ color: 0x3a86ff }),
		);
		blockObject.position.set(0, -0.8, 0);
		scene.add(blockObject);
		blockSet.push(blockObject);
		blockObject = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.6, 0.6),
			new THREE.MeshStandardMaterial({ color: 0xfb5607 }),
		);
		blockObject.position.set(0, -0.8, 0);
		scene.add(blockObject);
		blockSet.push(blockObject);
		blockObject = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.6, 0.6),
			new THREE.MeshStandardMaterial({ color: 0xff006e }),
		);
		blockObject.position.set(0, -0.8, 0);
		scene.add(blockObject);
		blockSet.push(blockObject);
		blockObject = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.6, 0.6),
			new THREE.MeshStandardMaterial({ color: 0x8338ec }),
		);
		blockObject.position.set(0, -0.8, 0);
		scene.add(blockObject);
		blockSet.push(blockObject);
		blockObject = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.6, 0.6),
			new THREE.MeshStandardMaterial({ color: 0xffbe0b }),
		);
		blockObject.position.set(0, -0.8, 0);
		scene.add(blockObject);
		blockSet.push(blockObject);
	}
	//マーカーと被せるキューブ
	const markerBox = new THREE.Mesh(
		new THREE.BoxGeometry(1.4, 1.4, 1.4),
		new THREE.MeshStandardMaterial({ color: 0xdddddd }),
	);
	//ハンドトラッキングの手
	const hand = new THREE.Mesh(
		new THREE.BoxGeometry(0.3, 0.3, 0.3),
		new THREE.MeshStandardMaterial({ color: 0x444444 }),
	);
	handBlock.current = hand;
	hand.position.set(0, 0, 0);
	scene.add(hand);
	markerBox.position.set(0, -0.8, 0);
	scene.add(markerBox);
	//useRefを使ってオブジェクトを保存
	allBlockSet.current = {
		BlockSet: blockSet,
		// frontBlockSet,
		// leftBlockSet,
		// rightBlockSet,
		// backBlockSet,
		stage: markerBox,
	};

	return { rendererRef, sceneRef, cameraRef, lightRef, allBlockSet, handBlock };
};
