<template>
  <div :class="css({ isVertical: !!vertical }).base()">
    <div :class="css({ isVertical: !!vertical }).line()"></div>
    <slot>
      <Icon v-if="icon" :name="icon" :size="iconSize" />
    </slot>
    <div
      v-if="!!$slots.default || !!icon"
      :class="css({ isVertical: !!vertical }).line()"
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
  ui?: DeepPartial<typeof ui>;
}
const props = defineProps<DividerProps>();

const ui = {
  base: 'text-neutral-600 flex justify-center items-center gap-2',
  slots: {
    line: 'bg-neutral-200 grow',
  },
  variants: {
    isVertical: {
      true: { base: 'flex-col', line: 'w-0.25' },
      false: { line: 'h-0.25' },
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
