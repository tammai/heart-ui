<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
    @before-enter="isStartTransition = true"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="toastRef"
      :class="css({ type, plain }).base()"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <HBadge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        :ui="{
          slots: {
            base: css().badge(),
            content: 'top-0 translate-x-1/2 -translate-y-1/2',
          },
        }"
      />
      <Icon :name="iconName" size="20" />
      <slot>
        <div v-if="!dangerouslyUseHTMLString" :class="css().content()">
          {{ message }}
        </div>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <div v-else :class="css().content()" v-html="message" />
      </slot>
      <div v-if="showClose" :class="css().action()" @click.stop="close">
        <Icon :name="closeIcon" size="12" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {
  useEventListener,
  useResizeObserver,
  useTimeoutFn,
  type Mutable,
} from '@vueuse/core';
import type { ComponentInternalInstance, CSSProperties } from 'vue';
import type { BadgeProps } from './HBadge.vue';
import { EVENT_CODE } from '../constants';
import type { DeepPartial } from '../types/heart';
import { tv } from 'tailwind-variants';
import { useHeartGlobalZIndex, useHeartTheme } from '../composables/heart';
import { getLastOffset, getOffsetOrSpace } from '../utils/heart/toast';

export interface ToastProps {
  id: string;
  message: string | VNode | (() => VNode);
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
  duration?: number;
  offset?: number;
  repeatNum?: number;
  showClose?: boolean;
  plain?: boolean;
  grouping?: boolean;
  onClose?: () => void;
  position?:
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  ui?: DeepPartial<typeof ui>;
}

export interface ToastEmits {
  (event: 'destroy'): void;
}

export interface ToastHandler {
  close: () => void;
}

export type ToastContext = {
  id: string;
  vnode: VNode;
  handler: ToastHandler;
  vm: ComponentInternalInstance;
  props: Mutable<ToastProps>;
};

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  duration: 3000,
  repeatNum: 1,
  offset: 12,
  grouping: false,
  position: 'top',
});
const emit = defineEmits<ToastEmits>();

const isStartTransition = ref(false);

const { currentZIndex, nextZIndex } = useHeartGlobalZIndex();

const toastRef = ref<HTMLDivElement>();
const visible = ref(false);
const height = ref(0);

let stopTimer: (() => void) | undefined = undefined;

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info',
);

const iconName = computed(() => {
  return props.icon ?? getHeartConfig(`icon.${props.type}`) ?? '';
});

const closeIcon = computed(() => {
  return getHeartConfig('icon.close') || '';
});

const lastOffset = computed(() => getLastOffset(props.id));
const offset = computed(
  () =>
    getOffsetOrSpace(props.id, props.offset) +
    (lastOffset.value === 0 ? props.offset : lastOffset.value),
);
const outerHeight = computed((): number => height.value + offset.value);
const customStyle = computed<CSSProperties>(() => {
  const { position } = props;
  const result = { zIndex: currentZIndex.value } as CSSProperties;

  if (position.startsWith('top')) {
    result.top = `${offset.value}px`;
  }

  if (position.startsWith('bottom')) {
    result.bottom = `${offset.value}px`;
  }

  if (position.endsWith('left')) {
    result.left = `${props.offset}px`;
  } else if (position.endsWith('right')) {
    result.right = `${props.offset}px`;
  } else {
    result.left = '50%';
    result.transform = 'translateX(-50%)';
  }

  return result;
});

const ui = {
  slots: {
    base: 'flex items-center gap-2 p-3 fixed rounded-lg shadow-lg shadow-black/5 transition-all duration-300 ease-in-out',
    content: 'text-xs grow',
    action:
      'flex items-center justify-center rounded-full size-5 hover:bg-black/10 transition-all cursor-pointer',
    badge: 'absolute top-0 right-0 z-1',
    transitionLeave: 'opacity-0 scale-95',
    transitionEnter: 'opacity-100 scale-100',
  },
  variants: {
    type: {
      info: { base: 'bg-info-100 text-info-600' },
      success: { base: 'bg-success-100 text-success-600' },
      warning: { base: 'bg-warning-100 text-warning-600' },
      error: { base: 'bg-danger-100 text-danger-600' },
    },
    plain: {
      true: { base: 'bg-white border border-neutral-100' },
    },
  },
};
const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('toast', props.ui),
  });
});

function startTimer() {
  if (props.duration === 0) return;
  ({ stop: stopTimer } = useTimeoutFn(() => {
    close();
  }, props.duration));
}

function clearTimer() {
  stopTimer?.();
}

function close() {
  visible.value = false;

  // if the message has never started a transition, we can destroy it immediately
  nextTick(() => {
    if (!isStartTransition.value) {
      props.onClose?.();
      emit('destroy');
    }
  });
}

function keydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.esc) {
    // press esc to close the message
    close();
  }
}

onMounted(() => {
  startTimer();
  nextZIndex();
  visible.value = true;
});

watch(
  () => props.repeatNum,
  () => {
    clearTimer();
    startTimer();
  },
);

useEventListener(document, 'keydown', keydown);

useResizeObserver(toastRef, () => {
  height.value = toastRef.value!.getBoundingClientRect().height;
});

defineExpose({
  visible,
  outerHeight,
  close,
});
</script>
