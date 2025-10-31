<template>
  <div class="OnboardingPhaseTwo">
    <div v-if="isTyping" class="OnboardingPhaseTwo__system-text">
      <div class="flex gap-10">
        <div class="hidden lg:block">
          <pre class="text-secondary">
  _______  _____  _______  ______  __________________  _______
 / ___/\ \/ / _ \/ __/ _ \/ __/\ \/ / __/_  __/ __/  |/  / __/
/ /__   \  / _  / _// , _/\ \   \  /\ \  / / / _// /|_/ /\ \  
\___/   /_/____/___/_/|_/___/   /_/___/ /_/ /___/_/  /_/___/
                
          All rights reserved | CyberSystems {{ new Date().getFullYear() }}
              </pre
          >

          <pre class="h-[60vh] max-h-[60vh] overflow-hidden text-[10px]">{{
            phaseTwoText
          }}</pre>
        </div>
        <div class="flex w-full flex-col gap-5 p-5">
          <p class="OnboardingPhaseTwo__systems-messages-initial-text">
            {{ CYBERINFO.LEFT_SIDE_TEXT }}
          </p>
          <small class="text-xs text-primary">
            {{ $t("onboarding.tasksCompleted")
            }}{{ auxiliarTextsCompleted.length }}
          </small>
          <div class="grid grid-cols-4 pt-5 lg:grid-cols-3">
            <div
              v-for="(line, index) in systemAuxiliarTextInitial"
              :key="index"
            >
              <OnboardingSystemsMessages
                :texts="[line]"
                @completed="onSystemAuxiliarCompleted(index)"
              />
            </div>
          </div>
          <div class="absolute bottom-5 right-5">
            <img
              src="/svg/decoration/onboarding/onboarding-3.svg"
              :alt="$t('onboarding.floatingAlt')"
              class="w-[200px] lg:w-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as CYBERINFO from "@/consts/cyberinfo";

interface Props {
  isTyping: boolean;
  phaseTwoText: string;
  systemAuxiliarTextInitial: string[];
  auxiliarTextsCompleted: number[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "system-auxiliar-completed", index: number): void;
}>();

const onSystemAuxiliarCompleted = (index: number) => {
  emit("system-auxiliar-completed", index);
};
</script>

<style lang="scss" scoped>
.OnboardingPhaseTwo {
  @apply relative flex h-[200px] w-[90vw] max-w-[90vw] items-center justify-center overflow-hidden border border-transparent p-2 lg:h-[500px] lg:w-[1000px] lg:w-[50vw] lg:p-10;

  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    0deg,
    $secondary20,
    $secondary20 1px,
    $secondary10 1px,
    $secondary10
  );

  animation: expand-block-to-second-phase 2s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation-fill-mode: forwards;

  &__system-text {
    @apply h-[80vh] max-h-[80vh] w-full overflow-hidden text-secondary;
    animation: fade-in-phase-two 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  &__systems-messages-initial-text {
    @apply font-lucania text-[8px] text-secondary;
  }
}
</style>
