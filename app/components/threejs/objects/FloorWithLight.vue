<template>
  <!-- Light emissive plane -->
  <TresMesh ref="lightEmissivePlaneRef" :position="[0, 0, -50]">
    <TresPlaneGeometry :args="[width, height]" />
    <TresMeshPhysicalMaterial
      color="white"
      emissive="white"
      :emissive-intensity="1"
    />
  </TresMesh>

  <!-- Instances of cubes -->
  <Suspense>
    <TresInstancedMesh
      ref="instancesRef"
      cast-shadow
      receive-shadow
      :args="[null!, null!, numberOfCubes]"
    >
      <TresBoxGeometry :args="[cubeSize, cubeSize, cubeSize]" />
      <TresMeshPhysicalMaterial
        :roughness="0.4"
        :metalness="1"
        :transmission="0.5"
        :thickness="1"
        :ior="1.5"
        :clearcoat="1.0"
        color="black"
      />
    </TresInstancedMesh>
  </Suspense>
</template>

<script lang="ts" setup>
import { useLoop } from "@tresjs/core";
import {
  BufferGeometry,
  Euler,
  type InstancedMesh,
  Material,
  Matrix4,
  Mesh,
  Quaternion,
  Vector3,
} from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMounted, reactive, ref, shallowRef, watch } from "vue";

// Plane state
const height = ref(200);
const width = ref(300);

// References
const instancesRef = shallowRef<InstancedMesh>();
const planeRef = shallowRef();

// GLTF model state
const modelLoaded = ref(false);
const gltfGeometry = shallowRef<BufferGeometry | null>(null);
const gltfMaterial = shallowRef<Material | null>(null);
const gltfLoader = new GLTFLoader();

// Set up mouse move event listener and load GLTF
onMounted(async () => {
  // Load the GLTF model
  try {
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      gltfLoader.load(
        "/gltf/textured-cube/textured-cube.gltf",
        resolve,
        undefined,
        reject
      );
    });

    // Search for the first available mesh
    let mesh: Mesh | null = null;
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh && !mesh) {
        mesh = object;
      }
    });

    if (mesh) {
      // Save references to the geometry and material
      gltfGeometry.value = (mesh as Mesh).geometry;
      gltfMaterial.value = (mesh as Mesh).material as Material;
      modelLoaded.value = true;

      // Distribute cubes once the model is loaded
      // We need to give time for the DOM to update
      setTimeout(() => {
        if (instancesRef.value) {
          distributeInstancesUniformly();
        }
      }, 100);
    } else {
      console.error("No Mesh found in the GLTF model");
    }
  } catch (error) {
    console.error("Error loading the GLTF model:", error);
  }
});

// Configuration for cube distribution
const cubeSize = 1; // Cube size
const cubeSpacing = 1.005; // Cube spacing
const numberOfCubes = 1000; // Total number of cubes

// Z movement configuration
const cubeZConfig = ref(
  Array(numberOfCubes)
    .fill(null)
    .map(() => {
      // Random rotation values in increments of 90 degrees (PI/2)
      const rotationX =
        Math.floor(Math.random() * 5) *
        (Math.PI / 2) *
        (Math.random() > 0.5 ? 1 : -1);
      const rotationY =
        Math.floor(Math.random() * 5) *
        (Math.PI / 2) *
        (Math.random() > 0.5 ? 1 : -1);
      const rotationZ =
        Math.floor(Math.random() * 5) *
        (Math.PI / 2) *
        (Math.random() > 0.5 ? 1 : -1);

      return {
        maxHeight: 0.5 + Math.random() * 0.501,
        speed: 0.1 + Math.random() * 0.5,
        currentOffset: 0,
        phase: Math.random() * Math.PI * 2,
        rotation: { x: rotationX, y: rotationY, z: rotationZ },
      };
    })
);

// Grid state
const gridSize = reactive({
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
});

// Function to distribute cubes uniformly
const distributeInstancesUniformly = () => {
  if (!instancesRef.value) return;

  const mesh = instancesRef.value;
  const matrix = new Matrix4();

  const actualGridSizeX = Math.ceil(
    Math.sqrt(numberOfCubes * (width.value / height.value))
  );
  const actualGridSizeY = Math.ceil(numberOfCubes / actualGridSizeX);

  // Save grid information for movement
  gridSize.x = actualGridSizeX;
  gridSize.y = actualGridSizeY;

  const totalWidthSpace = actualGridSizeX * cubeSpacing;
  const totalHeightSpace = actualGridSizeY * cubeSpacing;

  const startX = -totalWidthSpace / 2;
  const startY = -totalHeightSpace / 2;

  // Save initial positions
  gridSize.startX = startX;
  gridSize.startY = startY;

  let index = 0;

  for (let y = 0; y < actualGridSizeY; y++) {
    for (let x = 0; x < actualGridSizeX; x++) {
      if (index >= numberOfCubes) break;

      const xPos = startX + x * cubeSpacing;
      const yPos = startY + y * cubeSpacing;

      // Initialize Z configuration if necessary
      if (!cubeZConfig.value[index]) {
        const rotationX =
          Math.floor(Math.random() * 5) *
          (Math.PI / 2) *
          (Math.random() > 0.5 ? 1 : -1);
        const rotationY =
          Math.floor(Math.random() * 5) *
          (Math.PI / 2) *
          (Math.random() > 0.5 ? 1 : -1);
        const rotationZ =
          Math.floor(Math.random() * 5) *
          (Math.PI / 2) *
          (Math.random() > 0.5 ? 1 : -1);

        cubeZConfig.value[index] = {
          maxHeight: 0.5 + Math.random() * 1,
          speed: 0.01 + Math.random() * 0.5,
          currentOffset: 0,
          phase: Math.random() * Math.PI * 2,
          rotation: { x: rotationX, y: rotationY, z: rotationZ },
        };
      }

      const config = cubeZConfig.value[index];

      const quaternion = new Quaternion().setFromEuler(
        new Euler(
          config?.rotation.x,
          config?.rotation.y,
          config?.rotation.z,
          "XYZ"
        )
      );
      matrix.compose(
        new Vector3(xPos, yPos, config?.currentOffset),
        quaternion,
        new Vector3(cubeSize, cubeSize, cubeSize)
      );

      mesh.setMatrixAt(index, matrix);
      index++;
    }
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
};

// Observe when the plane size changes to redistribute the cubes
watch([width, height], () => {
  distributeInstancesUniformly();
});

// Initialize the cubes when the component is ready
watch(instancesRef, (value) => {
  if (value) {
    distributeInstancesUniformly();
  }
});

const { onBeforeRender } = useLoop();

onBeforeRender(() => {
  if (planeRef.value) {
    const newHeight = window.innerHeight / 150;
    const newWidth = window.innerWidth / 150;

    if (newHeight !== height.value || newWidth !== width.value) {
      height.value = newHeight;
      width.value = newWidth;
    }
  }

  // Update Z positions of the cubes
  if (instancesRef.value) {
    const mesh = instancesRef.value;
    const matrix = new Matrix4();
    let needsUpdate = false;

    // Current time for wave animation
    const time = Date.now() * 0.001;

    // Wave propagation speed
    const waveSpeed = 0.01;

    // Wave frequency
    const waveFrequency = 1;

    // For each cube, calculate its new Z position
    for (let i = 0; i < numberOfCubes; i++) {
      // Get the current matrix
      mesh.getMatrixAt(i, matrix);

      // Extract the current position
      const position = new Vector3();
      position.setFromMatrixPosition(matrix);

      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(
        position.x * position.x + position.y * position.y
      );

      // Wave effect from center outward
      // The phase depends on the distance from the center
      const wavePhase = distanceFromCenter * waveFrequency - time * waveSpeed;

      // Calculate new Z position using outward wave movement
      const config = cubeZConfig.value[i];
      if (!config) continue;

      config.currentOffset =
        config.maxHeight * Math.sin(wavePhase + config?.phase);

      // Calculate scale factor based on distance from center (smoother)
      const maxDistance = Math.max(width.value, height.value) / 4;
      const scaleZ = cubeSize + distanceFromCenter / maxDistance;

      const quaternion = new Quaternion().setFromEuler(
        new Euler(
          config.rotation.x,
          config.rotation.y,
          config.rotation.z,
          "XYZ"
        )
      );
      matrix.compose(
        new Vector3(position.x, position.y, config?.currentOffset),
        quaternion,
        new Vector3(cubeSize, cubeSize, cubeSize * scaleZ)
      );

      // Update the instance matrix
      mesh.setMatrixAt(i, matrix);
      needsUpdate = true;
    }

    if (needsUpdate) {
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
});
</script>
