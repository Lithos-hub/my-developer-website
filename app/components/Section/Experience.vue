<template>
  <div class="Experience">
    <div class="Experience__content">
      <img
        src="/svg/decoration/decoration-11.svg"
        :alt="$t('common.decorationAlt')"
        class="Experience__decoration Experience__decoration--top-left"
      />
      <ComponentName
        componentName="Experience.vue"
        color="secondary"
        japaneseName="経験"
      />
      <div class="Experience__inner-container">
        <img
          src="/svg/decoration/decoration-13.svg"
          :alt="$t('common.decorationAlt')"
          class="Experience__decoration Experience__decoration--top-center"
        />
        <img
          src="/svg/decoration/decoration-10.svg"
          :alt="$t('common.decorationAlt')"
          class="Experience__decoration Experience__decoration--top-right"
        />
        <h1 class="Experience__title">{{ $t("experience.title") }}</h1>
        <div class="Experience__list">
          <article
            v-for="experience in DEV_EXPERIENCE"
            :key="`Experience-${experience.roleKey}-${experience.subtitle}`"
            class="experience-card"
          >
            <div class="experience-card__index-and-date">
              <img
                :src="'/svg/decoration/decoration-22.svg'"
                :alt="$t('common.decorationAlt')"
                class="experience-card__decoration experience-card__decoration--index-bottom-right"
              />
              <img
                :src="'/svg/decoration/decoration-23.svg'"
                :alt="$t('common.decorationAlt')"
                class="experience-card__decoration experience-card__decoration--index-middle-right"
              />
              <img
                :src="'/svg/decoration/decoration-25.svg'"
                :alt="$t('common.decorationAlt')"
                class="experience-card__decoration experience-card__decoration--index-mobile"
              />
              <div class="experience-card__index">#{{ experience.id }}</div>
              <div class="experience-card__date">
                <span class="experience-card__date-start">{{
                  getStartDate(experience)
                }}</span>
                <span class="experience-card__date-separator">-</span>
                <span
                  class="experience-card__date-end"
                  :class="{
                    'experience-card__date-end--current':
                      !experience.endMonth || !experience.endYear,
                  }"
                >
                  {{ getEndDate(experience) }}
                </span>
              </div>
            </div>
            <div class="experience-card__content">
              <img
                :src="'/svg/decoration/decoration-18.svg'"
                :alt="$t('common.decorationAlt')"
                class="experience-card__decoration experience-card__decoration--content-bottom-right"
              />
              <div class="experience-card__header">
                <img
                  :src="experience.image"
                  :alt="experience.company"
                  class="experience-card__company-image"
                  :class="{
                    'experience-card__company-image--innoit':
                      experience.subtitle === 'InnoIT',
                  }"
                />
                <div class="experience-card__role-container">
                  <h3 class="experience-card__role">
                    {{ $t(experience.roleKey) }}
                  </h3>
                  <p class="experience-card__company">
                    {{ experience.company }}
                  </p>
                </div>
              </div>

              <div
                class="experience-card__clients"
                v-if="experience.clients.length"
              >
                <span class="experience-card__label">{{
                  $t("experience.clients")
                }}</span>
                <span class="experience-card__client-list">{{
                  experience.clients.join(", ")
                }}</span>
              </div>

              <div class="experience-card__stack">
                <span class="experience-card__label">{{
                  $t("experience.stack")
                }}</span>
                <div class="experience-card__stack-items">
                  <div
                    v-for="tech in experience.stack"
                    :key="tech.techName"
                    class="experience-card__stack-item"
                  >
                    <img
                      :src="tech.imageUrl"
                      :alt="tech.techName"
                      class="experience-card__stack-image"
                    />
                    <span class="experience-card__stack-name">{{
                      tech.techName
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="experience-card__tasks">
                <span class="experience-card__label">{{
                  $t("experience.tasks")
                }}</span>
                <ul class="experience-card__task-list">
                  <li
                    v-for="(taskKey, taskIndex) in experience.tasksKeys"
                    :key="taskIndex"
                    class="experience-card__task-item"
                  >
                    <div class="experience-card__task-bullet" />
                    <p class="experience-card__task-text">{{ $t(taskKey) }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEV_EXPERIENCE, type Experience } from "~/consts/devExperience";

const { t } = useI18n();

const getMonth = (month: number) => {
  return t(`common.monthsNames.${month}`);
};

const getStartDate = ({ initialYear, initialMonth }: Experience) => {
  return `${getMonth(initialMonth)} ${initialYear}`;
};

const getEndDate = ({ endYear, endMonth }: Experience) => {
  return endMonth ? `${getMonth(endMonth)} ${endYear}` : t("common.present");
};
</script>

<style lang="scss" scoped>
.Experience {
  @apply border-b border-secondary;
  &__content {
    @include section-content-secondary;
  }

  &__decoration {
    position: absolute;

    &--top-left {
      left: 1.25rem;
      top: 1.25rem;
      height: 20px;
    }

    &--top-right {
      right: 0;
      top: -60px;
      height: 50px;
    }

    &--top-center {
      left: 0;
      top: -40px;
      height: 30px;
    }
  }

  &__inner-container {
    @include inner-container-secondary;
  }

  &__title {
    @include section-title-secondary;
  }

  &__list {
    @apply flex flex-col gap-5;
  }
}

.experience-card {
  @apply relative flex min-h-[600px] w-full flex-col bg-black/50 lg:flex-row;

  &__index-and-date {
    @include chromatic-aberration-secondary;
    @apply relative flex w-full flex-col p-5 bg-black font-orbitron font-extrabold text-secondary/80 lg:w-[300px] lg:gap-10;
  }

  &__decoration {
    position: absolute;

    &--index-bottom-right {
      bottom: 0;
      right: 0;
      height: 20px;
      width: auto;
      object-fit: cover;
      display: none;

      @media (min-width: 1024px) {
        display: block;
        width: 100%;
      }
    }

    &--index-middle-right {
      bottom: 22px;
      right: 0;
      height: calc(100% - 22px);
      width: auto;
      object-fit: contain;
      display: none;

      @media (min-width: 1024px) {
        display: block;
      }
    }

    &--index-mobile {
      bottom: 0;
      right: 0;
      width: 100%;
      object-fit: contain;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    &--content-bottom-right {
      bottom: 0;
      right: 0;
      height: 30px;
    }
  }

  &__index {
    @apply font-orbitron text-4xl font-extrabold text-secondary/80 lg:py-[20px] lg:text-[100px];
  }

  &__date {
    @apply flex w-full items-center gap-1 font-rajdhaniSemiBold;

    &-start,
    &-separator {
      @apply text-white;
    }

    &-end {
      @apply text-white;

      &--current {
        @apply font-bold text-secondary;
      }
    }
  }

  &__content {
    @apply flex flex-1 flex-col gap-5 border-secondary bg-black/10 p-5 pb-10 backdrop-blur-lg;

    &:not(:last-child) {
      @apply border-b;
    }
  }

  &__header {
    @apply flex items-center gap-4;
  }

  &__company-image {
    @apply h-[50px] w-[50px] object-contain;
  }

  &__role-container {
    @apply flex flex-col;
  }

  &__role {
    @include chromatic-aberration-secondary;
    @apply font-rajdhaniSemiBold text-xl font-bold text-secondary;
  }

  &__company {
    @include neon-text-neutral;
    @apply font-rajdhaniLight text-base text-white;
  }

  &__clients {
    @include chromatic-aberration-secondary;
    @apply flex flex-col gap-1;
  }

  &__client-list {
    @apply font-rajdhaniMedium text-sm text-white;
  }

  &__label {
    @include chromatic-aberration-secondary;
    @apply font-orbitron text-sm font-bold text-secondary;
  }

  &__stack {
    @apply flex flex-col gap-2;
  }

  &__stack-items {
    @apply grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-1;
  }

  &__stack-item {
    @include corner-effect-primary;
    @apply flex w-full items-center gap-1 bg-stone-900/50 p-2;
  }

  &__stack-image {
    @apply h-[18px] w-[18px] object-contain;
  }

  &__stack-name {
    @include chromatic-aberration-neutral;
    @apply font-exo text-[10px] text-white;
  }

  &__tasks {
    @include chromatic-aberration-secondary;
    @apply flex flex-col gap-2;
  }

  &__task-list {
    @apply list-none;
  }

  &__task-item {
    @apply flex items-center gap-2;
  }

  &__task-bullet {
    @include corner-effect-primary;
    @apply h-2 w-2 bg-transparent p-1;
  }

  &__task-text {
    @include neon-text-neutral;
    @apply font-rajdhaniMedium text-sm text-white;
  }
}
</style>
