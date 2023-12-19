<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="css?.root ?? globalCss.button.root"
  >
    <slot name="prefix">
      <HIcon v-if="prefixIcon" :class="css?.prefix ?? globalCss.button.prefix">
        <component :is="prefixIcon" />
      </HIcon>
    </slot>
    <slot />
    <slot name="suffix">
      <HIcon v-if="suffixIcon" :class="css?.suffix ?? globalCss.button.suffix">
        <component :is="suffixIcon" />
      </HIcon>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { Component } from "vue";
import { CssEntry, globalCss } from "../common";
import HIcon from "./HIcon.vue";

export type ButtonCssProp = {
  root: CssEntry;
  prefix: CssEntry;
  suffix: CssEntry;
};

defineOptions({ name: "HButton", components: { HIcon } });

withDefaults(
  defineProps<{
    tag: string | Component;
    nativeType: string;
    prefixIcon?: Component;
    suffixIcon?: Component;
    css?: ButtonCssProp;
  }>(),
  {
    tag: "button",
    nativeType: "button",
  }
);
</script>
