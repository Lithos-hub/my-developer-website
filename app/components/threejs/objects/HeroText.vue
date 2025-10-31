<template>
  <Text3D
    ref="heroText1Ref"
    text="Carlos Segura García"
    font="/threejs-fonts/Rajdhani_Light.json"
    :position="[0, 1, 2]"
    :bevel-thickness="0.0001"
    :bevel-size="0.00001"
    :bevel-offset="0.00001"
    :size="text1Size"
    center
    need-updates
  >
    <TresMeshPhysicalMaterial
      color="#EF4444"
      :roughness="0.4"
      :metalness="0.1"
      :transmission="0.9"
    />
  </Text3D>
  <Text3D
    ref="heroText2Ref"
    text="Front-end Developer"
    font="/threejs-fonts/Rajdhani_Light.json"
    :position="[0, -1, 2]"
    :bevel-thickness="0.0001"
    :bevel-size="0.00001"
    :size="text2Size"
    center
    need-updates
  >
    <TresMeshPhysicalMaterial
      color="#EF4444"
      :roughness="0.4"
      :metalness="0.1"
      :transmission="0.9"
    />
  </Text3D>
</template>

<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { Text3D } from "@tresjs/cientos";

const heroText1Ref = useTemplateRef("heroText1Ref");
const heroText2Ref = useTemplateRef("heroText2Ref");

const text1Size = shallowRef(1);
const text2Size = shallowRef(0.5);

const updateScale = () => {
  // Obtener el ancho de la ventana
  const width = window.innerWidth;

  // Definir escalas base
  let scale1 = 1;
  let scale2 = 1;

  // Ajustar escala según el ancho de la pantalla
  if (width < 640) {
    // móvil
    scale1 = 0.5;
    scale2 = 0.3;
  } else if (width < 1024) {
    // tablet
    scale1 = 0.7;
    scale2 = 0.4;
  } else {
    // desktop
    scale1 = 1;
    scale2 = 0.5;
  }

  // Aplicar escalas
  if (heroText1Ref.value) {
    text1Size.value = scale1;
  }
  if (heroText2Ref.value) {
    text2Size.value = scale2;
  }
};

const { onBeforeRender, render } = useLoop();

onBeforeRender(() => {
  // Actualizar escala inicial
  updateScale();
});

onMounted(() => {
  // Agregar listener para el resize
  window.addEventListener("resize", updateScale);
});

// Limpiar el evento cuando el componente se desmonte
onUnmounted(() => {
  window.removeEventListener("resize", updateScale);
});
</script>
