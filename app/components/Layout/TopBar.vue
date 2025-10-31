<template>
  <header class="TopBar">
    <div class="TopBar__left">
      <div class="TopBar__info-row">
        <div class="triangle-shape-top-left TopBar__triangle" />
        <span class="info-text">{{ visualDataBySection?.componentName }} </span>
      </div>
      <div class="TopBar__info-row">
        <div class="triangle-shape-top-left TopBar__triangle" />
        <span class="info-text"
          >{{ $t("topBar.zone") }} {{ visualDataBySection?.code }}
        </span>
      </div>
    </div>
    <nav class="TopBar__center">
      <ul class="TopBar__links">
        <li
          v-for="link in sections"
          :key="link.title"
          class="TopBar__link"
          :class="{
            'TopBar__link--active': visibleSection
              .toLowerCase()
              .includes(link.id.toLowerCase()),
          }"
          @click="scrollToSection(link.path)"
        >
          {{ link.title }}
        </li>
      </ul>
      <div class="TopBar__mobile-menu-button">
        <button @click="toggleMobileMenu">
          <Icon name="i-mdi-menu" size="30" class="TopBar__menu-icon" />
        </button>
      </div>
    </nav>
    <div class="TopBar__right">
      <button @click="toggleLanguageMenu">
        <Icon name="i-mdi-translate" size="20" class="TopBar__translate-icon" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { sections } from "@/consts/sections";
const { visualDataBySection, visibleSection } = storeToRefs(useUiStore());
const { toggleLanguageMenu, toggleMobileMenu } = useUiStore();

const TOPBAR_HEIGHT = 60;

const scrollToSection = (section: string) => {
  const element = document.querySelector(section);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - TOPBAR_HEIGHT;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style lang="scss" scoped>
.TopBar {
  @apply sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-b border-secondary;

  @media mobile {
    padding: $mobile-margin;
  }

  @media desktop {
    padding: $desktop-margin;
  }

  &__left {
    @apply flex h-full w-[50vw] flex-col items-center justify-between bg-black p-2 font-lucania lg:w-[10vw];
  }

  &__info-row {
    @apply flex w-full items-center justify-between;
  }

  &__triangle {
    @apply bg-primary;
  }

  &__center {
    @apply mx-auto flex h-full w-full max-w-[80vw] items-center justify-center border-x border-secondary backdrop-blur-lg;
  }

  &__mobile-menu-button {
    @apply block lg:hidden;
  }

  &__menu-icon {
    @apply text-secondarySoft;
  }

  &__links {
    @apply z-50 hidden gap-5 lg:flex;

    &-overlay {
      @apply fixed inset-0 z-40 hidden h-screen w-full bg-black/50 lg:block;
    }

    &-container {
      @apply absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-evenly gap-5 bg-gradient-to-br from-secondarySoft/50 via-black/50 to-black/50;
    }
  }

  &__link {
    @include corner-effect;
    @apply relative cursor-pointer px-4 py-2 text-center font-rajdhaniMedium text-white text-xs backdrop-blur-lg;

    &:hover {
      @include corner-effect-secondary;
      @apply bg-black text-secondary transition-all duration-300;
      background-size: 100% 100%;
      text-shadow: 0 0 0px;
    }
  }

  &__right {
    @apply flex h-full w-[50vw] flex-col items-center justify-center bg-black transition-all duration-300 lg:w-[10vw];
  }

  &__translate-icon {
    @apply text-white transition-all duration-300;

    &:hover {
      @apply text-secondary;
    }
  }

  &__link--active {
    @include corner-effect-secondary;
    @apply bg-black text-secondary transition-all duration-300;
    background-size: 100% 100%;
    text-shadow: 0 0 0px;
  }
}
</style>
