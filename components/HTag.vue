<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
  >
    <div
      v-show="visible"
      :class="css({ size: tagSize, color, effect, rounded: tagRounded }).base()"
    >
      <slot />
      <Icon v-if="removable" :name="removeIcon" @click="handleRemove" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { ComponentSize, DeepPartial } from '../types/heart';
export type TagColorVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export type TagEffectVariant = 'dark' | 'light';

export interface TagProps {
  size?: ComponentSize;
  color?: TagColorVariant;
  effect?: TagEffectVariant;
  title?: string;
  message?: string;
  removable?: boolean;
  ui?: DeepPartial<typeof _css>;
}

const props = defineProps<TagProps>();
const emit = defineEmits<{ (event: 'remove'): void }>();

const visible = ref(true);

const tagSize = computed(() => {
  return props.size ?? getHeartConfig('size') ?? 'md';
});

const tagRounded = computed(() => {
  return getHeartConfig('rounded') ?? true;
});

const removeIcon = computed(() => {
  return getHeartConfig('icon.close');
});

const _css = {
  slots: {
    base: 'inline-flex items-center border font-medium transition-all duration-500',
    transitionLeave: 'opacity-0 scale-95',
    transitionEnter: 'opacity-100 scale-100',
  },
  variants: {
    size: {
      sm: 'text-[0.625rem] px-1.5 h-5',
      md: 'text-xs px-2 h-6',
      lg: 'text-sm px-3 h-7',
    },
    color: {
      neutral: '',
      primary: '',
      success: '',
      danger: '',
      info: '',
      warning: '',
      red: '',
      orange: '',
      amber: '',
      yellow: '',
      lime: '',
      green: '',
      emerald: '',
      teal: '',
      cyan: '',
      sky: '',
      blue: '',
      indigo: '',
      violet: '',
      purple: '',
      fuchsia: '',
      pink: '',
      rose: '',
    },
    effect: {
      light: '',
      dark: '',
    },
    rounded: { true: 'rounded-full' },
  },
  compoundVariants: [
    {
      effect: 'dark',
      color: 'neutral',
      class: 'bg-neutral-700 border-neutral-800 text-neutral-50',
    },
    {
      effect: 'dark',
      color: 'primary',
      class: 'bg-primary-700 border-primary-800 text-primary-50',
    },
    {
      effect: 'dark',
      color: 'success',
      class: 'bg-success-700 border-success-800 text-success-50',
    },
    {
      effect: 'dark',
      color: 'danger',
      class: 'bg-danger-700 border-danger-800 text-danger-50',
    },
    {
      effect: 'dark',
      color: 'info',
      class: 'bg-info-700 border-info-800 text-info-50',
    },
    {
      effect: 'dark',
      color: 'warning',
      class: 'bg-warning-700 border-warning-800 text-warning-50',
    },
    {
      effect: 'dark',
      color: 'red',
      class: 'bg-red-700 border-red-800 text-red-50',
    },
    {
      effect: 'dark',
      color: 'orange',
      class: 'bg-orange-700 border-orange-800 text-orange-50',
    },
    {
      effect: 'dark',
      color: 'amber',
      class: 'bg-amber-700 border-amber-800 text-amber-50',
    },
    {
      effect: 'dark',
      color: 'yellow',
      class: 'bg-yellow-700 border-yellow-800 text-yellow-50',
    },
    {
      effect: 'dark',
      color: 'lime',
      class: 'bg-lime-700 border-lime-800 text-lime-50',
    },
    {
      effect: 'dark',
      color: 'green',
      class: 'bg-green-700 border-green-800 text-green-50',
    },
    {
      effect: 'dark',
      color: 'emerald',
      class: 'bg-emerald-700 border-emerald-800 text-emerald-50',
    },
    {
      effect: 'dark',
      color: 'teal',
      class: 'bg-teal-700 border-teal-800 text-teal-50',
    },
    {
      effect: 'dark',
      color: 'cyan',
      class: 'bg-cyan-700 border-cyan-800 text-cyan-50',
    },
    {
      effect: 'dark',
      color: 'sky',
      class: 'bg-sky-700 border-sky-800 text-sky-50',
    },
    {
      effect: 'dark',
      color: 'blue',
      class: 'bg-blue-700 border-blue-800 text-blue-50',
    },
    {
      effect: 'dark',
      color: 'indigo',
      class: 'bg-indigo-700 border-indigo-800 text-indigo-50',
    },
    {
      effect: 'dark',
      color: 'violet',
      class: 'bg-violet-700 border-violet-800 text-violet-50',
    },
    {
      effect: 'dark',
      color: 'purple',
      class: 'bg-purple-700 border-purple-800 text-purple-50',
    },
    {
      effect: 'dark',
      color: 'fuchsia',
      class: 'bg-fuchsia-700 border-fuchsia-800 text-fuchsia-50',
    },
    {
      effect: 'dark',
      color: 'pink',
      class: 'bg-pink-700 border-pink-800 text-pink-50',
    },
    {
      effect: 'dark',
      color: 'rose',
      class: 'bg-rose-700 border-rose-800 text-rose-50',
    },
    {
      effect: 'light',
      color: 'neutral',
      class: 'bg-neutral-200 border-neutral-300 text-neutral-700',
    },
    {
      effect: 'light',
      color: 'primary',
      class: 'bg-primary-200 border-primary-300 text-primary-700',
    },
    {
      effect: 'light',
      color: 'success',
      class: 'bg-success-200 border-success-300 text-success-700',
    },
    {
      effect: 'light',
      color: 'danger',
      class: 'bg-danger-200 border-danger-300 text-danger-700',
    },
    {
      effect: 'light',
      color: 'info',
      class: 'bg-info-200 border-info-300 text-info-700',
    },
    {
      effect: 'light',
      color: 'warning',
      class: 'bg-warning-200 border-warning-300 text-warning-700',
    },
    {
      effect: 'light',
      color: 'red',
      class: 'bg-red-200 border-red-300 text-red-700',
    },
    {
      effect: 'light',
      color: 'orange',
      class: 'bg-orange-200 border-orange-300 text-orange-700',
    },
    {
      effect: 'light',
      color: 'amber',
      class: 'bg-amber-200 border-amber-300 text-amber-700',
    },
    {
      effect: 'light',
      color: 'yellow',
      class: 'bg-yellow-200 border-yellow-300 text-yellow-700',
    },
    {
      effect: 'light',
      color: 'lime',
      class: 'bg-lime-200 border-lime-300 text-lime-700',
    },
    {
      effect: 'light',
      color: 'green',
      class: 'bg-green-200 border-green-300 text-green-700',
    },
    {
      effect: 'light',
      color: 'emerald',
      class: 'bg-emerald-200 border-emerald-300 text-emerald-700',
    },
    {
      effect: 'light',
      color: 'teal',
      class: 'bg-teal-200 border-teal-300 text-teal-700',
    },
    {
      effect: 'light',
      color: 'cyan',
      class: 'bg-cyan-200 border-cyan-300 text-cyan-700',
    },
    {
      effect: 'light',
      color: 'sky',
      class: 'bg-sky-200 border-sky-300 text-sky-700',
    },
    {
      effect: 'light',
      color: 'blue',
      class: 'bg-blue-200 border-blue-300 text-blue-700',
    },
    {
      effect: 'light',
      color: 'indigo',
      class: 'bg-indigo-200 border-indigo-300 text-indigo-700',
    },
    {
      effect: 'light',
      color: 'violet',
      class: 'bg-violet-200 border-violet-300 text-violet-700',
    },
    {
      effect: 'light',
      color: 'purple',
      class: 'bg-purple-200 border-purple-300 text-purple-700',
    },
    {
      effect: 'light',
      color: 'fuchsia',
      class: 'bg-fuchsia-200 border-fuchsia-300 text-fuchsia-700',
    },
    {
      effect: 'light',
      color: 'pink',
      class: 'bg-pink-200 border-pink-300 text-pink-700',
    },
    {
      effect: 'light',
      color: 'rose',
      class: 'bg-rose-200 border-rose-300 text-rose-700',
    },
  ] as any,
  defaultVariants: {
    size: 'md',
    color: 'neutral',
    effect: 'light',
  } as any,
};
const css = computed(() => {
  _css.slots.base = `${_css.slots.base} ${getHeartRoundedValue('md')}`;
  return tv({ extend: tv(_css), ...props.ui });
});

const handleRemove = () => {
  visible.value = false;
  emit('remove');
};
</script>
