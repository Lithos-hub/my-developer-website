<template>
  <TresMesh
    ref="objectRef"
    :scale="triangleSize"
    :position="[0, 0, -1]"
    :rotation="[Math.PI / 2, Math.PI / 2, 0]"
  >
    <primitive :object="scene" />
  </TresMesh>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";

const { scene } = await useGLTF("/gltf/triangle.gltf", { draco: true });

const objectRef = shallowRef();

const triangleSize = 4;

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  objectRef.value.rotation.y += delta * 0.05;

  const time = performance.now() * 0.0005; // Tiempo en segundos
  const pulseFactor = Math.sin(time) * 0.1 + 1.5; // Oscila entre 0.8 y 1.2

  objectRef.value.scale.set(
    triangleSize * pulseFactor,
    triangleSize * pulseFactor,
    triangleSize * pulseFactor,
  );
});
</script>
