import { defineStore } from "pinia";
import { type Section, sections, sectionsOptions } from "~/consts/sections";

export const useUiStore = defineStore("ui", () => {
  const visibleSection = ref<Section>(sectionsOptions.at(0) as Section);
  const isLanguageMenuVisible = ref(false);
  const isMobileMenuVisible = ref(false);

  const currentLanguage = ref<string>("en");

  const visualDataBySection = computed(() => {
    return sections[visibleSection.value as keyof typeof sections];
  });

  const openLanguageMenu = () => {
    isLanguageMenuVisible.value = true;
  };

  const closeLanguageMenu = () => {
    isLanguageMenuVisible.value = false;
  };

  const toggleLanguageMenu = () => {
    isLanguageMenuVisible.value = !isLanguageMenuVisible.value;
  };

  const openMobileMenu = () => {
    isMobileMenuVisible.value = true;
  };

  const closeMobileMenu = () => {
    isMobileMenuVisible.value = false;
  };

  const toggleMobileMenu = () => {
    isMobileMenuVisible.value = !isMobileMenuVisible.value;
  };

  const setLanguage = (lang: string) => {
    currentLanguage.value = lang;
  };

  return {
    visualDataBySection,
    visibleSection,
    isLanguageMenuVisible,
    isMobileMenuVisible,
    openLanguageMenu,
    closeLanguageMenu,
    toggleLanguageMenu,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    currentLanguage,
    setLanguage,
  };
});
