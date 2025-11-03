<template>
  <div
    class="ComponentName"
    :class="{
      'ComponentName--primary': color === 'primary',
      'ComponentName--secondary': color === 'secondary',
    }"
  >
    {{ componentName }}
  </div>
</template>

<script setup lang="ts">
interface ComponentNameProps {
  componentName: string;
  color: "primary" | "secondary";
}

withDefaults(defineProps<ComponentNameProps>(), {
  color: "primary",
});
</script>

<style lang="scss" scoped>
.ComponentName {
  @apply absolute right-5 top-5 z-10 font-lucania text-[10px];

  &--primary {
    @include chromatic-aberration-primary;
    @apply text-primary;
  }

  &--secondary {
    @include chromatic-aberration-secondary;
    @apply text-secondary;
  }
}
</style>
