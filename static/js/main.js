import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Blender model
let loadedModel = null;
let targetRotationX = 0;  // Target rotation for easing
// let targetRotationY = 0; // You can enable this for Y-axis rotation as well

const loader = new GLTFLoader();
loader.load('./static/models/suzane.glb', function(gltf) {
    loadedModel = gltf.scene;

    scene.add(loadedModel);
    loadedModel.scale.set(10, 10, 10);
    loadedModel.position.set(0, 0, 0);
});

// Lights
const rightPointLight = new THREE.PointLight(0xffffff);
rightPointLight.position.set(10, 0, 10);
rightPointLight.intensity = 100;

const leftPointLight = new THREE.PointLight(0xff3333);
leftPointLight.position.set(-10, 0, 10);
leftPointLight.intensity = 3000;

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(rightPointLight, leftPointLight, ambientLight);

// Grid and light helper
const lightHelper = new THREE.PointLightHelper(rightPointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Initial scroll position
let initialScrollY = window.scrollY;

// Easing factor (0.1 for slow, 1 for immediate)
const easingFactor = 0.1;

function moveCamera() {
    const scrollY = window.scrollY;
    const deltaScroll = scrollY - initialScrollY;
    
    if (loadedModel) {
        // Set the target rotation based on scroll position
        targetRotationX = deltaScroll * 0.007;
        // targetRotationY = deltaScroll * 0.01; // Optional for Y-axis rotation
    }
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);

    if (loadedModel) {
        // Smoothly interpolate the rotation with easing
        loadedModel.rotation.x = THREE.MathUtils.lerp(loadedModel.rotation.x, targetRotationX, easingFactor);
        // loadedModel.rotation.y = THREE.MathUtils.lerp(loadedModel.rotation.y, targetRotationY, easingFactor); // Optional for Y-axis rotation
    }

    renderer.render(scene, camera);
}

animate();