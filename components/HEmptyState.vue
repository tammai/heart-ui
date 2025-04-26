<template>
  <div :class="css().base()">
    <slot name="image" :css="css().image()">
      <HEmptyStateImage :class="css().image()" />
    </slot>
    <div :class="css().body()">
      <slot>
        <h5 v-if="title" :class="css().title()">{{ title }}</h5>
        <p :class="css().message()">{{ messageWithDefault }}</p>
      </slot>
    </div>
    <slot name="action" />
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

const props = defineProps<EmptyStateProps>();

const _css = {
  base: 'flex flex-col items-center justify-center gap-6 w-full p-10 text-center',
  slots: {
    body: 'flex flex-col items-center gap-1',
    image: 'h-40',
    title: '',
    message: 'text-neutral-600',
  },
};
const css = computed(() => tv({ extend: tv(_css), ...props.ui }));

const messageWithDefault = computed(
  () => props.message ?? getHeartConfig('message.nodata'),
);
</script>
