<template>
  <Transition name="fade">
    <div v-if="isLanguageMenuVisible" class="LanguageMenu">
      <div class="LanguageMenu__overlay" @click="closeLanguageMenu" />
      <div class="LanguageMenu__container">
        <button class="LanguageMenu__close-button" @click="closeLanguageMenu">
          <Icon name="i-mdi-close" size="30" class="LanguageMenu__close-icon" />
        </button>
        <h2 class="LanguageMenu__title">{{ $t("selectLanguage") }}</h2>
        <div class="LanguageMenu__grid">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="LanguageMenu__item"
            :class="{
              'LanguageMenu__item--active': currentLanguage === lang.code,
            }"
            @click="selectLanguage(lang.code)"
          >
            <img :src="lang.flag" :alt="lang.name" class="LanguageMenu__flag" />
            <span class="LanguageMenu__name">{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isLanguageMenuVisible, currentLanguage } = storeToRefs(useUiStore());
const { closeLanguageMenu, setLanguage } = useUiStore();
const { setLocale, locale } = useI18n();

watchEffect(() => {
  if (currentLanguage.value && currentLanguage.value !== locale.value) {
    setLocale(currentLanguage.value as any);
  }
});

const languages = [
  {
    name: "English",
    code: "en",
    flag: "/icons/gb.svg",
  },
  {
    name: "Español",
    code: "es",
    flag: "/icons/es.svg",
  },
  {
    name: "Português",
    code: "pt",
    flag: "/icons/pt.svg",
  },
  {
    name: "Français",
    code: "fr",
    flag: "/icons/fr.svg",
  },
  {
    name: "Italiano",
    code: "it",
    flag: "/icons/it.svg",
  },
  {
    name: "Deutsch",
    code: "de",
    flag: "/icons/de.svg",
  },
];

const selectLanguage = async (langCode: string) => {
  setLanguage(langCode);
  await setLocale(langCode as any);
  closeLanguageMenu();
};
</script>

<style lang="scss" scoped>
.LanguageMenu {
  @apply fixed inset-0 z-50 flex h-screen;

  &__overlay {
    @apply fixed inset-0 z-40 h-screen w-full bg-dark2/50 backdrop-blur;

    &:before {
      content: "";
      @apply fixed inset-0 z-40 h-screen w-full bg-gradient-to-br from-secondarySoft/50 via-black/50 to-black/50 transition-all;
      background-color: $dark2;
      background-size: 20px 20px;
      background-image: radial-gradient(#ef444450 1px, rgba(0, 0, 0, 0.5) 1px);
    }
  }

  &__container {
    @include corner-effect-secondary;
    @apply absolute left-1/2 top-1/2 z-50 flex w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-dark2 p-10;
  }

  &__close-button {
    @apply absolute right-4 top-4;
  }

  &__close-icon {
    @apply text-secondarySoft;
  }

  &__title {
    @apply mb-8 font-rajdhaniSemiBold text-2xl text-white;
  }

  &__grid {
    @apply grid grid-cols-2 gap-4 lg:grid-cols-3;
  }

  &__item {
    @include corner-effect;
    @apply flex flex-col items-center gap-3 bg-black/50 p-6 transition-all duration-300 hover:bg-black hover:text-secondary;

    &:hover {
      @include corner-effect-secondary;
      background-size: 100% 100%;
      text-shadow: 0 0 0px;
    }

    &--active {
      @include corner-effect-secondary;
      @apply bg-black text-secondary;
      background-size: 100% 100%;
      text-shadow: 0 0 0px;
    }
  }

  &__flag {
    @apply h-12 w-12 object-cover rounded-full overflow-hidden;
  }

  &__name {
    @apply font-rajdhaniMedium text-base text-white;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
