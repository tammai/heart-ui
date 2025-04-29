<template>
  <main :class="css()">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface MainProps {
  ui?: DeepPartial<typeof _css>;
}
const props = defineProps<MainProps>();
const _css = { base: 'container grow min-w-0' };
const css = computed(() => tv({ extend: tv(_css), ...props.ui }));
</script>
