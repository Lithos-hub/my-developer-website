<template>
  <!-- Plane mesh as reflective floor -->
  <TresMesh cast-shadow receive-shadow :position="[0, -15, -60]">
    <TresBoxGeometry :args="[400, 0.1, 200]" />
    <TresMeshStandardMaterial
      color="black"
      :roughness="0.5"
      :metalness="0.5"
      :transmission="0.5"
      :ior="1.5"
      :clearcoat="1"
      :thickness="1"
    />
  </TresMesh>
</template>
