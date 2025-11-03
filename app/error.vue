<template>
  <div class="Error404">
    <CTREffect />
    <div class="Error404__container">
      <div class="Error404__content">
        <ComponentName componentName="[...all].vue" color="secondary" />

        <div class="Error404__main-content">
          <h1 class="Error404__title">
            <span
              class="Error404__title-number glitch glitch--number"
              data-text="404"
              >404</span
            >
            <span
              class="Error404__title-text glitch glitch--text"
              data-text="PAGE_NOT_FOUND"
              >PAGE_NOT_FOUND</span
            >
          </h1>

          <p class="Error404__description">
            <span
              data-text="La página a la que intentas acceder no existe en nuestros sistemas."
              >The page you are trying to access does not exist in our
              systems.</span
            >
          </p>

          <div class="Error404__actions">
            <BaseButton
              variant="primary"
              size="md"
              class="Error404__button"
              @click="goBack"
            >
              Go back
            </BaseButton>
          </div>

          <span
            class="Error404__connection-error"
            data-text="Connection error detected."
            >Connection error detected.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

// SEO metadata
useHead(() => ({
  status: props.error?.statusCode,
  title: "Page not found",
  meta: [
    {
      name: "description",
      content:
        "The page you are trying to access does not exist in our systems.",
    },
  ],
}));

const goBack = () => {
  navigateTo("/");
};
</script>

<style lang="scss" scoped>
.Error404 {
  @apply h-screen w-screen bg-black;

  &__container {
    @apply relative h-full w-full bg-black/50;
  }

  &__content {
    @apply relative flex h-full min-h-[calc(100vh-60px)] flex-col items-center justify-center p-8;
  }

  &__main-content {
    @apply text-center;
  }

  &__title {
    @apply mb-6 font-rajdhaniLight;

    &-number {
      @apply block text-5xl font-bold text-primary lg:text-[250px];
      text-shadow: 0 0 30px rgba(85, 234, 212, 0.5);
    }

    &-text {
      @apply block font-rajdhaniMedium text-xl text-secondary lg:text-4xl;
      letter-spacing: 0.5em;
      margin-left: -5rem;
    }
  }

  &__description {
    @apply mb-8 w-full font-rajdhaniRegular text-lg leading-relaxed text-white/80 lg:text-xl;

    &-accent {
      @apply font-bold text-secondary;
    }
  }

  &__actions {
    @apply flex flex-col gap-4 sm:flex-row sm:justify-center;
  }

  &__button {
    @apply mx-auto;
  }

  &__connection-error {
    @apply absolute bottom-0 left-0 p-2 font-rajdhaniRegular text-base text-secondarySoft;
  }
}

.glitch {
  position: relative;
  display: inline-block;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
    opacity: 0.8;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 $secondary;
    animation: glitch-animation-1 2s linear infinite reverse;
    z-index: -1;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 $primary;
    animation: glitch-animation-2 2s linear infinite reverse;
    z-index: -2;
  }

  animation: glitch-flicker 3s ease-in-out infinite;

  &--number {
    animation: glitch-flicker 2s ease-in-out infinite,
      glitch-shake 1s ease-in-out infinite;

    &::before {
      animation-duration: 1.5s;
      animation-delay: 0.2s;
    }

    &::after {
      animation-duration: 1.8s;
      animation-delay: 0.1s;
    }
  }

  &--text {
    animation: glitch-flicker 2.5s ease-in-out infinite,
      glitch-shake 3.5s ease-in-out infinite;

    &::before {
      animation-duration: 2.2s;
      animation-delay: 0.5s;
    }

    &::after {
      animation-duration: 1.9s;
      animation-delay: 0.3s;
    }
  }

  &--description {
    animation: glitch-flicker 4s ease-in-out infinite,
      glitch-shake 5s ease-in-out infinite;

    &::before {
      animation-name: glitch-animation-small-1;
      animation-duration: 3s;
      animation-delay: 1s;
    }

    &::after {
      animation-name: glitch-animation-small-2;
      animation-duration: 2.5s;
      animation-delay: 0.8s;
    }
  }

  &--accent {
    animation: glitch-flicker 1.5s ease-in-out infinite,
      glitch-shake 2.5s ease-in-out infinite;

    &::before {
      animation-name: glitch-animation-small-1;
      animation-duration: 1.2s;
      animation-delay: 0.1s;
    }

    &::after {
      animation-name: glitch-animation-small-2;
      animation-duration: 1.4s;
      animation-delay: 0.05s;
    }
  }
}

@keyframes glitch-animation-1 {
  0% {
    clip: rect(0px, 9999px, 300px, 0);
  }
  5% {
    clip: rect(50px, 9999px, 250px, 0);
  }
  10% {
    clip: rect(100px, 9999px, 200px, 0);
  }
  15% {
    clip: rect(150px, 9999px, 300px, 0);
  }
  20% {
    clip: rect(200px, 9999px, 250px, 0);
  }
  25% {
    clip: rect(0px, 9999px, 150px, 0);
  }
  30% {
    clip: rect(80px, 9999px, 280px, 0);
  }
  35% {
    clip: rect(120px, 9999px, 220px, 0);
  }
  40% {
    clip: rect(40px, 9999px, 300px, 0);
  }
  45% {
    clip: rect(180px, 9999px, 260px, 0);
  }
  50% {
    clip: rect(60px, 9999px, 240px, 0);
  }
  55% {
    clip: rect(140px, 9999px, 300px, 0);
  }
  60% {
    clip: rect(20px, 9999px, 200px, 0);
  }
  65% {
    clip: rect(160px, 9999px, 280px, 0);
  }
  70% {
    clip: rect(90px, 9999px, 250px, 0);
  }
  75% {
    clip: rect(30px, 9999px, 300px, 0);
  }
  80% {
    clip: rect(110px, 9999px, 230px, 0);
  }
  85% {
    clip: rect(70px, 9999px, 290px, 0);
  }
  90% {
    clip: rect(190px, 9999px, 270px, 0);
  }
  95% {
    clip: rect(10px, 9999px, 300px, 0);
  }
  100% {
    clip: rect(130px, 9999px, 300px, 0);
  }
}

@keyframes glitch-animation-2 {
  0% {
    clip: rect(0px, 9999px, 300px, 0);
  }
  5% {
    clip: rect(70px, 9999px, 280px, 0);
  }
  10% {
    clip: rect(140px, 9999px, 220px, 0);
  }
  15% {
    clip: rect(30px, 9999px, 300px, 0);
  }
  20% {
    clip: rect(100px, 9999px, 260px, 0);
  }
  25% {
    clip: rect(170px, 9999px, 240px, 0);
  }
  30% {
    clip: rect(50px, 9999px, 300px, 0);
  }
  35% {
    clip: rect(120px, 9999px, 280px, 0);
  }
  40% {
    clip: rect(200px, 9999px, 300px, 0);
  }
  45% {
    clip: rect(80px, 9999px, 250px, 0);
  }
  50% {
    clip: rect(150px, 9999px, 300px, 0);
  }
  55% {
    clip: rect(40px, 9999px, 270px, 0);
  }
  60% {
    clip: rect(110px, 9999px, 290px, 0);
  }
  65% {
    clip: rect(180px, 9999px, 300px, 0);
  }
  70% {
    clip: rect(60px, 9999px, 300px, 0);
  }
  75% {
    clip: rect(130px, 9999px, 300px, 0);
  }
  80% {
    clip: rect(20px, 9999px, 300px, 0);
  }
  85% {
    clip: rect(90px, 9999px, 300px, 0);
  }
  90% {
    clip: rect(160px, 9999px, 300px, 0);
  }
  95% {
    clip: rect(10px, 9999px, 300px, 0);
  }
  100% {
    clip: rect(140px, 9999px, 300px, 0);
  }
}

@keyframes glitch-flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  25%,
  75% {
    opacity: 0.9;
  }
}

@keyframes glitch-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-2px);
  }
  20% {
    transform: translateX(2px);
  }
  30% {
    transform: translateX(-1px);
  }
  40% {
    transform: translateX(1px);
  }
  50% {
    transform: translateX(0);
  }
  60% {
    transform: translateX(-1.5px);
  }
  70% {
    transform: translateX(1.5px);
  }
  80% {
    transform: translateX(-0.5px);
  }
  90% {
    transform: translateX(0.5px);
  }
}

@keyframes glitch-animation-small-1 {
  0% {
    clip: rect(0px, 9999px, 50px, 0);
  }
  5% {
    clip: rect(10px, 9999px, 40px, 0);
  }
  10% {
    clip: rect(20px, 9999px, 30px, 0);
  }
  15% {
    clip: rect(5px, 9999px, 45px, 0);
  }
  20% {
    clip: rect(15px, 9999px, 35px, 0);
  }
  25% {
    clip: rect(0px, 9999px, 25px, 0);
  }
  30% {
    clip: rect(12px, 9999px, 42px, 0);
  }
  35% {
    clip: rect(8px, 9999px, 38px, 0);
  }
  40% {
    clip: rect(18px, 9999px, 48px, 0);
  }
  45% {
    clip: rect(3px, 9999px, 33px, 0);
  }
  50% {
    clip: rect(22px, 9999px, 50px, 0);
  }
  55% {
    clip: rect(7px, 9999px, 37px, 0);
  }
  60% {
    clip: rect(17px, 9999px, 47px, 0);
  }
  65% {
    clip: rect(2px, 9999px, 32px, 0);
  }
  70% {
    clip: rect(13px, 9999px, 43px, 0);
  }
  75% {
    clip: rect(6px, 9999px, 36px, 0);
  }
  80% {
    clip: rect(19px, 9999px, 49px, 0);
  }
  85% {
    clip: rect(4px, 9999px, 34px, 0);
  }
  90% {
    clip: rect(14px, 9999px, 44px, 0);
  }
  95% {
    clip: rect(9px, 9999px, 39px, 0);
  }
  100% {
    clip: rect(1px, 9999px, 31px, 0);
  }
}

@keyframes glitch-animation-small-2 {
  0% {
    clip: rect(0px, 9999px, 50px, 0);
  }
  5% {
    clip: rect(15px, 9999px, 35px, 0);
  }
  10% {
    clip: rect(25px, 9999px, 45px, 0);
  }
  15% {
    clip: rect(5px, 9999px, 25px, 0);
  }
  20% {
    clip: rect(20px, 9999px, 40px, 0);
  }
  25% {
    clip: rect(10px, 9999px, 30px, 0);
  }
  30% {
    clip: rect(30px, 9999px, 50px, 0);
  }
  35% {
    clip: rect(0px, 9999px, 20px, 0);
  }
  40% {
    clip: rect(18px, 9999px, 38px, 0);
  }
  45% {
    clip: rect(8px, 9999px, 28px, 0);
  }
  50% {
    clip: rect(22px, 9999px, 42px, 0);
  }
  55% {
    clip: rect(12px, 9999px, 32px, 0);
  }
  60% {
    clip: rect(2px, 9999px, 22px, 0);
  }
  65% {
    clip: rect(28px, 9999px, 48px, 0);
  }
  70% {
    clip: rect(6px, 9999px, 26px, 0);
  }
  75% {
    clip: rect(16px, 9999px, 36px, 0);
  }
  80% {
    clip: rect(26px, 9999px, 46px, 0);
  }
  85% {
    clip: rect(4px, 9999px, 24px, 0);
  }
  90% {
    clip: rect(14px, 9999px, 34px, 0);
  }
  95% {
    clip: rect(24px, 9999px, 44px, 0);
  }
  100% {
    clip: rect(1px, 9999px, 21px, 0);
  }
}

@media (max-width: 768px) {
  .Error404 {
    &__terminal {
      @apply text-xs;
    }

    &__title {
      &-number {
        @apply text-6xl;
      }

      &-text {
        @apply text-lg;
      }
    }

    &__description {
      @apply text-base;
    }
  }
}
</style>
