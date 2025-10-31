<template>
  <div class="Site">
    <LayoutTopBar />
    <LanguageMenu />
    <section ref="heroRef" id="hero">
      <SectionHero />
    </section>
    <section ref="aboutRef" id="about">
      <SectionAbout />
    </section>
    <section ref="summaryRef" id="summary">
      <SectionSummary />
    </section>
    <section ref="experienceRef" id="experience">
      <SectionExperience />
    </section>
    <section ref="portfolioRef" id="portfolio">
      <SectionPortfolio />
    </section>
    <SectionFooter />
  </div>
</template>

<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import type { Section } from "~/consts/sections";

// SEO metadata
useHead({
  title: "Carlos Segura Garcia - Software Engineer",
  meta: [
    {
      name: "description",
      content:
        "Carlos Segura Garcia is a software engineer with a passion for building web applications.",
    },
  ],
});

const heroRef = useTemplateRef<HTMLElement | null>("heroRef");
const aboutRef = useTemplateRef<HTMLElement | null>("aboutRef");
const summaryRef = useTemplateRef<HTMLElement | null>("summaryRef");
const experienceRef = useTemplateRef<HTMLElement | null>("experienceRef");
const portfolioRef = useTemplateRef<HTMLElement | null>("portfolioRef");

const { visibleSection } = storeToRefs(useUiStore());

const { visibleElement } = useIsVisible({
  refs: [
    heroRef,
    aboutRef,
    summaryRef,
    experienceRef,
    portfolioRef,
  ] as Ref<HTMLElement>[],
});

const debouncedVisibleSection = refDebounced(visibleElement, 100);

watch(debouncedVisibleSection, (newVisibleElement) => {
  visibleSection.value = newVisibleElement as Section;
});
</script>

<style lang="scss" scoped>
.Site {
  @apply relative flex flex-col bg-gradient-to-br from-secondarySoft/10 via-black/50 to-black/50;

  &::after {
    content: "";
    @apply fixed inset-0 -z-10 h-screen w-full bg-transparent opacity-50;

    background: radial-gradient(
        circle,
        transparent 20%,
        rgba(0, 0, 0, 0.196) 20%,
        black 80%,
        transparent 80%,
        transparent
      ),
      radial-gradient(
          circle,
          transparent 20%,
          rgba(0, 0, 0, 0.227) 20%,
          black 80%,
          transparent 80%,
          transparent
        )
        25px 25px,
      linear-gradient($secondary 2px, transparent 2px) 0 -1px,
      linear-gradient(90deg, $secondary 2px, black 2px) -1px 0;
    animation: backgroundMutation 5s cubic-bezier(0.4, 0, 0.2, 1) infinite
      alternate-reverse;
  }

  &::before {
    content: "";
    @apply fixed inset-0 -z-10 h-screen w-full bg-transparent opacity-50;

    background: radial-gradient(
        circle,
        transparent 15%,
        rgba(0, 0, 0, 0.196) 15%,
        black 60%,
        transparent 60%,
        transparent
      ),
      radial-gradient(
          circle,
          transparent 15%,
          rgba(0, 0, 0, 0.227) 15%,
          black 60%,
          transparent 60%,
          transparent
        )
        25px 25px,
      linear-gradient($secondary 1px, transparent 1px) 0 -1px,
      linear-gradient(90deg, $secondary 1px, black 1px) -1px 0;
    animation: backgroundMutation2 5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      infinite alternate-reverse;
  }
}

@keyframes backgroundMutation {
  0% {
    background-size: 40px 40px, 40px 40px, 25px 25px, 25px 25px;
  }
  25% {
    background-size: 41px 40px, 40px 41px, 26px 25px, 25px 26px;
  }
  50% {
    background-size: 40px 41px, 41px 40px, 25px 26px, 26px 25px;
  }
  75% {
    background-size: 41px 41px, 39px 40px, 24px 25px, 25px 24px;
  }
  100% {
    background-size: 40px 39px, 40px 41px, 25px 24px, 24px 25px;
  }
}

@keyframes backgroundMutation2 {
  0% {
    background-size: 40px 40px, 40px 40px, 25px 25px, 25px 25px;
  }
  25% {
    background-size: 39px 40px, 41px 40px, 24px 25px, 26px 25px;
  }
  50% {
    background-size: 40px 39px, 40px 41px, 25px 24px, 25px 26px;
  }
  75% {
    background-size: 41px 40px, 39px 40px, 26px 25px, 24px 25px;
  }
  100% {
    background-size: 40px 41px, 40px 39px, 25px 26px, 25px 24px;
  }
}
</style>
