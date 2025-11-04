<template>
  <div class="Summary" id="summary">
    <div class="Summary__content">
      <img
        src="/svg/decoration/decoration-8.svg"
        :alt="$t('common.decorationAlt')"
        class="Summary__decoration Summary__decoration--bottom-left"
      />
      <ComponentName componentName="Summary.vue" color="primary" />
      <div class="Summary__inner-container">
        <img
          src="/svg/decoration/decoration-1.svg"
          :alt="$t('common.decorationAlt')"
          class="Summary__decoration Summary__decoration--top-left"
        />
        <img
          src="/svg/decoration/decoration-2.svg"
          :alt="$t('common.decorationAlt')"
          class="Summary__decoration Summary__decoration--top-right"
        />
        <img
          src="/svg/decoration/decoration-9.svg"
          :alt="$t('common.decorationAlt')"
          class="Summary__decoration Summary__decoration--top-right-inner"
        />
        <h1 class="Summary__title">{{ $t("summary.title") }}</h1>
        <ul class="Summary__info">
          <li class="Summary__info-item">
            <h2 class="Summary__info-item__title">
              {{ $t("summary.mainRole") }}
            </h2>
            <code class="Summary__info-item__value">
              {{ $t("summary.mainRoleValue") }}
            </code>
          </li>
          <li class="Summary__info-item">
            <h2 class="Summary__info-item__title">
              {{ $t("summary.totalExperience") }}
            </h2>
            <code class="Summary__info-item__value">
              {{ totalSummary() }}
            </code>
          </li>
          <li class="Summary__info-item">
            <h2 class="Summary__info-item__title">
              {{ $t("summary.mostUsedTech") }}
            </h2>
            <code class="Summary__info-item__value">
              {{ getMostUsedTech() }}
            </code>
          </li>
          <li class="Summary__info-item">
            <h2 class="Summary__info-item__title">
              {{ $t("summary.mainClientFields") }}
            </h2>
            <code class="Summary__info-item__value">
              {{ getMainClientFields(t) }}
            </code>
          </li>
          <li class="Summary__info-item Summary__info-item--tech">
            <h2 class="Summary__info-item__title">
              {{ $t("summary.techStack") }}
            </h2>
            <div class="Summary__tech-container">
              <CRTEffect />
              <img
                src="/svg/decoration/decoration-24.svg"
                :alt="$t('common.decorationAlt')"
                class="Summary__decoration Summary__decoration--inner-bottom"
              />
              <div
                v-for="tech in techSkills"
                :key="tech.name"
                class="Summary__tech-item"
              >
                <img
                  :src="tech.image"
                  :alt="tech.name"
                  class="Summary__tech-item__image"
                />
                <small class="Summary__tech-item__name">{{ tech.name }}</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getMainClientFields,
  getMostUsedTech,
  techSkills,
} from "~/consts/devExperience";

const { t } = useI18n();

// Calculate total Summary in the following format: x years, y months
const totalSummary = () => {
  const firstSummary = new Date("2021-03-01");
  const currentDate = new Date();
  const totalMonths =
    (currentDate.getFullYear() - firstSummary.getFullYear()) * 12 +
    (currentDate.getMonth() - firstSummary.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearsLabel = years === 1 ? t("common.year") : t("common.years");
  const monthsLabel = months === 1 ? t("common.month") : t("common.months");

  return t("summary.experienceFormat", {
    years,
    yearsLabel,
    months,
    monthsLabel,
  });
};
</script>

<style lang="scss" scoped>
.Summary {
  @apply border-b border-primary;
  &__content {
    @include section-content-primary;
  }

  &__inner-container {
    @include inner-container-primary;
  }

  &__title {
    @include section-title-primary;
  }

  &__decoration {
    @apply absolute;

    &--bottom-left {
      @apply bottom-5 left-5 h-[20px];
    }

    &--top-left {
      @apply left-0 top-[-30px] h-[20px];
    }

    &--top-right {
      @apply right-0 top-[-30px] h-[20px];
    }

    &--top-right-inner {
      @apply right-5 top-5 h-[20px];
    }

    &--inner-bottom {
      @apply absolute bottom-0 left-0 h-auto w-full object-cover;
    }
  }

  &__info {
    @apply relative z-10 flex flex-col gap-5 pb-5 lg:grid lg:grid-cols-3;

    &-item {
      @apply flex flex-col gap-2;
      &__title {
        @include chromatic-aberration-neutral;
        @apply font-orbitron text-xl font-bold text-white;
      }

      &__value {
        @include chromatic-aberration-primary;
        @apply font-rajdhaniSemiBold text-xl text-cyan-400;
      }

      &--tech {
        grid-column: span 3;
      }
    }
  }

  &__tech {
    &-container {
      @apply relative grid grid-cols-5 md:grid-cols-12 items-center justify-center gap-5 bg-black p-5;

      clip-path: polygon(
        0 0,
        100% 0,
        100% 30%,
        100% 95%,
        99% 100%,
        0 100%,
        0% 70%,
        0% 30%
      );
    }

    &-item {
      @apply flex flex-col items-center gap-2;

      &__image {
        @apply h-7 w-7 object-contain lg:h-10 lg:w-10;
      }

      &__name {
        @include neon-text-primary;
        @apply font-exo text-xs text-primary;
      }
    }
  }
}
</style>
