import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});
/* set renderer properties */
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );

/* create torus */
const torusGeo = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMat = new THREE.MeshBasicMaterial({color: 0x92eb49, wireframe: true, wireframeLinewidth: 1.1});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.position.x = 4; 
torus.position.z = -7;

/* create sphere */
const sphereGeo = new THREE.SphereGeometry(3, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({color: 0x92eb49, wireframe: true});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.z = 20;
sphere.position.x = -5;

/* create torus knot */
const tetraGeo = new THREE.TetrahedronGeometry(10, 0);
const tetraMat = new THREE.MeshBasicMaterial({color: 0x92eb49, wireframe: true});
const tetra = new THREE.Mesh(tetraGeo, tetraMat);
tetra.position.z = 40;
tetra.position.x = 5;

/* create cube with image */
const graceTexture = new THREE.TextureLoader().load('grace.jpg');
graceTexture.colorSpace = THREE.SRGBColorSpace;
const grace = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: graceTexture})
);
grace.position.x = 4; 
grace.position.z = -7;

/* create earth */
// const earthTexture = new THREE.TextureLoader().load('earth.jpeg');
// earthTexture.colorSpace = THREE.SRGBColorSpace;
// const earth = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshBasicMaterial({map: earthTexture})
// );
// scene.add(earth);

/* create lighting */
// const pointLight = new THREE.PointLight(0xFFFFFF);
// pointLight.position.set(0, 0, 0);
// const ambientLight = new THREE.AmbientLight(0xFFFFFF);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLight, ambientLight, lightHelper);

/* add grid helper and controls*/
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);

/* add stars at random positions */
function addStar() {
  const geometry = new THREE.OctahedronGeometry(0.25, 0);
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  star.rotation.set(x, y, z);
  scene.add(star);
}

/* add background texture */
const spaceTexture = new THREE.TextureLoader().load('night-sky.jpeg');
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;

/* set camera position and add all elements to scene */
moveCamera()
scene.add(torus);
scene.add(sphere);
scene.add(tetra);
scene.add(grace);
Array(200).fill().forEach(addStar);

/* animate on scroll */
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.025;
  sphere.rotation.z += 0.01;
  
  tetra.rotation.x += 0.01;
  tetra.rotation.y += 0.025;
  tetra.rotation.z += 0.01;

  grace.rotation.y += 0.01;
  grace.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

  if (camera.position.x < 0) {
    camera.position.x *= -1;
  }
  if (camera.position.y < 0) {
    camera.position.y *= -1;
  }
  if (camera.position.z < 0) {
    camera.position.z *= -1;
  }
}
document.body.onscroll = moveCamera;


/* animate everything */
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.0025;
  torus.rotation.z += 0.005;

  sphere.rotation.x += 0.01;

  tetra.rotation.x += 0.01;
  tetra.rotation.y += 0.01;


  controls.update();

  renderer.render(scene, camera);
}
animate();
