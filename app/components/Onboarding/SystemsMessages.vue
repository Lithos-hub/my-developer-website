<template>
  <div class="flex min-h-[30px] items-center gap-1">
    <div
      class="square"
      :class="{
        'bg-green-500': systemAuxiliarText.length === props.texts[0].length,
        'bg-secondarySoft': systemAuxiliarText.length !== props.texts[0].length,
      }"
    />
    <small
      class="text-[8px] transition-all duration-300 lg:text-[10px]"
      :class="{
        'text-green-500': systemAuxiliarText.length === props.texts[0].length,
        'text-secondarySoft':
          systemAuxiliarText.length !== props.texts[0].length,
      }"
      >{{ systemAuxiliarText }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { useTypeWriter } from "@/composables/useTypeWriter";

interface SystemsMessagesProps {
  texts: string[];
}

const props = defineProps<SystemsMessagesProps>();
const emit = defineEmits(["completed"]);

const {
  text: systemAuxiliarText,
  startTyping: startSystemAuxiliarTyping,
  isCompleted: isSystemAuxiliarCompleted,
} = useTypeWriter({
  texts: props.texts,
  delay: 50,
  speed: Math.random() * 50,
  persistLines: [true],
});

watch(isSystemAuxiliarCompleted, (hasCompleted) => {
  if (hasCompleted) {
    emit("completed");
  }
});

onMounted(() => {
  startSystemAuxiliarTyping();
});
</script>
