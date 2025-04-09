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
export interface SkeletonProps {
  rows?: number;
  animation?: boolean;
  loading?: boolean;
}

export interface SkeletonSlots {
  default(props?: object): void;
  template(props?: object): void;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  rows: 3,
  animation: true,
  loading: true,
});

provide(SKELETON_KEY, { animation: toRef(() => props.animation) });
</script>
