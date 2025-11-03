<template>
  <Transition name="tv-turn-on">
    <div v-if="isVisible" class="tv-turn-on-effect" aria-hidden="true">
      <div class="tv-center-point"></div>
      <div class="tv-scan-lines">
        <div
          v-for="i in 60"
          :key="i"
          class="tv-scan-line"
          :style="getScanLineStyle(i)"
        ></div>
      </div>
      <div class="tv-fade-overlay"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(true);

const getScanLineStyle = (index: number) => {
  const offset = (index - 30.5) * 1.8;
  const delay = Math.abs(offset) * 0.015;
  const duration = 0.8 + (Math.abs(offset) / 100) * 0.4;

  return {
    top: `calc(50% + ${offset}vh)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, 1800);
});
</script>

<style lang="scss" scoped>
.tv-turn-on-effect {
  @apply fixed inset-0 z-[10000] h-screen w-screen pointer-events-none;
  background: #000;
  overflow: hidden;
}

.tv-center-point {
  @apply fixed top-1/2 left-1/2;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 15px #fff, 0 0 30px rgba(255, 255, 255, 0.8),
    0 0 50px rgba(255, 255, 255, 0.4);
  animation: centerPointExpand 0.6s ease-out forwards;
  z-index: 10;
}

.tv-scan-lines {
  @apply fixed inset-0;
}

.tv-scan-line {
  @apply absolute left-0 w-full;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 15%,
    rgba(0, 255, 242, 0.5) 30%,
    rgba(45, 175, 207, 0.7) 50%,
    rgba(219, 0, 84, 0.5) 70%,
    rgba(47, 185, 178, 0.2) 85%,
    transparent 100%
  );
  animation: scanLineExpand ease-out forwards;
  opacity: 0;
  transform-origin: center;
}

.tv-fade-overlay {
  @apply absolute inset-0;
  background: #000;
  animation: fadeToTransparent 1.8s ease-out forwards;
  z-index: 5;
}

@keyframes centerPointExpand {
  0% {
    width: 6px;
    height: 6px;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  20% {
    width: 15px;
    height: 15px;
    opacity: 1;
  }
  40% {
    width: 30px;
    height: 30px;
    opacity: 0.8;
  }
  100% {
    width: 60px;
    height: 60px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

@keyframes scanLineExpand {
  0% {
    opacity: 0;
    transform: scaleY(0);
    filter: blur(0px);
  }
  15% {
    opacity: 0.9;
    filter: blur(0.5px);
  }
  30% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
    filter: blur(1px);
  }
  100% {
    opacity: 0;
    transform: scaleY(1);
    filter: blur(2px);
  }
}

@keyframes fadeToTransparent {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}

// Transición de salida
.tv-turn-on-enter-active {
  transition: opacity 0.2s ease-in;
}

.tv-turn-on-leave-active {
  transition: opacity 0.4s ease-out;
}

.tv-turn-on-enter-from,
.tv-turn-on-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .tv-turn-on-effect {
    display: none;
  }
}
</style>
