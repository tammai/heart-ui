<template>
  <div
    class="bg-white border border-neutral-200 outline-1 outline-transparent overflow-hidden transition-all"
    :class="[
      {
        'hover:outline-primary-600 hover:border-primary-600 hover:cursor-pointer':
          clickable,
      },
      roundedClass,
    ]"
  >
    <div
      v-if="$slots.header"
      :class="headerClass"
      class="px-4 py-3 rounded-t-xl border-b border-neutral-200"
    >
      <slot name="header" />
    </div>
    <div :class="bodyClass" class="px-4 py-3">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      :class="footerClass"
      class="px-4 py-3 rounded-b-xl border-t border-neutral-200"
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
