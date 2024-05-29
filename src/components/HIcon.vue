<template>
  <Icon v-bind="$props" />
</template>

<script setup lang="ts">
import { Icon, IconProps } from "@iconify/vue";

// Options, Props and Emits

defineOptions({ name: "HIcon" });
defineProps<IconProps>();
</script>
