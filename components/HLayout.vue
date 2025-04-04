<template>
  <div :class="css().base()" :style="style">
    <div v-if="$slots.top" :class="css().top()">
      <slot name="top" />
    </div>
    <div
      :class="
        css({ isMultiColumn: Boolean($slots.left || $slots.right) }).body()
      "
    >
      <div v-if="$slots.left" :class="css().left()">
        <slot name="left" />
      </div>
      <div :class="css().main()">
        <slot />
      </div>
      <div v-if="$slots.right" :class="css().right()">
        <slot name="right" />
      </div>
    </div>
    <div v-if="$slots.bottom" :class="css().bottom()">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface LayoutProps {
  slotSizes?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  ui?: DeepPartial<typeof _css>;
}

export interface LayoutSlots {
  default(props?: object): void;
  top(props?: object): void;
  right(props?: object): void;
  bottom(props?: object): void;
  left(props?: object): void;
}

const props = withDefaults(defineProps<LayoutProps>(), {
  slotSizes: () => ({
    top: 64,
    right: 240,
    bottom: 64,
    left: 240,
  }),
  ui: () => ({}),
});

defineSlots<LayoutSlots>();

const _css = {
  base: 'flex flex-col',
  slots: {
    body: 'grow w-full',
    main: 'w-full',
    top: 'h-[var(--h-layout-top-size)]',
    right: 'min-w-[var(--h-layout-right-size)]',
    bottom: 'h-[var(--h-layout-bottom-size)]',
    left: 'min-w-[var(--h-layout-left-size)]',
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

  for (const [key, value] of Object.entries(props.slotSizes)) {
    _style[`--h-layout-${key}-size`] = addUnit(value);
  }

  return _style;
});
</script>
