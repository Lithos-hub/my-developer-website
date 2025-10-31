<template>
  <button
    class="Button"
    :class="[`Button--${props.variant}`, `Button--${props.size}`]"
    v-bind="$attrs"
  >
    <div class="Button__pseudo-border" />
    <div class="Button__content">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
});
</script>

<style lang="scss" scoped>
.Button {
  @apply relative z-0 overflow-hidden border brightness-200 transition-all;
  clip-path: $clip-button;

  $self: &;

  &::after {
    content: "";
    @apply absolute inset-0 -z-0 h-full w-full bg-black/90;
    clip-path: $clip-button;
    background-size: 3px 3px;
    background-image: repeating-linear-gradient(
      0deg,
      $gradient-primary,
      $gradient-primary 1px,
      $gradient-black 1px,
      $gradient-black
    );
  }

  &__pseudo-border {
    @apply absolute inset-0 -left-1 h-[calc(100%+10px)] w-[calc(100%+10px)];
    clip-path: $clip-button;
  }

  &__content {
    @apply absolute inset-0 z-10 flex items-center justify-center pb-1;
  }

  &--primary {
    @apply border-primary;

    #{$self}__content {
      @apply text-primary;
    }

    &::after {
      @apply bg-black/90;
      background-image: repeating-linear-gradient(
        0deg,
        $gradient-primary,
        $gradient-primary 1px,
        $gradient-black 1px,
        $gradient-black
      );
    }

    #{$self}__pseudo-border {
      @apply bg-primary;
    }

    &:hover {
      @apply scale-105 border-white;

      #{$self}__content {
        @apply text-white;
      }

      // Cambiar color de iconos a blanco en hover
      #{$self}__content * {
        @apply text-white !important;
      }

      #{$self}__pseudo-border {
        @apply bg-white;
      }

      &::after {
        @apply transition-all duration-300 ease-in-out;
        background-size: 5px 5px;
        background-image: repeating-linear-gradient(
          45deg,
          $gradient-primary,
          $gradient-primary 1px,
          rgba(255, 255, 255, 0.1) 1px,
          $gradient-black 50%
        );
      }
    }
  }

  &--secondary {
    @apply border-secondary;

    #{$self}__content {
      @apply text-secondary;
    }

    &::after {
      @apply bg-black/90;
      background-image: repeating-linear-gradient(
        0deg,
        $gradient-primary,
        $gradient-primary 1px,
        $gradient-black 1px,
        $gradient-black
      );
    }

    #{$self}__pseudo-border {
      @apply bg-secondary;
    }

    &:hover {
      @apply scale-105 border-white;

      #{$self}__content {
        @apply text-white;
      }

      // Cambiar color de iconos a blanco en hover
      #{$self}__content * {
        @apply text-white !important;
      }

      #{$self}__pseudo-border {
        @apply bg-white;
      }

      &::after {
        @apply transition-all duration-300 ease-in-out;
        background-size: 5px 5px;
        background-image: repeating-linear-gradient(
          45deg,
          $gradient-secondary,
          $gradient-secondary 1px,
          rgba(255, 255, 255, 0.1) 1px,
          $gradient-black 50%
        );
      }
    }
  }

  // Sizes
  &--sm {
    @apply h-10 w-24;

    #{$self}__content {
      @apply text-[10px];
    }
  }

  &--md {
    @apply h-16 w-[180px];

    #{$self}__content {
      @apply text-[15px];
    }
  }

  &--lg {
    @apply h-20 w-[220px];

    #{$self}__content {
      @apply text-[18px];
    }
  }
}
</style>
