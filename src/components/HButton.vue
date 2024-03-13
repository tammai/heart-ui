<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="[
      css?.root ?? theme.css.button.root,
      computedCssClass,
      disabled ? css?.disabled ?? theme.css.button.disabled : '',
      loading ? 'relative pointer-events-none' : '',
    ]"
    :disabled="disabled || loading"
  >
    <slot name="prefix">
      <Icon
        v-if="icons?.prefix"
        :class="[
          css?.prefix ?? theme.css.button.prefix,
          { invisible: loading },
          'text-[1.5em]',
        ]"
        :icon="icons.prefix"
      />
    </slot>

    <span :class="[css?.text ?? theme.css.button.text, { invisible: loading }]">
      <slot />
    </span>
    <slot name="suffix">
      <Icon
        v-if="icons?.suffix"
        :class="[
          css?.suffix ?? theme.css.button.suffix,
          { invisible: loading },
          'text-[1.5em]',
        ]"
        :icon="icons.suffix"
      />
    </slot>
    <slot v-if="loading" name="loading">
      <div :class="[css?.loading ?? theme.css.button.loading]">
        <Icon :icon="computedLoadingIcon" class="text-[1.5em]" />
      </div>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { Component, computed } from "vue";
import { Icon } from "@iconify/vue";
import { CssEntry } from "../common";
import { useTheme } from "..";

// Types

export type ButtonCssProp = {
  root?: CssEntry;
  prefix?: CssEntry;
  suffix?: CssEntry;
  text?: CssEntry;
  loading?: CssEntry;
  disabled?: CssEntry;
  style?: {
    solid?: {
      default?: CssEntry;
      custom?: CssEntry;
      primary?: CssEntry;
      danger?: CssEntry;
      warning?: CssEntry;
      info?: CssEntry;
      success?: CssEntry;
    };
    outline?: {
      default?: CssEntry;
      custom?: CssEntry;
      primary?: CssEntry;
      danger?: CssEntry;
      warning?: CssEntry;
      info?: CssEntry;
      success?: CssEntry;
    };
    ghost?: {
      default?: CssEntry;
      custom?: CssEntry;
      primary?: CssEntry;
      danger?: CssEntry;
      warning?: CssEntry;
      info?: CssEntry;
      success?: CssEntry;
    };
  };
  size?: {
    default?: CssEntry;
    small?: CssEntry;
    large?: CssEntry;
  };
};

// Options, Props and Emits

defineOptions({ name: "HButton" });

const props = withDefaults(
  defineProps<{
    css?: ButtonCssProp;
    tag?: string | Component;
    nativeType?: string;
    icons?: { prefix?: string; suffix?: string; loading?: string };
    loading?: boolean;
    disabled?: boolean;
    outline?: boolean;
    ghost?: boolean;
    primary?: boolean;
    danger?: boolean;
    warning?: boolean;
    success?: boolean;
    info?: boolean;
    custom?: boolean;
    rounded?: boolean;
    small?: boolean;
    large?: boolean;
  }>(),
  {
    tag: "button",
    nativeType: "button",
  }
);

// Composables

const { theme } = useTheme();

// Computed values

const computedLoadingIcon = computed(
  () => props.icons?.loading ?? theme.value.icons.loading.dot
);

const computedCssClass = computed(() => {
  const {
    css,
    outline,
    ghost,
    primary,
    danger,
    warning,
    success,
    info,
    custom,
    rounded,
    small,
    large,
  } = props;

  const _style =
    (outline &&
      (css?.style?.outline ?? theme.value.css.button.style.outline)) ||
    (ghost && (css?.style?.ghost ?? theme.value.css.button.style.ghost)) ||
    (css?.style?.solid ?? theme.value.css.button.style.solid);

  const _size = theme.value.css.button.size;
  const _rounded = theme.value.css.button.rounded;

  const style = (
    ((custom && _style.custom) ||
      (primary && _style.primary) ||
      (danger && _style.danger) ||
      (warning && _style.warning) ||
      (success && _style.success) ||
      (info && _style.info) ||
      _style.default) as string
  ).split(" ");

  let size = (
    (small && _size.small) ||
    (large && _size.large) ||
    _size.default
  ).split(" ");

  if (rounded) {
    size = size.filter((c) => !c.startsWith("rounded"));
    size.push(_rounded);
  }

  return [...style, ...size];
});
</script>
