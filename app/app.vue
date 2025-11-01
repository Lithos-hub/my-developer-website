<template>
  <div class="App">
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

  &__radial-gradient-background {
    background: radial-gradient(
      circle,
      $gradient-primary-radial-start-color 0%,
      $gradient-radial-end-color 100%
    );
    animation: pulseGradient 8s ease-in-out infinite;
  }
}
</style>
