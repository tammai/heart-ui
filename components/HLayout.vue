<template>
  <div :class="css().base()" :style="style">
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
import type { CSSProperties } from 'vue';
import { useHeartTheme } from '../composables/heart';

export interface LayoutProps {
  slotSizes?: {
    header?: string | number;
    footer?: string | number;
    aside?: string | number;
  };
  ui?: DeepPartial<typeof ui>;
}

export interface LayoutSlots {
  default(props?: object): void;
  header(props?: object): void;
  footer(props?: object): void;
}

const props = withDefaults(defineProps<LayoutProps>(), {
  slotSizes: () => ({
    header: 64,
    footer: 64,
    aside: 240,
  }),
});

const slots = defineSlots<LayoutSlots>();

const ui = {
  base: 'flex flex-col',
  slots: {
    body: 'flex grow w-full min-w-0',
    header: 'h-[var(--h-layout-header-size)]',
    footer: 'h-[var(--h-layout-footer-size)]',
  },
};

const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('layout', props.ui),
  });
});

const style = computed(() => {
  const _style: CSSProperties = {};
  const { header, footer, aside } = props.slotSizes;
  const _slotSizes = {
    header: header ?? 64,
    footer: footer ?? 64,
    aside: aside ?? 240,
  };

  Object.keys(props.slotSizes).forEach((key) => {
    _style[`--h-layout-${formatCssVariableName(key)}-size`] = addUnit(
      _slotSizes[key as keyof typeof _slotSizes],
    );
  });

  return _style;
});
</script>
