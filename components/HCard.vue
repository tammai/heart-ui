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
    body: '',
    header: 'border-b border-neutral-200',
    footer: 'border-t border-neutral-200',
  },
  variants: {
    clickable: {
      true: 'hover:ring-primary-600 hover:cursor-pointer hover:border-transparent',
    },
  },
};

const css = computed(() => {
  const size = props.size ?? appConfig.heart.size;
  const padding = (size === 'sm' && 'p-2') || (size === 'lg' && 'p-6') || 'p-4';
  const rounded =
    (size === 'sm' && 'rounded-md') ||
    (size === 'lg' && 'rounded-xl') ||
    'rounded-lg';

  _css.base = `${_css.base} ${rounded}`;
  _css.slots.body = `${_css.slots.body} ${padding}`;
  _css.slots.header = `${_css.slots.header} ${padding}`;
  _css.slots.footer = `${_css.slots.footer} ${padding}`;

  return tv({ extend: tv(_css), ...props.ui });
});
</script>
