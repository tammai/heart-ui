<template>
  <div :class="css({ vertical }).base()">
    <div :class="css({ vertical, dash, dot }).line()"></div>
    <slot>
      <Icon v-if="icon" :name="icon" :size="iconSize" />
    </slot>
    <div
      v-if="!!$slots.default || !!icon"
      :class="css({ vertical, dash, dot }).line()"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface DividerProps {
  icon?: string;
  iconSize?: number | string;
  vertical?: boolean;
  dash?: boolean;
  dot?: boolean;
  ui?: DeepPartial<typeof ui>;
}
const props = defineProps<DividerProps>();

const ui = {
  base: 'text-neutral-600 flex justify-center items-center gap-2',
  slots: {
    line: 'border-neutral-200 grow',
  },
  variants: {
    dash: { true: { line: 'border-dashed' } },
    dot: { true: { line: 'border-dotted' } },
    vertical: {
      true: { base: 'flex-col', line: 'border-l' },
      false: { line: 'border-t' },
    },
  },
};

const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('divider', props.ui),
  });
});
</script>
