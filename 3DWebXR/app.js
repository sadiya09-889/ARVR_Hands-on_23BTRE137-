import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { VRButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/VRButton.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// VR Button
document.body.appendChild(VRButton.createButton(renderer));

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshStandardMaterial({ color: 0x808080 })
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x00ffcc })
);
cube.position.y = 1;
scene.add(cube);

// 🖱️ INTERACTION (click to change color)
window.addEventListener('click', () => {
    cube.material.color.set(Math.random() * 0xffffff);
});

// 🎮 Mouse movement interaction
window.addEventListener('mousemove', (event) => {
    cube.rotation.x = event.clientY * 0.01;
    cube.rotation.y = event.clientX * 0.01;
});

// Animation loop
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
});

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});