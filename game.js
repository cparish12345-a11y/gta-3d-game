// Basic Three.js 3D world - Loose Eugene, Oregon city

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor
let floorGeometry = new THREE.PlaneGeometry(200, 200);
let floorMaterial = new THREE.MeshBasicMaterial({color: 0xa0c8f0});
let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Player (cube)
let playerGeometry = new THREE.BoxGeometry(1, 2, 1);
let playerMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
let player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

// Camera
camera.position.set(0, 10, 20);
camera.lookAt(player.position);

// Movement
let keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// City blocks (loose Eugene streets layout)
function createBlock(x, z, w, d, color=0x888888) {
    let geometry = new THREE.BoxGeometry(w, 1, d);
    let material = new THREE.MeshBasicMaterial({color: color});
    let block = new THREE.Mesh(geometry, material);
    block.position.set(x, 0.5, z);
    scene.add(block);
}

// Main downtown blocks (loose layout)
createBlock(0, 0, 20, 20, 0xaaaaaa);    // central block
createBlock(-25, 0, 20, 20, 0xaaaaaa);  // west block
createBlock(25, 0, 20, 20, 0xaaaaaa);   // east block
createBlock(0, 25, 20, 20, 0xaaaaaa);   // north block
createBlock(0, -25, 20, 20, 0xaaaaaa);  // south block

// Loose landmarks (green parks)
function createPark(x, z, size) {
    let geometry = new THREE.BoxGeometry(size, 0.5, size);
    let material = new THREE.MeshBasicMaterial({color: 0x228822});
    let park = new THREE.Mesh(geometry, material);
    park.position.set(x, 0.25, z);
    scene.add(park);
}

// Example: Skinner Butte Park
createPark(15, 15, 10);

// Example: Alton Baker Park
createPark(-15, -15, 15);

function animate() {
    requestAnimationFrame(animate);

    let speed = 0.2;
    if(keys['w']) player.position.z -= speed;
    if(keys['s']) player.position.z += speed;
    if(keys['a']) player.position.x -= speed;
    if(keys['d']) player.position.x += speed;

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 20;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}
animate();
