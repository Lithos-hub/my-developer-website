<template>
  <TresMesh ref="objectRef" :scale="cubeSize" :position="[0, 0, 5]">
    <primitive :object="scene" />
  </TresMesh>
</template>

<script setup lang="ts">
const { scene } = await useGLTF("/gltf/cube/surrealist-cube.gltf", {
  draco: true,
});

const cubeSize = 100;

const objectRef = shallowRef();

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  objectRef.value.rotation.y += delta * 0.05;
  objectRef.value.rotation.x += delta * 0.05;
});
</script>
