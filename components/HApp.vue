<template>
  <slot />
</template>

<script setup lang="ts">
import { merge } from 'lodash-unified';
import type { HeartConfig } from '../types/heart';

const props = withDefaults(defineProps<{ config?: HeartConfig }>(), {
  config: () => ({ locale: 'en' }),
});

const { heart } = useAppConfig();

merge(heart, {
  ...props.config,
});

useHead({
  htmlAttrs: {
    lang: heart.locale,
  },
});
</script>
