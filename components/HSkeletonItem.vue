<template>
  <div :class="css">
    <Icon
      v-if="variant === 'image'"
      name="fluent:image-32-regular"
      :size="iconSize ?? 40"
    />
    <Icon
      v-if="variant === 'avatar'"
      name="fluent:person-24-regular"
      :size="iconSize ?? 24"
    />
  </div>
</template>

<script lang="ts" setup>
export interface SkeletonItemProps {
  variant?: 'rect' | 'circle' | 'heading' | 'text' | 'image' | 'avatar';
  iconSize?: number;
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text',
});

const css = computed(() => {
  const { variant } = props;
  const { animation } = inject<{ animation: Ref<boolean> }>(SKELETON_KEY, {
    animation: ref(true),
  });

  return {
    'bg-neutral-300': true,
    rounded: ['rect', 'image'].includes(variant),
    'rounded-full': ['circle', 'avatar', 'heading', 'text'].includes(variant),
    'flex flex-col items-center justify-center text-neutral-400': [
      'image',
      'avatar',
    ].includes(variant),
    'h-3': variant === 'heading',
    'h-2': variant === 'text',
    'size-50': variant === 'image',
    'size-12': ['circle', 'avatar'].includes(variant),
    'animate-pulse': animation.value,
  };
});
</script>
