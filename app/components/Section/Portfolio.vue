<template>
  <div class="Portfolio" id="Portfolio">
    <div class="Portfolio__content">
      <ComponentName
        componentName="Portfolio.vue"
        color="primary"
        japaneseName="ポートフォリオ"
      />
      <div class="Portfolio__inner-container">
        <img
          src="/svg/decoration/decoration-21.svg"
          :alt="$t('common.decorationAlt')"
          class="Portfolio__decoration Portfolio__decoration--top-left"
        />

        <h1 class="Portfolio__title">{{ $t("portfolio.title") }}</h1>
        <div class="Portfolio__grid">
          <article
            v-for="project in PORTFOLIO_PROJECTS"
            :key="`portfolio-${project.id}`"
            class="Portfolio__card"
          >
            <div class="Portfolio__card-image-container">
              <img
                :src="project.image"
                :alt="$t(project.titleKey)"
                class="Portfolio__card-image"
              />
            </div>
            <div class="Portfolio__card-content">
              <p class="Portfolio__card-prev-title">
                {{ $t(project.prevTitleKey) }}
              </p>
              <h2 class="Portfolio__card-title">{{ $t(project.titleKey) }}</h2>
              <p class="Portfolio__card-description">
                {{ $t(project.descriptionKey) }}
              </p>

              <div class="Portfolio__card-stack">
                <div
                  v-for="tech in project.stack"
                  :key="tech.techName"
                  class="Portfolio__stack-item"
                  :title="tech.techName"
                >
                  <img
                    :src="tech.imageUrl"
                    :alt="tech.techName"
                    class="Portfolio__stack-icon"
                  />
                </div>
              </div>

              <div class="Portfolio__card-buttons">
                <BaseButton variant="primary" size="sm">
                  <a
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="Portfolio__button-link"
                  >
                    <Icon
                      name="grommet-icons:github"
                      size="16"
                      class="text-primary"
                    />
                    {{ $t("portfolio.repository") }}
                  </a>
                </BaseButton>
                <BaseButton v-if="project.href" variant="secondary" size="sm">
                  <a
                    :href="project.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="Portfolio__button-link"
                  >
                    <Icon
                      name="uil:external-link-alt"
                      size="16"
                      class="text-secondary"
                    />
                    {{ $t("portfolio.liveDemo") }}
                  </a>
                </BaseButton>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PORTFOLIO_PROJECTS } from "~/consts/portfolio";
</script>

<style lang="scss" scoped>
.Portfolio {
  @apply border-b border-primary;
  &__content {
    @include section-content-primary;
  }

  &__inner-container {
    @include inner-container-primary;
  }

  &__decoration {
    position: absolute;

    &--top-left {
      left: 0;
      top: -100px;
      height: 70px;
    }
  }

  &__title {
    @include section-title-primary;
  }

  &__grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
  }

  &__card {
    @include corner-effect-primary;
    @apply relative flex flex-col overflow-hidden bg-black/50 backdrop-blur-sm transition-all duration-300;
  }

  &__card-image-container {
    @apply relative h-48 w-full overflow-hidden;
  }

  &__card-image {
    @apply h-full w-full object-contain p-5 transition-transform duration-300 hover:scale-110;
  }

  &__card-content {
    @apply flex flex-1 flex-col gap-3 p-5;
  }

  &__card-prev-title {
    @include chromatic-aberration-secondary;
    @apply font-orbitron text-xs font-bold uppercase tracking-wider text-secondary;
  }

  &__card-title {
    @include chromatic-aberration-neutral;
    @apply font-rajdhaniSemiBold text-lg font-bold text-white;
  }

  &__card-description {
    @include chromatic-aberration-secondary;
    @apply font-rajdhaniMedium text-sm leading-relaxed text-gray-300;
  }

  &__card-stack {
    @apply flex flex-wrap gap-2;
  }

  &__stack-item {
    @apply flex items-center justify-center rounded bg-stone-900/50 p-2 transition-all hover:scale-110 hover:bg-stone-800/70;
  }

  &__stack-icon {
    @apply h-5 w-5 object-contain;
  }

  &__card-buttons {
    @apply pt-5 mt-auto flex w-full items-center justify-between gap-3;
  }

  &__button-link {
    @apply flex items-center gap-2 text-inherit no-underline;
  }

  &__button-icon {
    @apply h-4 w-4 object-contain;
  }
}
</style>
