<template>
  <slot />
</template>

<script setup lang="ts">
import { merge } from 'lodash-unified';
import type { HeartConfig } from '../types/heart';

const props = defineProps<{ config?: HeartConfig }>();
const { heart } = useAppConfig();
updateAppConfig({ heart: merge(heart, props.config) });
useHead({
  htmlAttrs: {
    lang: heart.locale ?? 'en',
  },
});
console.log(useAppConfig());
</script>
