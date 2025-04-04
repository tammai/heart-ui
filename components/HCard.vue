<template>
  <div :class="css({ clickable }).base()">
    <div v-if="$slots.header" :class="css().header()">
      <slot name="header" />
    </div>
    <div :class="css().body()">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="css().footer()">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface CardSlots {
  default(props?: object): void;
  header(props?: object): void;
  footer(props?: object): void;
}

export interface CardProps {
  size?: SizeVariant;
  clickable?: boolean;
  ui?: DeepPartial<typeof _css>;
}

type SizeVariant = 'sm' | 'md' | 'lg';

const props = defineProps<CardProps>();

defineSlots<CardSlots>();

const appConfig = useAppConfig();

const _css = {
  base: 'overflow-hidden border border-neutral-200 bg-white ring-2 ring-transparent transition-all',
  slots: {
    body: 'px-4 py-3',
    header: 'rounded-t-xl border-b border-neutral-200 px-4 py-3',
    footer: 'rounded-b-xl border-t border-neutral-200 px-4 py-3',
  },
  variants: {
    clickable: {
      true: 'hover:ring-primary-600 hover:cursor-pointer hover:border-transparent',
    },
  },
};

const sizeClass = computed(() => {
  const size = props.size ?? appConfig.heart.size;

  return (
    (size === 'sm' && 'rounded-md') ||
    (size === 'lg' && 'rounded-xl') ||
    'rounded-lg'
  );
});

const paddingClass = computed(() => {
  const size = props.size ?? appConfig.heart.size;

  return (size === 'sm' && 'p-2') || (size === 'lg' && 'p-6') || 'p-4';
});

const css = computed(() => {
  const computedCss = { ..._css };
  computedCss.base = `${computedCss.base} ${sizeClass.value}`;
  computedCss.slots.body = `${computedCss.slots.body} ${paddingClass.value}`;
  computedCss.slots.header = `${computedCss.slots.header} ${paddingClass.value}`;
  computedCss.slots.footer = `${computedCss.slots.footer} ${paddingClass.value}`;
  return tv({ extend: tv(computedCss), ...props.ui });
});
</script>
