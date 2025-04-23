<template>
  <button
    :type="nativeType"
    :class="
      css({
        variant: buttonVariant,
        size: buttonSize,
        type: buttonType,
        outline: buttonOutline,
        rounded: buttonRounded,
        disabled,
        loading,
        icon: !!icon && !label && !$slots.default,
        iconPosition,
      }).base()
    "
    :title="label ?? ''"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" :class="css().loading()">
      <Icon
        :name="loadingIcon"
        :size="iconSize"
        :class="{ 'animate-spin': loadingIconAnimated }"
      />
    </span>
    <Icon v-if="icon" :name="icon" :size="iconSize" />
    <span v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { ComponentSize, DeepPartial } from '../types/heart';
import type { ButtonGroupContext } from './HButtonGroup.vue';
import type { Reactive } from 'vue';

export type ButtonNativeType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'solid' | 'tertiary' | 'ghost';
export type ButtonType =
  | 'neutral'
  | 'primary'
  | 'danger'
  | 'error'
  | 'warning'
  | 'success'
  | 'info';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
  nativeType?: ButtonNativeType;
  size?: ComponentSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  outline?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: IconPosition;
  label?: string;
  ui?: DeepPartial<typeof _css>;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
  type: 'neutral',
  variant: 'solid',
  outline: false,
  rounded: false,
  iconPosition: 'left',
});

const emit = defineEmits<{
  (event: 'click', ev: MouseEvent): void;
}>();

const buttonGroup = inject<Reactive<ButtonGroupContext>>(
  BUTTON_GROUP_CONTEXT_KEY,
  {},
);

const loadingIcon = computed(() => getHeartConfig('icon.loading.name'));

const loadingIconAnimated = computed(() =>
  getHeartConfig('icon.loading.animated'),
);

const buttonSize = computed(() => {
  return buttonGroup?.size ?? props.size ?? getHeartConfig('size') ?? 'md';
});

const buttonOutline = computed(() => {
  return buttonGroup?.outline ?? props.outline;
});

const buttonRounded = computed(() => {
  return buttonGroup?.rounded ?? props.rounded;
});

const buttonVariant = computed(() => {
  return buttonGroup?.variant ?? props.variant;
});

const buttonType = computed(() => {
  return buttonGroup?.type ?? props.type;
});

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 16;
    case 'lg':
      return 24;
    default:
      return 20;
  }
});

const _css = {
  base: 'flex items-center justify-center font-semibold cursor-pointer transition-all',
  slots: {
    loading:
      'absolute top-0 left w-full h-full flex items-center justify-center pointer-events-none',
  },
  variants: {
    type: {
      neutral: '',
      primary: '',
      danger: '',
      error: '',
      warning: '',
      success: '',
      info: '',
    },
    variant: {
      solid: '',
      tertiary: '',
      ghost: '',
    },
    size: {
      sm: 'text-xs h-8 gap-1',
      md: 'text-sm h-10 gap-2',
      lg: 'text-base h-12 gap-3',
    },
    icon: {
      true: '',
      false: '',
    },
    iconPosition: {
      left: '',
      right: 'flex-row-reverse',
    },
    outline: {
      true: 'border',
    },
    rounded: {
      true: 'rounded-full',
      false: '',
    },
    disabled: {
      true: 'select-none pointer-events-none opacity-50',
    },
    loading: {
      true: 'relative *:not-first:invisible',
    },
  },
  compoundVariants: [
    { icon: true, size: 'sm', class: 'w-8' },
    { icon: true, size: 'md', class: 'w-10' },
    { icon: true, size: 'lg', class: 'w-12' },
    { icon: false, size: 'sm', class: 'px-3' },
    { icon: false, size: 'md', class: 'px-4' },
    { icon: false, size: 'lg', class: 'px-5' },
    { outline: true, type: 'neutral', class: 'border-neutral-600' },
    { outline: true, type: 'primary', class: 'border-primary-600' },
    { outline: true, type: ['danger', 'error'], class: 'border-danger-600' },
    { outline: true, type: 'warning', class: 'border-warning-600' },
    { outline: true, type: 'success', class: 'border-success-600' },
    { outline: true, type: 'info', class: 'border-info-600' },
    {
      variant: 'solid',
      type: 'neutral',
      class:
        'bg-neutral-600 text-neutral-50 hover:bg-neutral-500 active:bg-neutral-700',
    },
    {
      variant: 'solid',
      type: 'primary',
      class:
        'bg-primary-500 text-primary-50 hover:bg-primary-600 active:bg-primary-700',
    },
    {
      variant: 'solid',
      type: ['danger', 'error'],
      class:
        'bg-danger-500 text-danger-50 hover:bg-danger-600 active:bg-danger-700',
    },
    {
      variant: 'solid',
      type: 'warning',
      class:
        'bg-warning-500 text-warning-50 hover:bg-warning-600 active:bg-warning-700',
    },
    {
      variant: 'solid',
      type: 'success',
      class:
        'bg-success-500 text-success-50 hover:bg-success-600 active:bg-success-700',
    },
    {
      variant: 'solid',
      type: 'info',
      class: 'bg-info-500 text-info-50 hover:bg-info-600 active:bg-info-700',
    },
    {
      variant: 'ghost',
      type: 'neutral',
      class: 'text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300',
    },
    {
      variant: 'ghost',
      type: 'primary',
      class: 'text-primary-600 hover:bg-primary-100 active:bg-primary-200',
    },
    {
      variant: 'ghost',
      type: ['danger', 'error'],
      class: 'text-danger-600 hover:bg-danger-100 active:bg-danger-200',
    },
    {
      variant: 'ghost',
      type: 'warning',
      class: 'text-warning-600 hover:bg-warning-100 active:bg-warning-200',
    },
    {
      variant: 'ghost',
      type: 'success',
      class: 'text-success-600 hover:bg-success-100 active:bg-success-200',
    },
    {
      variant: 'ghost',
      type: 'info',
      class: 'text-info-600 hover:bg-info-100 active:bg-info-200',
    },
    {
      variant: 'tertiary',
      type: 'neutral',
      class:
        'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 active:bg-neutral-400',
    },
    {
      variant: 'tertiary',
      type: 'primary',
      class:
        'bg-primary-100 text-primary-600 hover:bg-primary-200 active:bg-primary-300',
    },
    {
      variant: 'tertiary',
      type: ['danger', 'error'],
      class:
        'bg-danger-100 text-danger-600 hover:bg-danger-200 active:bg-danger-300',
    },
    {
      variant: 'tertiary',
      type: 'warning',
      class:
        'bg-warning-100 text-warning-600 hover:bg-warning-200 active:bg-warning-300',
    },
    {
      variant: 'tertiary',
      type: 'success',
      class:
        'bg-success-100 text-success-600 hover:bg-success-200 active:bg-success-300',
    },
    {
      variant: 'tertiary',
      type: 'info',
      class: 'bg-info-100 text-info-600 hover:bg-info-200 active:bg-info-300',
    },
  ] as any,
};

const css = computed(() => {
  _css.variants.rounded.false = getHeartRoundedValue(buttonSize.value);
  return tv({ extend: tv(_css), ...props.ui });
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>
