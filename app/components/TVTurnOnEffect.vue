<template>
  <Transition name="tv-turn-on">
    <div v-if="isVisible" class="tv-turn-on-effect" aria-hidden="true">
      <CRTEffect />
      <!-- Loading text & shape -->
      <div class="loader-wrapper">
        <div class="tv-loading-text">
          <h1>Loading...</h1>
        </div>
        <div class="loader" />
        <p class="tv-loading-text">少々お待ちください...</p>
      </div>
      <div class="tv-scan-lines">
        <div
          v-for="i in 500"
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
  const offset = index - window.innerHeight * 0.25;
  const delay = Math.abs(offset) * 0.015;
  const duration = 2 + (Math.abs(offset) / 100) * 0.4;

  return {
    top: `calc(50% + ${offset}vh)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, 1200);
});
</script>

<style lang="scss" scoped>
.loader-wrapper {
  @apply z-[10001] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center;
}
.tv-loading-text {
  @apply text-primary text-center flex flex-col gap-5 text-xs tracking-widest font-rajdhaniLight;
}

$bgOptions: no-repeat linear-gradient($primary 0 0);

.loader {
  width: 40px;
  height: 40px;
  position: relative;
  background:
    $bgOptions center/100% 10px,
    $bgOptions center/10px 100%;
}
.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    $bgOptions 0 0,
    $bgOptions 100% 0,
    $bgOptions 0 100%,
    $bgOptions 100% 100%;
  background-size: 15.5px 15.5px;
  animation: l16 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}
@keyframes l16 {
  33% {
    inset: -10px;
    transform: rotate(0deg);
  }
  66% {
    inset: -10px;
    transform: rotate(90deg);
  }
  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}

.tv-turn-on-effect {
  @apply fixed top-0 left-0 z-[10000] h-screen w-screen pointer-events-none;
  overflow: hidden;
}

.tv-scan-lines {
  @apply fixed inset-0 top-0 left-0 h-screen w-screen bg-black;
}

.tv-scan-line {
  @apply fixed left-0 w-full;
  height: 1px;
  background: linear-gradient(
    90deg,
    $primary 0%,
    rgba(54, 203, 248, 0.89) 15%,
    rgba(255, 255, 255, 0.603) 30%,
    rgba(58, 226, 170, 0.795) 50%,
    rgba(255, 255, 255, 0.466) 70%,
    rgba(44, 238, 238, 0.5) 85%,
    $primary 100%
  );
  animation: scanLineExpand ease-out forwards;
  opacity: 0;
  transform-origin: center;
}

.tv-fade-overlay {
  @apply absolute inset-0 bg-black;
  animation: fadeToTransparent 2s ease-out forwards;
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
    transform: scaleY(2);
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
  transition: all 0.2s ease-in;
}

.tv-turn-on-leave-active {
  transition: all 0.4s ease-out;
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
