<template>
  <div :class="css().base()">
    <slot />
    <transition
      :enter-active-class="css().transitionEnter()"
      :leave-active-class="css().transitionLeave()"
    >
      <sup
        v-show="
          !hidden &&
          (content ||
            isDot ||
            $slots.content ||
            (showZero && props.value !== 0))
        "
        :class="[
          css({
            type: props.type,
            dot: isDot,
            fixed: Boolean($slots.default),
          }).content(),
          badgeClass,
        ]"
        :style="style"
      >
        <slot name="content" :value="content">
          {{ content }}
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { isNumber } from 'lodash-unified';
import { tv } from 'tailwind-variants';
import type { StyleValue } from 'vue';
import type { DeepPartial } from '../types/heart';

export interface BadgeProps {
  value?: string | number;
  max?: number;
  showZero?: boolean;
  isDot?: boolean;
  color?: string;
  offset?: [number, number];
  hidden?: boolean;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  badgeClass?: string;
  ui?: DeepPartial<typeof ui>;
}
const props = withDefaults(defineProps<BadgeProps>(), { type: 'danger' });

const content = computed<string>(() => {
  if (props.isDot) return '';
  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`;
  }
  return `${props.value}`;
});

const style = computed<StyleValue>(() => {
  return [
    {
      backgroundColor: props.color,
      marginRight: addUnit(props.offset?.[0] ?? 0),
      marginTop: addUnit(props.offset?.[1] ?? 0),
    },
  ];
});

const ui = {
  slots: {
    base: 'relative inline-flex',
    transitionEnter: 'scale-100 opacity-100',
    transitionLeave: 'scale-0 opacity-0',
    content:
      'rounded-full transition-all duration-300 ease-in-out text-xs font-medium border border-white text-nowrap',
  },
  variants: {
    fixed: {
      true: {
        content:
          'absolute z-1987 top-0 right-0 translate-x-1/2 -translate-y-1/2',
      },
    },
    dot: {
      true: { content: 'size-2.5' },
      false: { content: 'px-1.5' },
    },
    type: {
      primary: { content: 'bg-primary-500 text-primary-50' },
      success: { content: 'bg-success-500 text-success-50' },
      warning: { content: 'bg-warning-500 text-warning-50' },
      danger: { content: 'bg-danger-500 text-danger-50' },
      info: { content: 'bg-info-500 text-info-50' },
    },
  },
};
const css = computed(() => {
  return tv({ extend: tv(ui), ...useHeartTheme<typeof ui>('badge', props.ui) });
});

defineExpose({
  content,
});
</script>
