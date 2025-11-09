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

  <small
    class="JapaneseName"
    :class="{
      'JapaneseName--primary': color === 'primary',
      'JapaneseName--secondary': color === 'secondary',
    }"
  >
    {{ japaneseName }}
  </small>
</template>

<script setup lang="ts">
interface ComponentNameProps {
  componentName: string;
  color: "primary" | "secondary";
  japaneseName: string;
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

.JapaneseName {
  @apply absolute right-5 top-10 z-10 text-white text-[10px];

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
