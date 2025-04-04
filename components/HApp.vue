<template>
  <slot />
</template>

<script setup lang="ts">
import type { LocaleCode } from '../types/heart/locale';

const props = withDefaults(defineProps<{ config?: { locale: LocaleCode } }>(), {
  config: () => ({ locale: 'en' }),
});

useHead({
  htmlAttrs: {
    lang: props.config.locale,
  },
});
</script>
