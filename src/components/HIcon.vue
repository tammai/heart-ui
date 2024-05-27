<template>
  <Icon :icon="icon" :mode="mode" :color="color" :flip="flip" />
</template>

<script setup lang="ts">
import { Icon, IconifyIcon, IconifyRenderMode } from "@iconify/vue";

// Options, Props and Emits

defineOptions({ name: "HIcon" });
defineProps<{
  icon: IconifyIcon | string;
  mode?: IconifyRenderMode;
  color?: string;
  flip?: string;
}>();
</script>
