import * as THREE from 'three';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let particles: THREE.Points;
let lines: THREE.LineSegments;
let animationId: number;
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 120;
const MOUSE_INFLUENCE = 200;

interface ParticleData {
  velocity: THREE.Vector3;
  originalPos: THREE.Vector3;
}

const particleData: ParticleData[] = [];

export function initThreeScene(): void {
  const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  // Scene setup
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create particles
  createParticles();
  
  // Create grid floor
  createGrid();

  // Event listeners
  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove);

  // Start animation
  animate();
}

function createParticles(): void {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  const color1 = new THREE.Color(0x10b981); // emerald
  const color2 = new THREE.Color(0x00d4ff); // cyan
  const color3 = new THREE.Color(0x00ff41); // terminal green

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    
    // Spread particles across viewport
    positions[i3] = (Math.random() - 0.5) * 800;
    positions[i3 + 1] = (Math.random() - 0.5) * 600;
    positions[i3 + 2] = (Math.random() - 0.5) * 200;

    // Store original position for return behavior
    particleData.push({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.1
      ),
      originalPos: new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2])
    });

    // Gradient colors
    const mixRatio = Math.random();
    let mixedColor: THREE.Color;
    if (mixRatio < 0.33) {
      mixedColor = color1.clone().lerp(color2, Math.random());
    } else if (mixRatio < 0.66) {
      mixedColor = color2.clone().lerp(color3, Math.random());
    } else {
      mixedColor = color3.clone().lerp(color1, Math.random());
    }
    
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Create connection lines
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.15
  });

  lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);
}

function createGrid(): void {
  const gridHelper = new THREE.GridHelper(2000, 50, 0x10b981, 0x1e293b);
  gridHelper.position.y = -300;
  gridHelper.rotation.x = 0.1;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.2;
  scene.add(gridHelper);
}

function updateParticles(): void {
  const positions = particles.geometry.attributes.position.array as Float32Array;
  const linePositions = lines.geometry.attributes.position.array as Float32Array;
  let lineIndex = 0;

  // Convert mouse to world coordinates
  const mouseWorldX = (mouse.x / window.innerWidth) * 800 - 400;
  const mouseWorldY = -(mouse.y / window.innerHeight) * 600 + 300;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const data = particleData[i];

    // Apply velocity
    positions[i3] += data.velocity.x;
    positions[i3 + 1] += data.velocity.y;
    positions[i3 + 2] += data.velocity.z;

    // Mouse attraction
    const dx = mouseWorldX - positions[i3];
    const dy = mouseWorldY - positions[i3 + 1];
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MOUSE_INFLUENCE) {
      const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE * 0.02;
      positions[i3] += dx * force;
      positions[i3 + 1] += dy * force;
    }

    // Gentle return to original position
    const returnForce = 0.002;
    positions[i3] += (data.originalPos.x - positions[i3]) * returnForce;
    positions[i3 + 1] += (data.originalPos.y - positions[i3 + 1]) * returnForce;
    positions[i3 + 2] += (data.originalPos.z - positions[i3 + 2]) * returnForce;

    // Boundary wrapping
    if (positions[i3] > 400) positions[i3] = -400;
    if (positions[i3] < -400) positions[i3] = 400;
    if (positions[i3 + 1] > 300) positions[i3 + 1] = -300;
    if (positions[i3 + 1] < -300) positions[i3 + 1] = 300;

    // Connect nearby particles
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const j3 = j * 3;
      const dx2 = positions[i3] - positions[j3];
      const dy2 = positions[i3 + 1] - positions[j3 + 1];
      const dz2 = positions[i3 + 2] - positions[j3 + 2];
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);

      if (dist2 < CONNECTION_DISTANCE && lineIndex < linePositions.length - 6) {
        linePositions[lineIndex++] = positions[i3];
        linePositions[lineIndex++] = positions[i3 + 1];
        linePositions[lineIndex++] = positions[i3 + 2];
        linePositions[lineIndex++] = positions[j3];
        linePositions[lineIndex++] = positions[j3 + 1];
        linePositions[lineIndex++] = positions[j3 + 2];
      }
    }
  }

  // Clear remaining line positions
  for (let i = lineIndex; i < linePositions.length; i++) {
    linePositions[i] = 0;
  }

  particles.geometry.attributes.position.needsUpdate = true;
  lines.geometry.attributes.position.needsUpdate = true;
}

function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event: MouseEvent): void {
  targetMouse.x = event.clientX;
  targetMouse.y = event.clientY;
}

function animate(): void {
  animationId = requestAnimationFrame(animate);

  // Smooth mouse follow
  mouse.x += (targetMouse.x - mouse.x) * 0.1;
  mouse.y += (targetMouse.y - mouse.y) * 0.1;

  updateParticles();
  
  // Rotate scene slowly
  scene.rotation.y += 0.0002;
  
  renderer.render(scene, camera);
}

export function destroyThreeScene(): void {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('mousemove', onMouseMove);
  
  if (renderer) {
    renderer.dispose();
  }
}
