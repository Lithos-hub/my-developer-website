<template>
  <header class="TopBar" :class="`TopBar--${visualDataBySection?.color}`">
    <div class="TopBar__left">
      <div class="TopBar__info-row">
        <div
          class="triangle-shape-top-left TopBar__triangle"
          :class="`TopBar__triangle--${visualDataBySection?.color}`"
        />
        <span
          class="info-text"
          :class="`info-text--${visualDataBySection?.color}`"
          >{{ visualDataBySection?.componentName }}
        </span>
      </div>
      <div class="TopBar__info-row">
        <div
          class="triangle-shape-top-left TopBar__triangle"
          :class="`TopBar__triangle--${visualDataBySection?.color}`"
        />
        <span
          class="info-text"
          :class="`info-text--${visualDataBySection?.color}`"
          >{{ $t("topBar.zone") }} {{ visualDataBySection?.code }}
        </span>
      </div>
    </div>
    <nav
      class="TopBar__center"
      :class="`TopBar__center--${visualDataBySection?.color}`"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul class="TopBar__links">
        <li
          v-for="link in sections"
          :key="link.title"
          class="TopBar__link"
          :class="{
            'TopBar__link--active': visibleSection
              .toLowerCase()
              .includes(link.id.toLowerCase()),
            'TopBar__link--neutral': visualDataBySection?.color === 'neutral',
            'TopBar__link--primary': visualDataBySection?.color === 'primary',
            'TopBar__link--secondary':
              visualDataBySection?.color === 'secondary',
          }"
          :aria-current="
            visibleSection.toLowerCase().includes(link.id.toLowerCase())
              ? 'page'
              : undefined
          "
          role="menuitem"
          tabindex="0"
          @click="scrollToSection(link.path)"
          @keydown.enter="scrollToSection(link.path)"
        >
          {{ link.title }}
        </li>
      </ul>
      <div class="TopBar__mobile-menu-button">
        <button
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
          aria-expanded="false"
          type="button"
        >
          <Icon name="i-mdi-menu" size="30" class="TopBar__menu-icon" />
        </button>
      </div>
    </nav>
    <div class="TopBar__right">
      <button
        @click="toggleLanguageMenu"
        aria-label="Change language"
        type="button"
      >
        <Icon
          name="i-mdi-translate"
          size="20"
          class="TopBar__translate-icon"
          :class="`TopBar__translate-icon--${visualDataBySection?.color}`"
        />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { sections } from "@/consts/sections";
const { visualDataBySection, visibleSection } = storeToRefs(useUiStore());
const { toggleLanguageMenu, toggleMobileMenu } = useUiStore();

const TOPBAR_HEIGHT = 60;

function scrollToSection(section: string): void {
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
}
</script>

<style lang="scss" scoped>
.TopBar {
  @apply sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-b border-secondary transition-all duration-300;

  &--neutral {
    @apply border-white;
  }

  &--primary {
    @apply border-primary;
  }

  &--secondary {
    @apply border-secondary;
  }

  @media mobile {
    padding: $mobile-margin;
  }

  @media desktop {
    padding: $desktop-margin;
  }

  &__left {
    @apply flex h-full min-w-[100px] flex-col items-center justify-between bg-black p-2 font-lucania lg:w-[10vw];
  }

  &__info-row {
    @apply flex w-full items-center justify-between;
  }

  &__triangle {
    &--primary {
      @apply bg-primary;
    }

    &--secondary {
      @apply bg-secondary;
    }

    &--neutral {
      @apply bg-white;
    }
  }

  &__center {
    @apply mx-auto flex h-full w-full max-w-[80vw] items-center justify-center border-x backdrop-blur-lg;

    &--primary {
      @apply border-primary;
      @include neon-text-primary;
    }

    &--secondary {
      @apply border-secondary;
      @include neon-text-secondary;
    }

    &--neutral {
      @apply border-white;
      @include neon-text-neutral;
    }
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
    @apply relative cursor-pointer px-4 py-2 text-center font-rajdhaniMedium text-xs backdrop-blur-lg;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--neutral {
      @include corner-effect-neutral;
      @apply text-white;

      &:hover {
        @include corner-effect-neutral;
        @apply text-white;
        background-size: 100% 100%;
        text-shadow: 0 0 0px;
      }
    }

    &--primary {
      @include corner-effect-primary;
      @apply text-primary;

      &:hover {
        @include corner-effect-primary;
      }
    }

    &--secondary {
      @include corner-effect-secondary;
      @apply text-secondary;

      &:hover {
        @include corner-effect-secondary;
        @apply text-secondary;
      }
    }

    &:hover {
      @apply bg-black transition-all duration-300;
      background-size: 100% 100%;
      text-shadow: 0 0 0px;
    }

    &:focus {
      @apply outline-2 outline-secondary outline-offset-2;
    }
  }

  &__right {
    @apply flex h-full min-w-[100px] flex-col items-center justify-center bg-black transition-all duration-300 lg:w-[10vw];
  }

  &__translate-icon {
    @apply text-white transition-all duration-300;

    &:hover {
      @apply scale-125;
    }

    &--primary {
      @apply text-primary;
    }

    &--secondary {
      @apply text-secondary;
    }

    &--neutral {
      @apply text-white;
    }
  }

  &__link--active {
    @apply transition-all duration-300 bg-black;
    background-size: 100% 100%;
    text-shadow: 0 0 0px;

    &--primary {
      @include corner-effect-primary;
      @apply bg-primary text-primary;
    }

    &--secondary {
      @include corner-effect-secondary;
      @apply bg-secondary text-secondary;
    }

    &--neutral {
      @include corner-effect-neutral;
      @apply bg-white text-white;
    }
  }

  &__mobile-menu-button button {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      @apply outline-2 outline-secondary outline-offset-2 rounded;
    }
  }
}
</style>
