<template>
  <div :class="css">
    <Icon
      v-if="variant === 'avatar'"
      :name="icons.avatar"
      :size="iconSize ?? 24"
    />
    <Icon
      v-if="variant === 'image'"
      :name="icons.image"
      :size="iconSize ?? 40"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Reactive } from 'vue';
import type { SkeletonContext } from './HSkeleton.vue';
import { SKELETON_CONTEXT_KEY } from '../constants';

export interface SkeletonItemProps {
  variant?: 'rect' | 'circle' | 'heading' | 'text' | 'image' | 'avatar';
  iconSize?: number;
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text',
});

const skeleton = inject<Reactive<SkeletonContext>>(SKELETON_CONTEXT_KEY, {});

const icons = computed(() => ({
  image: getHeartConfig('icon.image') ?? 'fluent:image-32-regular',
  avatar: getHeartConfig('icon.avatar') ?? 'fluent:person-24-regular',
}));

const css = computed(() => {
  if (skeleton.css) {
    return skeleton?.css({
      variant: props.variant,
      animation: skeleton?.animation,
      hasIcon: ['image', 'avatar'].includes(props.variant),
    });
  }

  return '';
});
</script>
