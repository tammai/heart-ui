<template>
  <div ref="scrollbarRef" :class="css().base()">
    <div
      ref="wrapRef"
      :class="css().wrap()"
      :style="wrapStyle"
      :tabindex="tabindex"
      @scroll="handleScroll"
    >
      <div
        :id="id"
        ref="resizeRef"
        :class="css().view()"
        :style="viewStyle"
        :role="role"
        :aria-label="ariaLabel"
        :aria-orientation="ariaOrientation"
      >
        <slot />
      </div>
    </div>
    <template v-if="!native">
      <bar ref="barRef" :always="always" :min-size="minSize" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { isObject, useEventListener, useResizeObserver } from '@vueuse/core';
import Bar from './HScrollbar/Bar.vue';
import type { CSSProperties, Reactive, StyleValue } from 'vue';

import { isNumber } from 'lodash-unified';
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface ScrollbarProps {
  id?: string;
  tabindex?: number;
  native?: boolean;
  always?: boolean;
  minSize?: number;
  height?: string | number;
  maxHeight?: string | number;
  wrapStyle?: StyleValue;
  wrapClass?: string;
  viewClass?: string;
  viewStyle?: StyleValue;
  role?: string;
  ariaLabel?: string;
  ariaOrientation?: 'horizontal' | 'vertical';
  noresize?: boolean;
  ui?: DeepPartial<typeof ui>;
}

export interface ScrollbarEmit {
  (e: 'scroll', data: { scrollTop: number; scrollLeft: number }): void;
}

export interface ScrollbarContext {
  scrollbarElement: Ref<HTMLDivElement | undefined>;
  wrapElement: Ref<HTMLDivElement | undefined>;
  ui?: DeepPartial<typeof ui>;
}

const COMPONENT_NAME = 'HScrollbar';

defineOptions({
  name: COMPONENT_NAME,
});

const props = withDefaults(defineProps<ScrollbarProps>(), { minSize: 20 });
const emit = defineEmits<ScrollbarEmit>();

let stopResizeObserver: (() => void) | undefined = undefined;
let stopResizeListener: (() => void) | undefined = undefined;
let wrapScrollTop = 0;
let wrapScrollLeft = 0;

const scrollbarRef = ref<HTMLDivElement>();
const wrapRef = ref<HTMLDivElement>();
const resizeRef = ref<HTMLElement>();
const barRef = ref<InstanceType<typeof Bar>>();

const wrapStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {
    scrollbarWidth: props.native ? 'auto' : 'none',
  };
  if (props.height) style.height = addUnit(props.height);
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight);
  return [props.wrapStyle, style];
});

const ui = {
  slots: {
    base: 'relative overflow-hidden',
    wrap: 'overflow-auto',
    view: '',
    thumb: '',
  },
};

const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('scrollbar', props.ui),
  });
});

const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value);
    wrapScrollTop = wrapRef.value.scrollTop;
    wrapScrollLeft = wrapRef.value.scrollLeft;

    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    });
  }
};

// TODO: refactor method overrides, due to script setup dts
// @ts-nocheck
function scrollTo(xCord: number, yCord?: number): void;
function scrollTo(options: ScrollToOptions): void;
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2);
  }
}

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    console.log(COMPONENT_NAME, 'value must be a number');
    return;
  }
  wrapRef.value!.scrollTop = value;
};

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    console.log(COMPONENT_NAME, 'value must be a number');
    return;
  }
  wrapRef.value!.scrollLeft = value;
};

const update = () => {
  barRef.value?.update();
};

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.();
      stopResizeListener?.();
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
      stopResizeListener = useEventListener('resize', update);
    }
  },
  { immediate: true },
);

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native)
      nextTick(() => {
        update();
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value);
        }
      });
  },
);

provide<Reactive<ScrollbarContext>>(
  SCROLLBAR_CONTEXT_KEY,
  reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef,
    ui: { slots: { thumb: props.ui?.slots?.thumb ?? ui.slots.thumb } },
  }),
);

onActivated(() => {
  if (wrapRef.value) {
    wrapRef.value.scrollTop = wrapScrollTop;
    wrapRef.value.scrollLeft = wrapScrollLeft;
  }
});

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update();
    });
});

onUpdated(() => update());

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
});
</script>
