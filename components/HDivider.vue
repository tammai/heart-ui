<template>
  <div
    :class="
      css({ isVertical: !!vertical, hasChild: !!$slots.default || !!icon })
    "
  >
    <slot>
      <Icon v-if="icon" :name="icon" :size="iconSize" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface DividerProps {
  icon?: string;
  iconSize?: number | string;
  vertical?: boolean;
  ui?: DeepPartial<typeof _css>;
}
const props = defineProps<DividerProps>();

const _css = {
  base: 'text-neutral-600',
  variants: {
    isVertical: { true: '' },
    hasChild: {
      true: 'flex gap-2 items-center content-center before:content-[""] after:content-[""] before:block after:block before:bg-neutral-300 after:bg-neutral-300 before:grow after:grow',
      false: 'bg-neutral-300',
    },
  },
  compoundVariants: [
    { hasChild: true, isVertical: false, class: 'before:h-0.25 after:h-0.25' },
    {
      hasChild: true,
      isVertical: true,
      class: 'flex-col before:w-0.25 after:w-0.25',
    },
    { hasChild: false, isVertical: false, class: 'h-0.25 w-full' },
    { hasChild: false, isVertical: true, class: 'w-0.25 h-full' },
  ] as any,
};

const css = computed(() => {
  return tv({ extend: tv(_css), ...props.ui });
});
</script>
