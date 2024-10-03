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

const loader = new GLTFLoader();
loader.load('./static/models/suzane.glb', function(gltf) {
    loadedModel = gltf.scene;

    console.log(loadedModel);
    
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


function moveCamera() {
    const scrollY = window.scrollY;
    const deltaScroll = scrollY - initialScrollY;
    
    if (loadedModel) {
        loadedModel.rotation.x = deltaScroll * 0.01;
        // loadedModel.rotation.y = deltaScroll * 0.01;
    }
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();