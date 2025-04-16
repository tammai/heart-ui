<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
  >
    <div
      v-show="visible"
      :class="
        css({
          size: tagSize,
          color,
          effect,
          rounded: tagRounded,
          disabled,
        }).base()
      "
    >
      <slot />
      <div
        v-if="removable"
        :class="css({ size: tagSize, rounded: tagRounded }).icon()"
        @click="handleRemove"
      >
        <Icon :name="removeIcon" />
      </div>
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
  | 'error'
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

export type TagEffectVariant = 'dark' | 'light' | 'plain';

export interface TagProps {
  size?: ComponentSize;
  color?: TagColorVariant;
  effect?: TagEffectVariant;
  title?: string;
  message?: string;
  removable?: boolean;
  disabled?: boolean;
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
    icon: 'flex hover:bg-black/10 rounded-full p-0.5 transition-all cursor-pointer',
    transitionLeave: 'opacity-0 scale-95',
    transitionEnter: 'opacity-100 scale-100',
  },
  variants: {
    size: {
      sm: { base: 'text-[0.625rem] px-1.5 h-5 gap-0.5', icon: '-mr-0.75' },
      md: { base: 'text-xs px-2 h-6 gap-0.75', icon: '-mr-1.25' },
      lg: { base: 'text-sm px-3 h-7 gap-1', icon: '-mr-1.75' },
    },
    color: {
      neutral: 'text-neutral-700 border-neutral-500',
      primary: 'text-primary-600 border-primary-400',
      success: 'text-success-600 border-success-400',
      danger: 'text-danger-600 border-danger-400',
      error: 'text-danger-600 border-danger-400',
      info: 'text-info-600 border-info-400',
      warning: 'text-warning-600 border-warning-400',
      red: 'text-red-600 border-red-400',
      orange: 'text-orange-600 border-orange-400',
      amber: 'text-amber-600 border-amber-400',
      yellow: 'text-yellow-600 border-yellow-400',
      lime: 'text-lime-600 border-lime-400',
      green: 'text-green-600 border-green-400',
      emerald: 'text-emerald-600 border-emerald-400',
      teal: 'text-teal-600 border-teal-400',
      cyan: 'text-cyan-600 border-cyan-400',
      sky: 'text-sky-600 border-sky-400',
      blue: 'text-blue-600 border-blue-400',
      indigo: 'text-indigo-600 border-indigo-400',
      violet: 'text-violet-600 border-violet-400',
      purple: 'text-purple-600 border-purple-400',
      fuchsia: 'text-fuchsia-600 border-fuchsia-400',
      pink: 'text-pink-600 border-pink-400',
      rose: 'text-rose-600 border-rose-400',
    },
    effect: {
      plain: '',
      light: '',
      dark: '',
    },
    rounded: { true: { base: 'rounded-full', icon: 'rounded-full' } },
    disabled: {
      true: 'opacity-50 select-none',
    },
  },
  compoundVariants: [
    {
      effect: 'dark',
      color: 'neutral',
      class: 'bg-neutral-600 border-neutral-600 text-neutral-50',
    },
    {
      effect: 'dark',
      color: 'primary',
      class: 'bg-primary-600 border-primary-600 text-primary-50',
    },
    {
      effect: 'dark',
      color: 'success',
      class: 'bg-success-600 border-success-600 text-success-50',
    },
    {
      effect: 'dark',
      color: ['danger', 'error'],
      class: 'bg-danger-600 border-danger-600 text-danger-50',
    },
    {
      effect: 'dark',
      color: 'info',
      class: 'bg-info-600 border-info-600 text-info-50',
    },
    {
      effect: 'dark',
      color: 'warning',
      class: 'bg-warning-600 border-warning-600 text-warning-50',
    },
    {
      effect: 'dark',
      color: 'red',
      class: 'bg-red-600 border-red-600 text-red-50',
    },
    {
      effect: 'dark',
      color: 'orange',
      class: 'bg-orange-600 border-orange-600 text-orange-50',
    },
    {
      effect: 'dark',
      color: 'amber',
      class: 'bg-amber-600 border-amber-600 text-amber-50',
    },
    {
      effect: 'dark',
      color: 'yellow',
      class: 'bg-yellow-600 border-yellow-600 text-yellow-50',
    },
    {
      effect: 'dark',
      color: 'lime',
      class: 'bg-lime-600 border-lime-600 text-lime-50',
    },
    {
      effect: 'dark',
      color: 'green',
      class: 'bg-green-600 border-green-600 text-green-50',
    },
    {
      effect: 'dark',
      color: 'emerald',
      class: 'bg-emerald-600 border-emerald-600 text-emerald-50',
    },
    {
      effect: 'dark',
      color: 'teal',
      class: 'bg-teal-600 border-teal-600 text-teal-50',
    },
    {
      effect: 'dark',
      color: 'cyan',
      class: 'bg-cyan-600 border-cyan-600 text-cyan-50',
    },
    {
      effect: 'dark',
      color: 'sky',
      class: 'bg-sky-600 border-sky-600 text-sky-50',
    },
    {
      effect: 'dark',
      color: 'blue',
      class: 'bg-blue-600 border-blue-600 text-blue-50',
    },
    {
      effect: 'dark',
      color: 'indigo',
      class: 'bg-indigo-600 border-indigo-600 text-indigo-50',
    },
    {
      effect: 'dark',
      color: 'violet',
      class: 'bg-violet-600 border-violet-600 text-violet-50',
    },
    {
      effect: 'dark',
      color: 'purple',
      class: 'bg-purple-600 border-purple-600 text-purple-50',
    },
    {
      effect: 'dark',
      color: 'fuchsia',
      class: 'bg-fuchsia-600 border-fuchsia-600 text-fuchsia-50',
    },
    {
      effect: 'dark',
      color: 'pink',
      class: 'bg-pink-600 border-pink-600 text-pink-50',
    },
    {
      effect: 'dark',
      color: 'rose',
      class: 'bg-rose-600 border-rose-600 text-rose-50',
    },
    {
      effect: 'light',
      color: 'neutral',
      class: 'bg-neutral-200 border-neutral-300',
    },
    {
      effect: 'light',
      color: 'primary',
      class: 'bg-primary-100 border-primary-200',
    },
    {
      effect: 'light',
      color: 'success',
      class: 'bg-success-100 border-success-200',
    },
    {
      effect: 'light',
      color: ['danger', 'error'],
      class: 'bg-danger-100 border-danger-200',
    },
    {
      effect: 'light',
      color: 'info',
      class: 'bg-info-100 border-info-200',
    },
    {
      effect: 'light',
      color: 'warning',
      class: 'bg-warning-100 border-warning-200',
    },
    {
      effect: 'light',
      color: 'red',
      class: 'bg-red-100 border-red-200',
    },
    {
      effect: 'light',
      color: 'orange',
      class: 'bg-orange-100 border-orange-200',
    },
    {
      effect: 'light',
      color: 'amber',
      class: 'bg-amber-100 border-amber-200',
    },
    {
      effect: 'light',
      color: 'yellow',
      class: 'bg-yellow-100 border-yellow-200',
    },
    {
      effect: 'light',
      color: 'lime',
      class: 'bg-lime-100 border-lime-200',
    },
    {
      effect: 'light',
      color: 'green',
      class: 'bg-green-100 border-green-200',
    },
    {
      effect: 'light',
      color: 'emerald',
      class: 'bg-emerald-100 border-emerald-200',
    },
    {
      effect: 'light',
      color: 'teal',
      class: 'bg-teal-100 border-teal-200',
    },
    {
      effect: 'light',
      color: 'cyan',
      class: 'bg-cyan-100 border-cyan-200',
    },
    {
      effect: 'light',
      color: 'sky',
      class: 'bg-sky-100 border-sky-200',
    },
    {
      effect: 'light',
      color: 'blue',
      class: 'bg-blue-100 border-blue-200',
    },
    {
      effect: 'light',
      color: 'indigo',
      class: 'bg-indigo-100 border-indigo-200',
    },
    {
      effect: 'light',
      color: 'violet',
      class: 'bg-violet-100 border-violet-200',
    },
    {
      effect: 'light',
      color: 'purple',
      class: 'bg-purple-100 border-purple-200',
    },
    {
      effect: 'light',
      color: 'fuchsia',
      class: 'bg-fuchsia-100 border-fuchsia-200',
    },
    {
      effect: 'light',
      color: 'pink',
      class: 'bg-pink-100 border-pink-200',
    },
    {
      effect: 'light',
      color: 'rose',
      class: 'bg-rose-100 border-rose-200',
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
