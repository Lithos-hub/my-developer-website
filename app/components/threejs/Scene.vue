<template>
  <TresCanvas v-bind="gl" shadows alpha preset="realistic">
    <!-- Camera -->
    <TresPerspectiveCamera
      :fov="60"
      :position="[0, 0, 10]"
      :rotation="[0, 0, 0]"
    />

    <!-- Directional Light -->
    <TresDirectionalLight
      :position="[cyanLightPositionX, cyanLightPositionY, 50]"
      :intensity="1"
      color="cyan"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[redLightPositionX, redLightPositionY, 50]"
      :intensity="1"
      color="#EF4444"
      cast-shadow
    />

    <!-- Post-processing -->
    <EffectComposerPmndrs>
      <!-- Chromatic Aberration -->
      <ChromaticAberrationPmndrs
        :offset
        radial-modulation
        :modulation-offset="0.5"
      />
      <!-- Bloom -->
      <BloomPmndrs
        :radius="0.1"
        :intensity="0.5"
        :luminance-threshold="0.5"
        :luminance-smoothing="0.75"
        mipmap-blur
      />

      <!-- Vignette -->
      <VignettePmndrs
        :darkness="1"
        :offset="0.4"
        :blend-function="BlendFunction.SCREEN"
      />
      <!-- Noise -->
      <NoisePmndrs premultiply :blend-function="BlendFunction.SCREEN" />
    </EffectComposerPmndrs>

    <Suspense>
      <ThreejsObjectsFloorWithLight />
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import {
  EffectComposerPmndrs,
  NoisePmndrs,
  VignettePmndrs,
} from "@tresjs/post-processing";
import { BlendFunction } from "postprocessing";
import { NoToneMapping, Vector2 } from "three";

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
};

const offset = new Vector2(0.002, 0.002);

const { isMobile, isTablet } = useDeviceCapabilities();

const cyanLightPositionX = computed(() => {
  if (isMobile.value) return 20;
  if (isTablet.value) return 30;
  return 70; // Desktop
});

const cyanLightPositionY = computed(() => {
  if (isMobile.value) return 33;
  if (isTablet.value) return -50;
  return 50; // Desktop
});

const redLightPositionX = computed(() => {
  if (isMobile.value) return -23;
  if (isTablet.value) return -30;
  return -70; // Desktop
});

const redLightPositionY = computed(() => {
  if (isMobile.value) return -30;
  if (isTablet.value) return 50;
  return -50; // Desktop
});
</script>
