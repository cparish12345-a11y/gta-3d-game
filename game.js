// Basic Three.js 3D world with player movement

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor
let floorGeometry = new THREE.PlaneGeometry(100, 100);
let floorMaterial = new THREE.MeshBasicMaterial({color: 0x228822});
let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Player (cube)
let playerGeometry = new THREE.BoxGeometry(1, 2, 1);
let playerMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
let player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// Basic movement
let keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function animate() {
    requestAnimationFrame(animate);

    let speed = 0.2;
    if(keys['w']) player.position.z -= speed;
    if(keys['s']) player.position.z += speed;
    if(keys['a']) player.position.x -= speed;
    if(keys['d']) player.position.x += speed;

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}
animate();
