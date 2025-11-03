<template>
  <div class="CTR" aria-hidden="true">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
$crt-red: rgba(255, 165, 105, 0.473);
$crt-green: rgb(49, 143, 115);
$crt-blue: rgb(40, 206, 206);

.CTR {
  @apply fixed inset-0 h-screen w-screen z-[9999] pointer-events-none;

  &::before,
  &::after {
    content: "";
    transform: translateZ(0);
    pointer-events: none;
    mix-blend-mode: overlay;
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.2;
  }

  &::before {
    background: repeating-linear-gradient(
      $crt-red 1px,
      $crt-green 3px,
      $crt-blue 5px
    );
  }
}
</style>
