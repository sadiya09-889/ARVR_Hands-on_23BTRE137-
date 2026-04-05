import * as THREE from 'three';

// Scene, Camera, Renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Convert degrees → radians
const degToRad = (deg) => deg * (Math.PI / 180);

// Translation
document.getElementById('transX').addEventListener('input', e => cube.position.x = parseFloat(e.target.value));
document.getElementById('transY').addEventListener('input', e => cube.position.y = parseFloat(e.target.value));
document.getElementById('transZ').addEventListener('input', e => cube.position.z = parseFloat(e.target.value));

// Rotation
document.getElementById('rotX').addEventListener('input', e => cube.rotation.x = degToRad(e.target.value));
document.getElementById('rotY').addEventListener('input', e => cube.rotation.y = degToRad(e.target.value));
document.getElementById('rotZ').addEventListener('input', e => cube.rotation.z = degToRad(e.target.value));

// Scaling
document.getElementById('scaleAll').addEventListener('input', e => {
    const s = parseFloat(e.target.value);
    cube.scale.set(s, s, s);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});