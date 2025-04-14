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
import type { SkeletonContext } from './HSkeleton.vue';

export interface SkeletonItemProps {
  variant?: 'rect' | 'circle' | 'heading' | 'text' | 'image' | 'avatar';
  iconSize?: number;
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text',
});

const skeletonContext = inject<SkeletonContext | null>(
  SKELETON_CONTEXT_KEY,
  null,
);

const icons = computed(() => ({
  image: getHeartConfig('icon.image') ?? 'fluent:image-32-regular',
  avatar: getHeartConfig('icon.avatar') ?? 'fluent:person-24-regular',
}));

const css = computed(() => {
  return skeletonContext?.css({
    variant: props.variant,
    animation: skeletonContext?.animation?.value,
    hasIcon: ['image', 'avatar'].includes(props.variant),
  });
});
</script>
