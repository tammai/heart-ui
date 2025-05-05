<template>
  <template v-if="loading">
    <slot name="template">
      <div class="flex flex-col gap-3">
        <HSkeletonItem variant="heading" :animation="animation" class="w-1/3" />
        <HSkeletonItem
          v-for="i in rows"
          :key="i"
          variant="text"
          :animation="animation"
          :class="i === rows ? 'w-1/2' : 'w-full'"
        />
      </div>
    </slot>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';
import type { Reactive } from 'vue';
import { SKELETON_CONTEXT_KEY } from '../constants';

export interface SkeletonProps {
  rows?: number;
  animation?: boolean;
  loading?: boolean;
  ui?: DeepPartial<typeof ui>;
}

export interface SkeletonSlots {
  default(props?: object): void;
  template(props?: object): void;
}

export interface SkeletonContext {
  css?: (config: any) => string;
  animation?: boolean;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  rows: 3,
  animation: true,
  loading: true,
});

const ui = {
  base: 'bg-neutral-300',
  variants: {
    variant: {
      rect: 'rounded h-3',
      circle: 'rounded-full',
      heading: 'rounded-full h-3',
      text: 'rounded-full h-2',
      image: 'rounded size-50',
      avatar: 'rounded-full size-12',
    },
    animation: {
      true: 'animate-pulse',
    },
    hasIcon: {
      true: 'flex flex-col items-center justify-center text-neutral-400',
    },
  },
};

provide<Reactive<SkeletonContext>>(
  SKELETON_CONTEXT_KEY,
  reactive({
    animation: props.animation,
    css: tv({
      extend: tv(ui),
      ...useHeartTheme<typeof ui>('skeleton', props.ui),
    }),
  }),
);
</script>
