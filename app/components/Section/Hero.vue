<template>
  <div class="Hero__container">
    <div class="Hero__content">
      <ComponentName componentName="Hero.vue" color="primary" />
      <Suspense>
        <div class="Hero__scene" v-if="!isMobile && !isTablet">
          <ThreejsScene />
        </div>
      </Suspense>

      <h1 class="Hero__title">{{ $t("hero.name") }}</h1>
      <h2 class="Hero__subtitle">{{ $t("hero.title") }}</h2>

      <BaseButton class="Hero__button-container" @click="scrollToPortfolio">
        {{ $t("hero.button") }}</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { isMobile, isTablet } = useDeviceCapabilities();

const scrollToPortfolio = () => {
  const portfolioSection = document.getElementById("portfolio");
  if (portfolioSection) {
    portfolioSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style lang="scss" scoped>
@reference "tailwindcss";
@reference "~/assets/css/main.css";

.Hero {
  &__container {
    @apply relative border-b border-white;
  }

  &__content {
    @apply relative h-[calc(100vh-60px)] bg-black w-full p-5 lg:mx-auto lg:max-w-[80vw] border-x border-white;
  }

  &__scene {
    @apply absolute inset-0 z-0;
  }

  &__title {
    @include neon-text-primary;
    @apply absolute left-5 top-5 text-center font-rajdhaniLight text-3xl leading-tight text-primary lg:text-[45px];
  }

  &__subtitle {
    @include neon-text-secondary;
    @apply absolute bottom-5 right-5 text-center font-rajdhaniLight text-lg font-bold leading-tight text-secondary lg:text-[25px];
  }

  &__button-container {
    @apply bg-red-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
  }
}
</style>
