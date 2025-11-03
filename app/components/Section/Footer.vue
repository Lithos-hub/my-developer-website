<template>
  <footer class="Footer">
    <div class="Footer__left">
      <div class="Footer__developedBy">
        <div class="Footer__label-row">
          <div class="square Footer__square" />
          <label class="Footer__developedBy-label">
            {{ $t("footer.developedBy") }}
          </label>
        </div>
        <span class="Footer__developedBy-name">Carlos Segura García</span>
      </div>
    </div>

    <div class="Footer__center">
      <div class="Footer__title">
        {{ $t("footer.title") }}
        <strong class="Footer__nuxt-accent">Nuxt</strong>
      </div>
      <div class="Footer__socials">
        <a
          href="https://github.com/Lithos-hub"
          class="Footer__social"
          aria-label="Visit my GitHub profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="i-mdi-github" size="20" />
        </a>
        <a
          href="https://www.linkedin.com/in/carlos-segura-garcia/"
          class="Footer__social"
          aria-label="Visit my LinkedIn profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="i-mdi-linkedin" size="20" />
        </a>
      </div>
    </div>

    <div class="Footer__right">
      <div class="Footer__location">
        <div class="Footer__label-row">
          <div class="square Footer__square" />
          <label class="Footer__location-label">
            {{ $t("footer.location") }}
          </label>
        </div>
        <span class="Footer__location-location">{{
          $t("footer.locationValue")
        }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.Footer {
  @apply flex h-full w-full justify-between bg-black;

  &__left,
  &__right {
    @apply flex h-full w-[50vw] items-center bg-black p-2 lg:w-[10vw] my-auto;
  }

  &__right {
    @apply justify-end;
  }

  &__center {
    @apply flex h-auto w-full max-w-[80vw] items-center justify-between border-x border-primary p-2;
  }

  &__content {
    @apply flex h-[49px] items-center justify-between gap-10;
  }

  &__label-row {
    @apply flex items-center gap-1;
  }

  &__square {
    @apply bg-primary;
  }

  &__title {
    @include chromatic-aberration-secondary;
    @apply text-center font-exo text-xs text-white self-center;
  }

  &__nuxt-accent {
    @include chromatic-aberration-primary;
    @apply font-bold text-green-500;
  }

  &__socials {
    @apply flex items-center justify-center;
  }

  &__social {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(*) {
      @apply text-white;
    }

    :hover {
      @apply scale-125 transition-all duration-200 text-primary;
    }
  }

  &__location,
  &__developedBy {
    @apply flex flex-col items-start justify-center font-lucania text-xs;

    &-label {
      @include chromatic-aberration-neutral;
      @apply font-lucania text-[7px] md:text-[9px] text-primary;
    }

    &-name,
    &-location {
      @include chromatic-aberration-secondary;
      @apply font-exo text-[8px] md:text-[10px] text-secondary;
    }
  }

  &__location {
    @apply items-end;
  }
}
</style>
