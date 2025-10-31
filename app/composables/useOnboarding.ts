import * as CYBERINFO from "@/consts/cyberinfo";
import { ONBOARDING_CONSTANTS } from "@/consts/onboarding";
import type { OnboardingState } from "@/types/onboarding";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTypeWriter } from "./useTypeWriter";

export const useOnboarding = () => {
  const router = useRouter();

  // State
  const state = ref<OnboardingState>({
    phaseOne: {
      isCompleted: false,
      isTyping: false,
      text: "",
    },
    phaseTwo: {
      isCompleted: false,
      isTyping: false,
      text: "",
    },
    phaseThree: {
      isCompleted: false,
      isTyping: false,
      text: "",
    },
    auxiliarTextsCompleted: [],
  });

  // TypeWriter configuration constants
  const TYPEWRITER_CONFIG = {
    MEMORY_TEXT: { delay: 5, speed: 30 },
    DATA_STREAM: { delay: 15, speed: 10 },
    PHASE_ONE: { delay: 300, speed: 50 },
    PHASE_TWO: { delay: 50, speed: 0 },
    PHASE_THREE_FOUR: { delay: 10, speed: 0 },
  };

  // TypeWriter hooks
  const { text: memoryTextTop, startTyping: startMemoryTypingTop } =
    useTypeWriter({
      texts: CYBERINFO.MEMORY_GRID_TOP.map((text) => `${text}\n`),
      delay: TYPEWRITER_CONFIG.MEMORY_TEXT.delay,
      speed: TYPEWRITER_CONFIG.MEMORY_TEXT.speed,
    });

  const { text: dataStreamTextTop, startTyping: startDataStreamTextTop } =
    useTypeWriter({
      texts: CYBERINFO.DATA_STREAM_TOP.map((text) => `${text}\n`),
      delay: TYPEWRITER_CONFIG.DATA_STREAM.delay,
      speed: TYPEWRITER_CONFIG.DATA_STREAM.speed,
      persistLines: CYBERINFO.DATA_STREAM_TOP.map(Boolean),
    });

  const { text: memoryTextBottom, startTyping: startMemoryTypingBottom } =
    useTypeWriter({
      texts: CYBERINFO.MEMORY_GRID_BOTTOM.map((text) => `${text}\n`),
      delay: TYPEWRITER_CONFIG.MEMORY_TEXT.delay,
      speed: TYPEWRITER_CONFIG.MEMORY_TEXT.speed,
    });

  const { text: dataStreamTextBottom, startTyping: startDataStreamTextBottom } =
    useTypeWriter({
      texts: CYBERINFO.DATA_STREAM_BOTTOM.map((text) => `${text}\n`),
      delay: TYPEWRITER_CONFIG.DATA_STREAM.delay,
      speed: TYPEWRITER_CONFIG.DATA_STREAM.speed,
      persistLines: CYBERINFO.DATA_STREAM_BOTTOM.map(Boolean),
    });

  const {
    text: phaseOneText,
    startTyping: startPhaseOne,
    isCompleted: isPhaseOneCompleted,
  } = useTypeWriter({
    texts: ONBOARDING_CONSTANTS.PHASE_ONE.TEXTS,
    delay: TYPEWRITER_CONFIG.PHASE_ONE.delay,
    speed: TYPEWRITER_CONFIG.PHASE_ONE.speed,
  });

  const {
    text: phaseTwoText,
    startTyping: startPhaseTwo,
    isCompleted: isPhaseTwoCompleted,
    isTyping: isPhaseTwoTyping,
  } = useTypeWriter({
    texts: CYBERINFO.LOADING_SYSTEM_TEXT.map((text) => `\n${text}`),
    delay: TYPEWRITER_CONFIG.PHASE_TWO.delay,
    speed: TYPEWRITER_CONFIG.PHASE_TWO.speed,
    persistLines: CYBERINFO.LOADING_SYSTEM_TEXT.map(Boolean),
  });

  const {
    text: phaseThreeText,
    startTyping: startPhaseThree,
    isCompleted: isPhaseThreeCompleted,
  } = useTypeWriter({
    texts: CYBERINFO.FILES_LIST.map((text) => `${text}\n`),
    delay: TYPEWRITER_CONFIG.PHASE_THREE_FOUR.delay,
    speed: TYPEWRITER_CONFIG.PHASE_THREE_FOUR.speed,
    persistLines: CYBERINFO.FILES_LIST.map(Boolean),
  });

  const {
    text: phaseFourText,
    startTyping: startPhaseFour,
    isCompleted: isPhaseFourCompleted,
  } = useTypeWriter({
    texts: CYBERINFO.BOOT_SEQUENCE_LIST.map((text) => `${text}\n`),
    delay: TYPEWRITER_CONFIG.PHASE_THREE_FOUR.delay,
    speed: TYPEWRITER_CONFIG.PHASE_THREE_FOUR.speed,
    persistLines: CYBERINFO.BOOT_SEQUENCE_LIST.map(Boolean),
  });

  // Computed
  const isAllAuxiliarTextsCompleted = computed(() => {
    return (
      state.value.auxiliarTextsCompleted.length ===
      systemAuxiliarTextInitial.length
    );
  });

  // Methods
  const onSystemAuxiliarCompleted = (index: number) => {
    state.value.auxiliarTextsCompleted.push(index);
  };

  const systemAuxiliarTextInitial = [
    ...CYBERINFO.EXTERNAL_SIGNAL,
    ...CYBERINFO.ENCRYPTION_CHECK,
    ...CYBERINFO.BIOFEED_INTERFACE,
    ...CYBERINFO.MALWARE_SCAN,
    ...CYBERINFO.SECURITY_PROTOCOL,
  ];

  // Watchers
  watch(isPhaseOneCompleted, (isCompleted) => {
    if (isCompleted) {
      setTimeout(() => {
        startPhaseTwo();
      }, ONBOARDING_CONSTANTS.PHASE_TWO.ANIMATION_DELAY);
    }
  });

  watch([isPhaseTwoCompleted, isAllAuxiliarTextsCompleted], (hasCompleted) => {
    if (hasCompleted.every((isCompleted) => isCompleted)) {
      setTimeout(() => {
        startPhaseThree();
        startPhaseFour();
      }, ONBOARDING_CONSTANTS.PHASE_THREE.ANIMATION_DELAY);
    }
  });

  watch([isPhaseThreeCompleted, isPhaseFourCompleted], (hasCompleted) => {
    if (hasCompleted.every((isCompleted) => isCompleted)) {
      router.push("/");
    }
  });

  // Lifecycle hooks
  const onMounted = () => {
    setTimeout(() => {
      startMemoryTypingTop();
      startDataStreamTextTop();
      startMemoryTypingBottom();
      startDataStreamTextBottom();
    }, ONBOARDING_CONSTANTS.PHASE_ONE.ANIMATION_DELAYS.MEMORY_TYPING);

    setTimeout(() => {
      startPhaseOne();
    }, ONBOARDING_CONSTANTS.PHASE_ONE.ANIMATION_DELAYS.PHASE_START);
  };

  return {
    state,
    memoryTextTop,
    dataStreamTextTop,
    memoryTextBottom,
    dataStreamTextBottom,
    phaseOneText,
    phaseTwoText,
    phaseThreeText,
    phaseFourText,
    isPhaseOneCompleted,
    isPhaseTwoCompleted,
    isPhaseThreeCompleted,
    isPhaseTwoTyping,
    systemAuxiliarTextInitial,
    onSystemAuxiliarCompleted,
    onMounted,
  };
};
