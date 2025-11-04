<template>
  <div class="App">
    <TVTurnOnEffect ref="tvTurnOnEffectRef" />

    <CRTEffect />
    <WhiteNoise />
    <MobileMenu />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
// Dynamic language attribute for html element
useHead({
  htmlAttrs: {
    lang: locale,
  },
});
</script>

<style lang="scss" scoped>
.App {
  @apply bg-cyan-950/20;

  &::after {
    content: "";
    @apply fixed inset-0 z-[9999] h-screen w-full bg-transparent opacity-20;

    pointer-events: none;
    background: radial-gradient(circle, transparent 80%, #00000050 100%);
    animation: pulseGradient 9s ease-in-out infinite;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
