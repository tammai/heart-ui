<template>
  <div class="flex flex-col" :style="style">
    <div v-if="$slots.header" class="h-[var(--h-header-height)]">
      <slot name="header" />
    </div>
    <div :class="['grow w-full', { flex: $slots.aside }]">
      <div v-if="$slots.aside" class="min-w-[var(--h-aside-width)]">
        <slot name="aside" />
      </div>
      <div class="w-full" :class="bodyClass">
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" class="h-[var(--h-footer-height)]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    asideWidth?: number | string;
    headerHeight?: number | string;
    footerHeight?: number | string;
    bodyClass?: CssClass;
  }>(),
  {
    headerHeight: 64,
    footerHeight: 64,
    asideWidth: 240,
    bodyClass: "",
  }
);

const style = computed(() => {
  return {
    "--h-header-height": addUnit(props.headerHeight),
    "--h-footer-height": addUnit(props.footerHeight),
    "--h-aside-width": addUnit(props.asideWidth),
  };
});
</script>
