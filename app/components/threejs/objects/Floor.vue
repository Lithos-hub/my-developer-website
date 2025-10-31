<template>
  <Levioso>
    <TresMesh ref="planeRef" :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[250, 200]" />
      <TresMeshPhysicalMaterial color="black" />
    </TresMesh>

    <TresInstancedMesh
      ref="instancesRef"
      cast-shadow
      receive-shadow
      :args="[null!, null!, 1000]"
    >
      <TresBoxGeometry :args="[10, 20, 10]" />
      <TresMeshStandardMaterial color="black" />
    </TresInstancedMesh>
  </Levioso>
</template>

<script lang="ts" setup>
import { Levioso, useSurfaceSampler } from "@tresjs/cientos";
import type { InstancedMesh } from "three";

const instancesRef = shallowRef<InstancedMesh>();
const planeRef = shallowRef();

// Apply random sizes to TresPlaneGeometry
watch(planeRef, (value) => {
  useSurfaceSampler(value, 150, instancesRef.value, "color");
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  if (instancesRef.value) {
    instancesRef.value.rotation.z += delta * 0.005;
  }
});
</script>
