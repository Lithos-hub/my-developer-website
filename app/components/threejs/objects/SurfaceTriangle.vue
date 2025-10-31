<template>
  <TresMesh
    ref="objectRef"
    :scale="1.5"
    :position="[0, -30, -40]"
    :rotation="[0, Math.PI / 2, 0]"
    cast-shadow
    receive-shadow
  >
    <primitive :object="scene" />
  </TresMesh>
</template>

<script setup lang="ts">
const { scene } = await useGLTF("/gltf/triangle/surface-triangle.gltf", {
  draco: true,
});
</script>
