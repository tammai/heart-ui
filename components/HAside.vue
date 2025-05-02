<template>
  <aside :class="css()">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface AsideProps {
  ui?: DeepPartial<typeof ui>;
}
const props = defineProps<AsideProps>();
const ui = { base: 'min-w-[var(--h-layout-aside-size)]' };
const css = computed(() =>
  tv({ extend: tv(ui), ...useHeartTheme('aside', props.ui) }),
);
</script>
