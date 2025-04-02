<template>
  <div
    class="overflow-hidden border border-neutral-200 bg-white ring-2 ring-transparent transition-all"
    :class="[
      {
        'hover:ring-primary-600 hover:cursor-pointer hover:border-transparent':
          clickable,
      },
      roundedClass,
    ]"
  >
    <div
      v-if="$slots.header"
      :class="headerClass"
      class="rounded-t-xl border-b border-neutral-200 px-4 py-3"
    >
      <slot name="header" />
    </div>
    <div :class="bodyClass" class="px-4 py-3">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      :class="footerClass"
      class="rounded-b-xl border-t border-neutral-200 px-4 py-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
type RoundedVariant = "none" | "sm" | "md" | "lg";

const props = defineProps<{
  headerClass?: CssClass;
  footerClass?: CssClass;
  bodyClass?: CssClass;
  clickable?: boolean;
  rounded?: RoundedVariant;
}>();

const roundedClass = computed(() => {
  const { rounded } = props;

  return (
    (rounded === "none" && "rounded-none") ||
    (rounded === "sm" && "rounded-lg") ||
    (rounded === "lg" && "rounded-2xl") ||
    "rounded-xl"
  );
});
</script>
