<template>
  <div :class="css({ vertical, outline })">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { ComponentSize, DeepPartial } from '../types/heart';
import type { ButtonType, ButtonVariant, IconPosition } from './HButton.vue';
import type { Reactive } from 'vue';

export interface ButtonGroupProps {
  vertical?: boolean;
  size?: ComponentSize;
  outline?: boolean;
  rounded?: boolean;
  variant?: ButtonVariant;
  type?: ButtonType;
  iconPosition?: IconPosition;
  disabled?: boolean;
  ui?: DeepPartial<typeof _css>;
}

export interface ButtonGroupContext {
  size?: ComponentSize;
  iconPosition?: IconPosition;
  outline?: boolean;
  rounded?: boolean;
  variant?: ButtonVariant;
  type?: ButtonType;
}

const props = defineProps<ButtonGroupProps>();

const _css = {
  base: 'flex ',
  variants: {
    vertical: {
      true: 'flex-col  *:not-first:rounded-t-none *:not-last:rounded-b-none',
      false:
        '*:not-first:-ml-0.25 *:not-first:rounded-l-none *:not-last:rounded-r-none',
    },
    outline: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      vertical: true,
      outline: true,
      class: '*:not-first:-mt-0.25',
    },
    {
      vertical: true,
      outline: false,
      class: '*:not-first:mt-0.25',
    },
    {
      vertical: false,
      outline: true,
      class: '*:not-first:-ml-0.25',
    },
    {
      vertical: false,
      outline: false,
      class: '*:not-first:ml-0.25',
    },
  ] as any,
};

const css = computed(() => {
  return tv({ extend: tv(_css), ...props.ui });
});

provide<Reactive<ButtonGroupContext>>(
  BUTTON_GROUP_CONTEXT_KEY,
  reactive({
    size: props.size,
    outline: props.outline,
    rounded: props.rounded,
    variant: props.variant,
    type: props.type,
    iconPosition: props.iconPosition,
  }),
);
</script>
