<template>
  <div class="OnboardingPhaseThree flex w-full justify-center gap-5">
    <div class="hidden flex-1 flex-col gap-5 lg:flex">
      <div class="p-5 font-rajdhaniMedium text-lg text-primary">
        L O A D I N G // F I L E S
      </div>
      <pre class="h-auto overflow-hidden p-5 text-[10px] text-primary">{{
        phaseThreeText
      }}</pre>
    </div>
    <div class="flex flex-1 flex-col gap-5">
      <div class="p-5 font-rajdhaniMedium text-lg text-primary">
        B O O T I N G // S Y S T E M
      </div>
      <pre class="h-auto overflow-hidden p-5 text-[10px] text-primary">{{
        phaseFourText
      }}</pre>
    </div>
    <div
      class="hidden h-full flex-col items-end justify-between gap-5 p-5 lg:flex"
    >
      <img
        src="/svg/decoration/onboarding/onboarding-phase-four-2.svg"
        :alt="$t('onboarding.floatingAlt')"
        class="h-[300px] w-auto"
      />
      <img
        src="/svg/decoration/onboarding/onboarding-phase-four-1.svg"
        :alt="$t('onboarding.floatingAlt')"
        class="h-[300px] w-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  phaseThreeText: string;
  phaseFourText: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.OnboardingPhaseThree {
  @apply relative flex h-[90vh] w-[90vw] overflow-hidden border border-transparent;

  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    0deg,
    $primary20,
    $primary20 1px,
    $primary10 1px,
    $primary10
  );

  animation: fade-block-to-third-phase 2s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation-fill-mode: forwards;

  &:hover {
    animation: glitch-effect 0.3s ease-in-out;
  }
}
</style>
