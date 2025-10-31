<template>
  <transition name="fade-3d">
    <TresCanvas
      v-show="isReady"
      v-bind="gl"
      :shadows="recommendedConfig.shadows"
      alpha
      preset="realistic"
      class="w-full h-full block"
    >
      <!-- Camera -->
      <TresPerspectiveCamera
        :fov="80"
        :position="[0, 0, 10]"
        :rotation="[0, 0, 0]"
      />

      <!-- Directional Light -->
      <TresDirectionalLight
        :position="[70, 50, 50]"
        :intensity="1"
        color="cyan"
        :cast-shadow="recommendedConfig.shadows"
      />
      <TresDirectionalLight
        :position="[-70, -50, 50]"
        :intensity="1"
        color="#EF4444"
        :cast-shadow="recommendedConfig.shadows"
      />

      <!-- Post-processing -->
      <EffectComposerPmndrs v-if="recommendedConfig.useAdvancedPostProcessing">
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

      <!-- Post-processing for mobile -->
      <EffectComposerPmndrs v-else>
        <!-- Vignette (lighter) -->
        <VignettePmndrs
          :darkness="0.8"
          :offset="0.4"
          :blend-function="BlendFunction.SCREEN"
        />
        <!-- Noise (lighter) -->
        <NoisePmndrs premultiply :blend-function="BlendFunction.SCREEN" />
      </EffectComposerPmndrs>

      <Suspense>
        <ThreejsObjectsFloorWithLight />
      </Suspense>
    </TresCanvas>
  </transition>
</template>

<script setup lang="ts">
import {
  EffectComposerPmndrs,
  NoisePmndrs,
  VignettePmndrs,
} from "@tresjs/post-processing";
import { BlendFunction } from "postprocessing";
import { NoToneMapping, Vector2 } from "three";

const { recommendedConfig } = useDeviceCapabilities();

const gl = computed(() => ({
  toneMapping: NoToneMapping,
  multisampling: recommendedConfig.value.multisampling,
  pixelRatio: recommendedConfig.value.pixelRatio,
}));

const offset = new Vector2(0.002, 0.002);
const isReady = ref(false);
onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true;
  });
});
</script>

<style scoped>
.fade-3d-enter-active,
.fade-3d-leave-active {
  transition: opacity 4s ease;
}
.fade-3d-enter-from,
.fade-3d-leave-to {
  opacity: 0;
}
</style>
