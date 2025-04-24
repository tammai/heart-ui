<template>
  <div :class="css().base()">
    <slot name="image" :css="css().image()">
      <HEmptyStateImage :class="css().image()" />
    </slot>
    <div>
      <slot>
        <h4 v-if="title" :class="css().title()">{{ title }}</h4>
        <p :class="css().message()">{{ messageWithDefault }}</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';
export interface EmptyStateProps {
  imageSrc?: string;
  title?: string;
  message?: string;
  ui?: DeepPartial<typeof _css>;
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  imageSrc: '/empty.svg',
});

const _css = {
  base: 'flex flex-col items-center justify-center w-full p-10 text-center',
  slots: {
    image: 'h-30',
    title: '',
    message: 'text-neutral-600',
  },
};
const css = computed(() => tv({ extend: tv(_css), ...props.ui }));

const messageWithDefault = computed(
  () => props.message ?? getHeartConfig('message.nodata'),
);
</script>
