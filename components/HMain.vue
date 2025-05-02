<template>
  <main :class="css()">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface MainProps {
  ui?: DeepPartial<typeof ui>;
}
const props = defineProps<MainProps>();
const ui = { base: 'container grow min-w-0' };
const css = computed(() =>
  tv({
    extend: tv({ extend: tv(ui), ...getHeartConfig('ui.main') }),
    ...props.ui,
  }),
);
</script>
