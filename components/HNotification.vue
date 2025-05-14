<template>
  <transition
    :enter-active-class="css().transitionEnter({ position })"
    :leave-active-class="css().transitionLeave({ position })"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      ref="notificationRef"
      v-show="visible"
      :id="id"
      :class="css().base({ position, type })"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <Icon v-if="typeIcon" :name="typeIcon" size="24" :class="css().icon()" />
      <div :class="css().body()">
        <h6 :class="css().title()">{{ title }}</h6>

        <div v-show="message" :class="css().content()">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <!-- Caution here, message could've been compromised, never use user's input as message -->
            <p v-else v-html="message" />
          </slot>
        </div>
      </div>
      <HButton
        v-if="showClose"
        size="sm"
        rounded
        ghost
        :type="type"
        :icon="closeIcon"
        title="Dismiss"
        :ui="{
          compoundVariants: [{ icon: true, size: 'sm', class: 'size-6' }],
        }"
        @click.stop="close"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import {
  useEventListener,
  useResizeObserver,
  useTimeoutFn,
  type Mutable,
} from '@vueuse/core';

import type { ComponentInternalInstance, CSSProperties, VNode } from 'vue';
import { EVENT_CODE } from '../constants';
import type { DeepPartial } from '../types/heart';
import { tv } from 'tailwind-variants';
import { getLastOffset, getOffsetOrSpace } from '../utils/heart/toast';

export interface NotificationProps {
  id: string;
  title?: string;
  message?: string | VNode | (() => VNode);
  type?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
  duration?: number;
  offset?: number;
  zIndex?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showClose?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  ui?: DeepPartial<typeof ui>;
}
export interface NotificationEmits {
  (event: 'destroy'): void;
  (event: 'click'): void;
}

export interface NotificationHandler {
  close: () => void;
}

export type NotificationContext = {
  id: string;
  vnode: VNode;
  handler: NotificationHandler;
  vm: ComponentInternalInstance;
  props: Mutable<NotificationProps>;
};

const props = withDefaults(defineProps<NotificationProps>(), {
  duration: 4500,
  offset: 12,
  position: 'top-right',
  type: 'neutral',
});

defineEmits<NotificationEmits>();

const { nextZIndex, currentZIndex } = useHeartGlobalZIndex();
const notificationRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const height = ref(0);
let timer: (() => void) | undefined = undefined;

const lastOffset = computed(() => getLastOffset('notify', props.id));
const offset = computed(
  () =>
    getOffsetOrSpace('notify', props.id, props.offset) +
    (lastOffset.value === 0 ? props.offset : lastOffset.value),
);
const outerHeight = computed((): number => height.value + offset.value);
const positionStyle = computed<CSSProperties>(() => {
  const spacing = 24;
  const vSpacing = offset.value > spacing ? offset.value : spacing;
  const { position } = props;
  const result = { zIndex: currentZIndex.value } as CSSProperties;

  if (position.startsWith('top')) {
    result.top = `${vSpacing}px`;
  }

  if (position.startsWith('bottom')) {
    result.bottom = `${vSpacing}px`;
  }

  if (position.endsWith('left')) {
    result.left = `${spacing}px`;
  }

  if (position.endsWith('right')) {
    result.right = `${spacing}px`;
  }

  return result;
});

const typeIcon = computed(() => {
  return props.icon ?? getHeartConfig(`icon.${props.type}`);
});

const closeIcon = computed(() => {
  return getHeartConfig('icon.close');
});

const ui = {
  slots: {
    base: 'fixed flex items-center gap-2 p-3 bg-white border border-neutral-200 rounded-lg shadow-lg shadow-black/5 transition-all duration-300 ease-in-out',
    title: '',
    content: 'text-xs',
    body: 'grow flex flex-col min-h-6 justify-center',
    icon: '',
    transitionEnter: 'scale-100 opacity-100 translate-x-0',
    transitionLeave: 'scale-95 opacity-0',
  },
  variants: {
    type: {
      neutral: {
        base: 'text-neutral-700',
      },
      info: {
        base: 'text-info-600',
      },
      success: {
        base: 'text-success-600',
      },
      warning: {
        base: 'text-warning-600',
      },
      error: {
        base: 'text-danger-600',
      },
    },
    position: {
      'top-left': {
        transitionLeave: '-translate-x-full',
      },
      'top-right': {
        transitionLeave: 'translate-x-full',
      },
      'bottom-left': {
        transitionLeave: '-translate-x-full',
      },
      'bottom-right': {
        transitionLeave: 'translate-x-full',
      },
    },
  },
};
const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('notification', props.ui),
  });
});

function startTimer() {
  if (props.duration > 0) {
    ({ stop: timer } = useTimeoutFn(() => {
      if (visible.value) close();
    }, props.duration));
  }
}

function clearTimer() {
  timer?.();
}

function close() {
  visible.value = false;
}

function onKeydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
    clearTimer(); // press delete/backspace clear timer
  } else if (code === EVENT_CODE.esc) {
    // press esc to close the notification
    if (visible.value) {
      close();
    }
  } else {
    startTimer(); // resume timer
  }
}

// lifecycle
onMounted(() => {
  startTimer();
  nextZIndex();
  visible.value = true;
});

useEventListener(document, 'keydown', onKeydown);

useResizeObserver(notificationRef, () => {
  height.value = notificationRef.value!.getBoundingClientRect().height;
});

defineExpose({
  visible,
  outerHeight,
  close,
});
</script>
