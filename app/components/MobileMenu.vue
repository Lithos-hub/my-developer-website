<template>
  <Transition name="from-top-to-bottom">
    <div v-if="isMobileMenuVisible" class="MobileMenu">
      <div class="MobileMenu__overlay" />
      <div class="MobileMenu__container">
        <button
          class="MobileMenu__close-button"
          @click="closeMobileMenu"
          aria-label="Close mobile menu"
          type="button"
        >
          <Icon name="i-mdi-close" size="30" class="MobileMenu__close-icon" />
        </button>
        <div class="MobileMenu__links">
          <NuxtLink
            v-for="link in sections"
            :key="link.path"
            :to="link.path"
            class="MobileMenu__link neon-text-blue neon-text-blue-glow"
            :class="{
              'MobileMenu__link--active': visibleSection
                .toLowerCase()
                .includes(link.id.toLowerCase()),
            }"
            @click="closeMobileMenu"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { sections } from "@/consts/sections";
const { isMobileMenuVisible, visibleSection } = storeToRefs(useUiStore());
const { closeMobileMenu } = useUiStore();

// Close menu on Escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isMobileMenuVisible.value) {
      closeMobileMenu();
    }
  };
  window.addEventListener("keydown", handleEscape);
  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style lang="scss" scoped>
.MobileMenu {
  @apply fixed inset-0 z-50 flex h-screen;

  &__overlay {
    @apply fixed inset-0 z-40 h-screen w-full opacity-90 backdrop-blur;

    &:before {
      content: "";
      @apply fixed inset-0 z-40 h-screen w-full bg-gradient-to-br from-secondarySoft/50 via-black/50 to-black/50 transition-all;
      background-color: $dark;
      background-size: 20px 20px;
      background-image: radial-gradient(#ef444450 1px, rgba(0, 0, 0, 0.5) 1px);
    }
  }

  &__container {
    @apply absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-gradient-to-br from-secondarySoft/50 via-black/50 to-black/50;
  }

  &__close-button {
    @apply absolute right-4 top-4;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      @apply outline-2 outline-secondary outline-offset-2 rounded;
    }
  }

  &__close-icon {
    @apply text-2xl font-bold text-primary transition-all duration-300;
    &:hover {
      @apply scale-125 text-secondary;
    }
  }

  &__links {
    @apply flex flex-col items-center gap-10;
  }

  &__link {
    @include corner-effect-primary;
    @apply relative w-[250px] py-2 text-center font-jetbrainsMono text-[12px] backdrop-blur-lg;

    &--active {
      @include corner-effect-secondary;
      @apply bg-black text-secondary transition-all duration-300;
      background-size: 100% 100%;
      text-shadow: 0 0 0px;
    }
  }
}

.from-top-to-bottom-enter-active,
.from-top-to-bottom-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.from-top-to-bottom-enter-from,
.from-top-to-bottom-leave-to {
  transform: translateY(-100%);
}
</style>
