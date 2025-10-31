<template>
  <!-- Solo el suelo base para fondo -->
  <TresMesh :position="[0, 0, -0.1]" receive-shadow>
    <TresPlaneGeometry :args="[width, height]" />
    <TresMeshPhysicalMaterial
      color="#030726"
      :roughness="0.3"
      :metalness="0.7"
    />
  </TresMesh>

  <!-- Puntos con estelas -->
  <TresGroup ref="pointsGroupRef">
    <TresGroup v-for="(point, index) in points" :key="index">
      <!-- Punto principal -->
      <TresMesh :position="point.position">
        <TresSphereGeometry :args="[0.1, 16, 16]" />
        <TresMeshStandardMaterial
          :color="point.color"
          :emissive="point.color"
          :emissiveIntensity="10"
        />
      </TresMesh>

      <!-- Estela del punto -->
      <TresLine v-if="point.trail.length > 1" :points="point.trail">
        <TresLineBasicMaterial
          :color="point.color"
          :opacity="0.6"
          transparent
        />
      </TresLine>
    </TresGroup>
  </TresGroup>
</template>

<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { Vector3 } from "three";
import { onMounted, ref } from "vue";

// Dimensiones del suelo
const height = ref(200);
const width = ref(300);

// Referencia al grupo de puntos
const pointsGroupRef = ref(null);

// Configuración de los puntos
const points = ref([
  {
    position: new Vector3(-10, 0, 1),
    velocity: new Vector3(20, 30, 0), // Velocidades aún más altas
    color: "#ff3366",
    trail: [] as Vector3[],
  },
  {
    position: new Vector3(10, -5, 1),
    velocity: new Vector3(-25, 15, 0), // Velocidades aún más altas
    color: "#33aaff",
    trail: [] as Vector3[],
  },
  {
    position: new Vector3(0, 10, 1),
    velocity: new Vector3(15, -20, 0), // Velocidades aún más altas
    color: "#66ff99",
    trail: [] as Vector3[],
  },
]);

// Límite de longitud de la estela
const MAX_TRAIL_LENGTH = 50;

// Variable para activar/desactivar la animación
const animationEnabled = ref(true);

// Función para actualizar la posición de los puntos
const updatePoints = (delta: number) => {
  if (!animationEnabled.value) return;

  // Usamos un delta time mínimo para prevenir saltos grandes
  const safeDelta = Math.min(delta, 0.1);

  points.value.forEach((point) => {
    // Guardar posición actual en la estela
    point.trail.push(point.position.clone());

    // Limitar el tamaño de la estela
    if (point.trail.length > MAX_TRAIL_LENGTH) {
      point.trail.shift();
    }

    // Actualizar posición con delta multiplicado por la velocidad
    point.position.x += point.velocity.x * safeDelta;
    point.position.y += point.velocity.y * safeDelta;

    // Rebotar en los bordes
    if (Math.abs(point.position.x) > width.value / 2) {
      point.velocity.x *= -1;
      point.position.x =
        point.position.x > 0 ? width.value / 2 : -width.value / 2;
    }
    if (Math.abs(point.position.y) > height.value / 2) {
      point.velocity.y *= -1;
      point.position.y =
        point.position.y > 0 ? height.value / 2 : -height.value / 2;
    }
  });
};

// Usando onBeforeRender de useLoop
const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  updatePoints(delta);
});

// Verificamos si la animación está funcionando después de montado el componente
onMounted(() => {
  console.log("Componente FloorWithCircuits montado");
  console.log("Punto 1 posición inicial:", points.value[0].position);

  // Comprobamos después de un segundo si la posición ha cambiado
  setTimeout(() => {
    console.log("Punto 1 posición después de 1s:", points.value[0].position);
  }, 1000);
});
</script>
