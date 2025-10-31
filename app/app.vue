<template>
  <div class="App">
    <WhiteNoise />
    <MobileMenu />

    <NuxtPage />
  </div>
</template>

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
