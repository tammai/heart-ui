<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
  >
    <div v-show="visible" :class="css({ type }).base()">
      <div :class="css().icon()">
        <slot name="icon">
          <Icon :name="typeIcon" size="24" />
        </slot>
      </div>
      <div :class="css().body()">
        <h6 v-if="title">{{ title }}</h6>
        <slot>
          <p>{{ message }}</p>
        </slot>
      </div>
      <HButton
        v-if="closable"
        :type="type"
        size="sm"
        variant="tertiary"
        :icon="closeIcon"
        :ui="{
          compoundVariants: [{ size: 'sm', icon: true, class: 'size-6' }],
        }"
        @click="handleClose"
      >
      </HButton>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export type AlertTypeVariant =
  | 'success'
  | 'danger'
  | 'error'
  | 'info'
  | 'warning';

export interface AlertProps {
  type: AlertTypeVariant;
  title?: string;
  message?: string;
  closable?: boolean;
  ui?: DeepPartial<typeof _css>;
}

const props = defineProps<AlertProps>();
const emit = defineEmits<{ (event: 'close'): void }>();
const slots = defineSlots<{
  default: () => void;
  icon: () => void;
}>();

const visible = ref(true);

const typeIcon = computed(() => {
  return getHeartConfig(`icon.${props.type}`) ?? 'fluent:info-24-filled';
});

const closeIcon = computed(() => {
  return getHeartConfig('icon.close');
});

const _css = {
  slots: {
    base: 'flex items-center gap-2 p-2 min-h-12 transition-all duration-500',
    body: 'flex-1 text-xs',
    icon: 'flex',
    transitionLeave: 'opacity-0 scale-95',
    transitionEnter: 'opacity-100 scale-100',
  },
  variants: {
    type: {
      success: 'bg-success-100 text-success-600',
      danger: 'bg-danger-100 text-danger-600',
      error: 'bg-danger-100 text-danger-600',
      info: 'bg-info-100 text-info-600',
      warning: 'bg-warning-100 text-warning-600',
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
