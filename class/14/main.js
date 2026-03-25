import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// CANVAS
const canvas = document.querySelector("canvas#three-ex");

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(1, 1, 4);
scene.add(camera);

// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// GROUND PLANE
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: "#006aff" })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;
scene.add(plane);

// LOAD MODEL
const gltfLoader = new GLTFLoader();

let foxModel = null;

try {
    const gltf = await gltfLoader.loadAsync("model/Fox/glTF/Fox.gltf");
    console.log(gltf);

    foxModel = gltf.scene;
    foxModel.scale.set(0.02, 0.02, 0.02);
    foxModel.position.y = -0.65;

    scene.add(foxModel);
} catch (error) {
    console.error("Failed to load model:", error);
}

// RESIZE
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ANIMATION LOOP
function animate() {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();