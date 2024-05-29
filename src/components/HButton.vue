<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="computedCssClass"
    :disabled="disabled || busy"
  >
    <span
      v-if="$slots.prefix ?? prefixIcon ?? icons?.prefix"
      :class="computedPrefixClass"
    >
      <slot name="prefix">
        <HIcon :icon="`${prefixIcon || icons?.prefix}`" />
      </slot>
    </span>

    <span :class="computedTextClass">
      <slot />
    </span>
    <span
      v-if="$slots.suffix ?? suffixIcon ?? icons?.suffix"
      :class="computedSuffixClass"
    >
      <slot name="suffix">
        <HIcon :icon="suffixIcon ?? icons?.suffix ?? ''" />
      </slot>
    </span>
    <span v-if="busy" :class="computedBusyClass">
      <slot name="busy">
        <HIcon :icon="computedLoadingIcon" />
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { type Component, computed } from "vue";
import { type CssEntry } from "../common";
import { useHeartTheme } from "..";
import HIcon from "./HIcon.vue";

// Types

interface ButtonCssPropStyle {
  default?: CssEntry;
  custom?: CssEntry;
  primary?: CssEntry;
  danger?: CssEntry;
  warning?: CssEntry;
  info?: CssEntry;
  success?: CssEntry;
}

interface ButtonCssProp {
  root?: CssEntry;
  prefix?: CssEntry;
  suffix?: CssEntry;
  text?: CssEntry;
  busy?: CssEntry;
  disabled?: CssEntry;
  style?: {
    solid?: ButtonCssPropStyle;
    outline?: ButtonCssPropStyle;
    ghost?: ButtonCssPropStyle;
    semi?: ButtonCssPropStyle;
  };
  size?: {
    default?: CssEntry;
    small?: CssEntry;
    large?: CssEntry;
  };
}

export interface ButtonProps {
  css?: ButtonCssProp;
  tag?: string | Component;
  nativeType?: string;
  icons?: { prefix?: string; suffix?: string; loading?: string };
  prefixIcon?: string;
  suffixIcon?: string;
  loadingIcon?: string;
  busy?: boolean;
  disabled?: boolean;
  outline?: boolean;
  ghost?: boolean;
  semi?: boolean;
  primary?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
  custom?: boolean;
  rounded?: boolean;
  small?: boolean;
  large?: boolean;
}

// Options, Props and Emits

defineOptions({ name: "HButton" });

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

// Composables

const { theme } = useHeartTheme();

// Computed values

const computedLoadingIcon = computed(
  () =>
    props.loadingIcon ?? props.icons?.loading ?? theme.value.icons.loading.dot
);

const computedCssClass = computed(() => {
  const {
    css,
    outline,
    ghost,
    semi,
    primary,
    danger,
    warning,
    success,
    info,
    custom,
    rounded,
    small,
    large,
    busy,
    disabled,
  } = props;

  const _style =
    (outline &&
      (css?.style?.outline ?? theme.value.css.button.style.outline)) ||
    (ghost && (css?.style?.ghost ?? theme.value.css.button.style.ghost)) ||
    (semi && (css?.style?.semi ?? theme.value.css.button.style.semi)) ||
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

  return [
    css?.root ?? theme.value.css.button.root,
    ...style,
    ...size,
    disabled && (css?.disabled ?? theme.value.css.button.disabled),
    busy && "relative pointer-events-none",
  ];
});

const computedBusyClass = computed(() => [
  "absolute top-0 left-0 z-1 w-full h-full flex justify-center items-center",
  props.css?.busy ?? theme.value.css.button.busy,
]);

const computedPrefixClass = computed(() => [
  props.css?.prefix ?? theme.value.css.button.prefix,
  { invisible: props.busy },
]);

const computedSuffixClass = computed(() => [
  props.css?.suffix ?? theme.value.css.button.suffix,
  { invisible: props.busy },
]);

const computedTextClass = computed(() => [
  props.css?.text ?? theme.value.css.button.text,
  { invisible: props.busy },
]);
</script>
