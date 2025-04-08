<template>
  <div :class="css().base()" :style="style">
    <div v-if="$slots.header" :class="css().header()">
      <slot name="header" />
    </div>
    <div
      :class="
        css({
          isMultiColumn: Boolean($slots.asideLeft || $slots.asideRight),
        }).body()
      "
    >
      <div v-if="$slots.asideLeft" :class="css().asideLeft()">
        <slot name="asideLeft" />
      </div>

      <div :class="css().main()">
        <slot />
      </div>
      <div v-if="$slots.asideRight" :class="css().asideRight()">
        <slot name="asideRight" />
      </div>
    </div>
    <div v-if="$slots.footer" :class="css().footer()">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface LayoutProps {
  slotSizes?: {
    header?: string | number;
    footer?: string | number;
    asideLeft?: string | number;
    asideRight?: string | number;
  };
  ui?: DeepPartial<typeof _css>;
}

export interface LayoutSlots {
  default(props?: object): void;
  header(props?: object): void;
  footer(props?: object): void;
  asideRight(props?: object): void;
  asideLeft(props?: object): void;
}

const props = withDefaults(defineProps<LayoutProps>(), {
  slotSizes: () => ({
    header: 64,
    footer: 64,
    asideLeft: 240,
    asideRight: 240,
  }),
  ui: () => ({}),
});

const slots = defineSlots<LayoutSlots>();

const _css = {
  base: 'flex flex-col',
  slots: {
    body: 'grow w-full',
    main: 'w-full',
    header: 'h-[var(--h-layout-header-size)]',
    footer: 'h-[var(--h-layout-footer-size)]',
    asideRight: 'min-w-[var(--h-layout-aside-right-size)]',
    asideLeft: 'min-w-[var(--h-layout-aside-left-size)]',
  },
  variants: {
    isMultiColumn: {
      true: {
        body: 'flex',
      },
    },
  },
};

const css = computed(() =>
  tv({
    extend: tv(_css),
    ...props.ui,
  }),
);

const style = computed(() => {
  const _style: { [x: string]: string } = {};
  const { header, footer, asideLeft, asideRight } = props.slotSizes;
  const _slotSizes = {
    header: header ?? 64,
    footer: footer ?? 64,
    asideLeft: asideLeft ?? 240,
    asideRight: asideRight ?? 240,
  };

  Object.keys(useSlots()).forEach((key) => {
    _style[`--h-layout-${formatCssVariableName(key)}-size`] = addUnit(
      _slotSizes[key as keyof typeof _slotSizes],
    );
  });

  return _style;
});
</script>
