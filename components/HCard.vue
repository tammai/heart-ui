<template>
  <div :class="css({ size: cardSize, clickable }).base()">
    <div v-if="$slots.header" :class="css({ size: cardSize }).header()">
      <slot name="header" />
    </div>
    <div :class="css({ size: cardSize }).body()">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="css({ size: cardSize }).footer()">
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
  ui?: DeepPartial<typeof ui>;
}

type SizeVariant = 'sm' | 'md' | 'lg';

const props = defineProps<CardProps>();

defineSlots<CardSlots>();

const ui = {
  slots: {
    base: 'overflow-hidden border border-neutral-200 bg-white ring-2 ring-transparent transition-all',
    body: '',
    header: 'border-b border-neutral-200',
    footer: 'border-t border-neutral-200',
  },
  variants: {
    size: {
      sm: { body: 'p-2', header: 'p-2', footer: 'p-2' },
      md: { body: 'p-4', header: 'p-4', footer: 'p-4' },
      lg: { body: 'p-6', header: 'p-6', footer: 'p-6' },
    },
    clickable: {
      true: 'hover:ring-primary-600 hover:cursor-pointer hover:border-transparent',
    },
  },
};

const cardSize = computed(() => props.size ?? getHeartConfig('size') ?? 'md');

const css = computed(() => {
  ui.slots.base = `${ui.slots.base} ${getHeartRoundedValue(cardSize.value)}`;
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('card', props.ui),
  });
});
</script>
