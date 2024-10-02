console.log('THREE');

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF3333 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 10);
pointLight.intensity = 100;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    torus.rotation.x += t * 0.0001;
    torus.rotation.y += t * 0.0001;

    camera.position.z = 30;

    console.log('move',t);
}

document.body.onscroll = moveCamera;