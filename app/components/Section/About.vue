<template>
  <div class="About">
    <div class="About__content">
      <img
        src="/svg/decoration/decoration-6.svg"
        :alt="$t('common.decorationAlt')"
        class="About__decoration About__decoration--top-left"
      />
      <img
        src="/svg/decoration/decoration-7.svg"
        :alt="$t('common.decorationAlt')"
        class="About__decoration About__decoration--bottom-right"
      />
      <ComponentName
        componentName="About.vue"
        color="secondary"
        japaneseName="自己紹介"
      />
      <div class="About__inner-container">
        <img
          src="/svg/decoration/decoration-3.svg"
          :alt="$t('common.decorationAlt')"
          class="About__inner-decoration About__inner-decoration--top-left"
        />
        <img
          src="/svg/decoration/decoration-4.svg"
          :alt="$t('common.decorationAlt')"
          class="About__inner-decoration About__inner-decoration--top-right"
        />
        <img
          src="/svg/decoration/decoration-5.svg"
          :alt="$t('common.decorationAlt')"
          class="About__inner-decoration About__inner-decoration--bottom-right"
        />
        <h1 class="About__title">{{ $t("about.title") }}</h1>
        <div class="About__text">
          <div class="About__photo-wrapper">
            <img
              src="/foto-cv.jpg"
              :alt="$t('common.developerPhoto')"
              class="About__photo-image"
            />
            <div class="About__photo-pseudo-border" />
          </div>
          <p class="About__description">
            {{ $t("about.description.part1") }}
            {{ $t("about.description.part2") }}
            <strong class="About__description-vue">{{
              $t("about.description.vue")
            }}</strong>
          </p>
          <div class="About__logos">
            <div
              v-for="logo in techLogos"
              :key="logo.alt"
              class="About__logo-container"
            >
              <img :src="logo.src" :alt="logo.alt" class="About__logo-image" />
              <small class="About__logo-name">{{ logo.name }}</small>
            </div>
          </div>
          <p class="About__description">
            {{ $t("about.description2.p1") }}
            <br /><br />
            {{ $t("about.description2.p2") }}
            <br /><br />
            {{ $t("about.description2.p3") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechLogo {
  src: string;
  alt: string;
  name: string;
}

const techLogos: TechLogo[] = [
  {
    src: "/tech-logos/vue.svg",
    alt: "Vue",
    name: "Vue",
  },
  {
    src: "/tech-logos/nuxt.svg",
    alt: "Nuxt",
    name: "Nuxt",
  },
  {
    src: "/tech-logos/pinia.svg",
    alt: "Pinia",
    name: "Pinia",
  },
  {
    src: "/tech-logos/vite.svg",
    alt: "Vite",
    name: "Vite",
  },
  {
    src: "/tech-logos/typescript.svg",
    alt: "TypeScript",
    name: "TypeScript",
  },
];
</script>

<style lang="scss" scoped>
.About {
  @apply border-b border-secondary;
  &__content {
    @include section-content-secondary;
  }

  &__inner-container {
    @include inner-container-secondary;
  }

  &__title {
    @include section-title-secondary;
    text-shadow: 0 0 2px rgb(255, 0, 0), 0 0 4px magenta;
  }

  &__text {
    @apply z-10 flex w-full flex-col items-center justify-center gap-10 font-bold;
    text-shadow: 0 0 2px rgb(255, 0, 0), 0 0 4px magenta;
  }

  &__decoration {
    @apply absolute;

    &--top-left {
      @apply left-5 top-5 h-[80px];
    }

    &--bottom-right {
      @apply bottom-5 right-5 h-[60px];
    }
  }

  &__inner-decoration {
    @apply absolute;

    &--top-left {
      @apply left-0 top-[-40px] h-[30px];
    }

    &--top-right {
      @apply right-0 top-[-40px] h-[30px];
    }

    &--bottom-right {
      @apply bottom-[-20px] right-0 h-[10px];
    }
  }

  &__description {
    @apply text-center font-rajdhaniRegular text-xl leading-relaxed text-secondarySoft;
  }

  &__description-vue {
    @apply vue-gradient-text text-2xl font-bold;

    text-shadow: 0 0 2px white;
  }

  &__logos {
    @apply flex w-full flex-wrap items-center justify-center gap-5;
  }

  &__logo {
    &-container {
      @apply flex flex-col items-center justify-center gap-2;
    }

    &-image {
      @apply h-10 w-10 object-contain;
    }

    &-name {
      @apply font-exo text-xs font-light text-primary;
    }
  }

  &__photo {
    &-wrapper {
      @apply relative h-40 w-40;
    }

    &-image {
      @apply absolute inset-0 z-10 h-full w-full object-cover;
      clip-path: polygon(
        0 0,
        80% 0,
        100% 20%,
        100% 70%,
        100% 100%,
        20% 100%,
        0 80%,
        0% 30%
      );
    }

    &-pseudo-border {
      @apply absolute inset-0 left-[-2.5px] top-[-2.5px] z-0 h-[calc(100%+5px)] w-[calc(100%+5px)];
      background: $secondary;
      clip-path: polygon(
        0 0,
        80% 0,
        100% 20%,
        100% 70%,
        100% 100%,
        20% 100%,
        0 80%,
        0% 30%
      );
    }
  }
}
</style>
