<template>
  <aside :class="css()">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface AsideProps {
  ui?: DeepPartial<typeof _css>;
}
const props = defineProps<AsideProps>();
const _css = { base: 'min-w-[var(--h-layout-aside-size)]' };
const css = computed(() => tv({ extend: tv(_css), ...props.ui }));
</script>
