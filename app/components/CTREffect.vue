<template>
  <div class="CTR" aria-hidden="true"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.CTR {
  @apply fixed inset-0 z-[9999] h-screen w-screen;
  pointer-events: none;

  background-color: $primary;
  opacity: 0.15;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    0deg,
    red,
    magenta 2px,
    cyan 3px,
    cyan 4px
  );

  animation: crt-scan-shift 20s linear infinite;

  &::after {
    @apply fixed inset-0 h-screen w-screen z-[9999] pointer-events-none;

    content: "";
    background: rgba(0, 255, 255, 0.247);
    opacity: 0;
    animation: crt-flicker 0.15s infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .CTR {
    animation: none;
    opacity: 0.4;
  }
}

@keyframes crt-scan-shift {
  0% {
    background-position: 0 0, 50% 50%;
  }
  100% {
    background-position: 0 -10px, 50% 50%;
  }
}

@keyframes crt-flicker {
  0%,
  100% {
    opacity: 0.8;
  }
  5% {
    opacity: 0.57;
  }
  10% {
    opacity: 0.5;
  }
  15% {
    opacity: 0.6;
  }
  20% {
    opacity: 0.74;
  }
  30% {
    opacity: 0.58;
  }
  40% {
    opacity: 0.53;
  }
  50% {
    opacity: 0.99;
  }
  60% {
    opacity: 0.71;
  }
  70% {
    opacity: 0.56;
  }
  80% {
    opacity: 0.54;
  }
  90% {
    opacity: 0.57;
  }
}
</style>
