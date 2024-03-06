<template>
  <i :style="computedStyle" :class="css?.root ?? globalCss.icon.root">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { CSSProperties, computed } from "vue";
import { CssEntry, globalCss } from "../common/index";

export type IconCssProp = {
  root?: CssEntry;
};

defineOptions({ name: "HIcon" });

const props = withDefaults(
  defineProps<{
    size: number;
    css?: IconCssProp;
  }>(),
  { size: 24 }
);

const computedStyle = computed<CSSProperties>(() => ({
  fontSize: props.size + 'px',
  lineHeight: props.size + 'px',
  width: props.size + 'px',
  height: props.size + 'px',
  minWidth: props.size + 'px',
}));
</script>
