<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
  >
    <div v-show="visible" :class="css({ variant }).base()">
      <div :class="css().icon()">
        <slot name="icon">
          <Icon :name="variantIcon" size="24" />
        </slot>
      </div>
      <div :class="css().body()">
        <h6 v-if="title" :class="css().title()">{{ title }}</h6>
        <div v-if="message || $slots.default" :class="css().message()">
          <slot>
            <p>{{ message }}</p>
          </slot>
        </div>
      </div>
      <HButton
        v-if="closable"
        :variant="variant"
        size="sm"
        type="tertiary"
        :icon="closeIcon"
        @click="handleClose"
      >
      </HButton>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

const props = defineProps<{
  variant: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message?: string;
  closable?: boolean;
  ui?: DeepPartial<typeof _css>;
}>();
const emit = defineEmits<{ (event: 'close'): void }>();
defineSlots<{
  default: () => void;
  icon: () => void;
  close: () => void;
}>();

const visible = ref(true);

const variantIcon = computed(() => {
  return getHeartConfig(`icon.${props.variant}`);
});

const closeIcon = computed(() => {
  return getHeartConfig('icon.close');
});

const _css = {
  slots: {
    base: 'flex items-center gap-2 p-2 min-h-12 transition-all duration-500',
    body: 'flex-1',
    title: 'text-xs font-bold',
    message: 'text-xs',
    icon: 'flex',
    transitionLeave: 'opacity-0 scale-95',
    transitionEnter: 'opacity-100 scale-100',
  },
  variants: {
    variant: {
      success: {
        base: 'bg-success-100 text-success-600',
        close: 'hover:bg-success-200 hover:text-success-700',
      },
      error: {
        base: 'bg-danger-100 text-danger-600',
        close: 'hover:bg-danger-200 hover:text-danger-700',
      },
      info: {
        base: 'bg-info-100 text-info-600',
        close: 'hover:bg-info-200 hover:text-info-700',
      },
      warning: {
        base: 'bg-warning-100 text-warning-600',
        close: 'hover:bg-warning-200 hover:text-warning-700',
      },
    },
  },
};
const css = computed(() => {
  _css.slots.base = `${_css.slots.base} ${getHeartRoundedValue('md')}`;
  return tv({ extend: tv(_css), ...props.ui });
});

const handleClose = () => {
  visible.value = false;
  emit('close');
};
</script>
