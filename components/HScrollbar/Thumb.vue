<template>
  <transition
    :enter-active-class="css().transitionEnter()"
    :leave-active-class="css().transitionLeave()"
  >
    <div
      v-show="always || visible"
      ref="instance"
      :class="css({ vertical }).base()"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        :class="css({ vertical }).thumb()"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useEventListener, isClient } from '@vueuse/core';
import { tv } from 'tailwind-variants';
import type { CSSProperties, Reactive } from 'vue';
import type { DeepPartial } from '../../types/heart';
import type { ScrollbarContext } from '../HScrollbar.vue';

export interface ScrollbarThumbProps {
  size?: string;
  move?: number;
  ratio: number;
  vertical?: boolean;
  always?: boolean;
}

const COMPONENT_NAME = 'HScrollbarThumb';

defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps<ScrollbarThumbProps>();

const scrollbar = inject<Reactive<ScrollbarContext>>(SCROLLBAR_CONTEXT_KEY);

const instance = ref<HTMLDivElement>();
const thumb = ref<HTMLDivElement>();

const thumbState = ref<Partial<Record<'X' | 'Y', number>>>({});
const visible = ref(false);

let cursorDown = false;
let cursorLeave = false;
let originalOnSelectStart:
  | ((this: GlobalEventHandlers, ev: Event) => any)
  | null = isClient ? document.onselectstart : null;

const bar = computed(
  () => SCROLLBAR_BAR_MAP[props.vertical ? 'vertical' : 'horizontal'],
);

const thumbStyle = computed(() =>
  renderThumbStyle({
    size: props.size,
    move: props.move,
    bar: bar.value,
  }),
);

const offsetRatio = computed(
  () =>
    // offsetRatioX = original width of thumb / current width of thumb / ratioX
    // offsetRatioY = original height of thumb / current height of thumb / ratioY
    // instance height = wrap height - GAP
    instance.value![bar.value.offset] ** 2 /
    scrollbar!.wrapElement![bar.value.scrollSize] /
    props.ratio /
    thumb.value![bar.value.offset],
);

const _css = {
  slots: {
    base: 'absolute transition-all duration-300 bottom-0.5 right-0.5',
    transitionLeave: 'opacity-0',
    transitionEnter: 'opacity-100',
    thumb: 'bg-neutral-400/50 hover:bg-neutral-400 rounded-full cursor-pointer',
  },
  variants: {
    vertical: {
      true: {
        base: 'top-0.5',
        thumb: 'w-1.5',
      },
      false: {
        base: 'left-0.5',
        thumb: 'h-1.5',
      },
    },
  },
};

const css = computed(() => {
  return tv({ extend: tv(_css), ...scrollbar?.ui });
});

const renderThumbStyle = ({
  move,
  size,
  bar,
}: Pick<ScrollbarThumbProps, 'move' | 'size'> & {
  bar: (typeof SCROLLBAR_BAR_MAP)[keyof typeof SCROLLBAR_BAR_MAP];
}): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
});

const clickThumbHandler = (e: MouseEvent) => {
  // prevent click event of middle and right button
  e.stopPropagation();
  if (e.ctrlKey || [1, 2].includes(e.button)) return;

  window.getSelection()?.removeAllRanges();
  startDrag(e);

  const el = e.currentTarget as HTMLDivElement;
  if (!el) return;
  thumbState.value[bar.value.axis] =
    el[bar.value.offset] -
    (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
};

const clickTrackHandler = (e: MouseEvent) => {
  if (!thumb.value || !instance.value || !scrollbar?.wrapElement) return;

  const offset = Math.abs(
    (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
      e[bar.value.client],
  );
  const thumbHalf = thumb.value[bar.value.offset] / 2;
  const thumbPositionPercentage =
    ((offset - thumbHalf) * 100 * offsetRatio.value) /
    instance.value[bar.value.offset];

  scrollbar.wrapElement[bar.value.scroll] =
    (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) /
    100;
};

const startDrag = (e: MouseEvent) => {
  e.stopImmediatePropagation();
  cursorDown = true;
  document.addEventListener('mousemove', mouseMoveDocumentHandler);
  document.addEventListener('mouseup', mouseUpDocumentHandler);
  originalOnSelectStart = document.onselectstart;
  document.onselectstart = () => false;
};

const mouseMoveDocumentHandler = (e: MouseEvent) => {
  if (!instance.value || !thumb.value) return;
  if (cursorDown === false) return;

  const prevPage = thumbState.value[bar.value.axis];
  if (!prevPage) return;

  const offset =
    (instance.value.getBoundingClientRect()[bar.value.direction] -
      e[bar.value.client]) *
    -1;
  const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100 * offsetRatio.value) /
    instance.value[bar.value.offset];
  scrollbar!.wrapElement![bar.value.scroll] =
    (thumbPositionPercentage * scrollbar!.wrapElement![bar.value.scrollSize]) /
    100;
};

const mouseUpDocumentHandler = () => {
  cursorDown = false;
  thumbState.value[bar.value.axis] = 0;
  document.removeEventListener('mousemove', mouseMoveDocumentHandler);
  document.removeEventListener('mouseup', mouseUpDocumentHandler);
  restoreOnselectstart();
  if (cursorLeave) visible.value = false;
};

const mouseMoveScrollbarHandler = () => {
  cursorLeave = false;
  visible.value = !!props.size;
};

const mouseLeaveScrollbarHandler = () => {
  cursorLeave = true;
  visible.value = cursorDown;
};

onBeforeUnmount(() => {
  restoreOnselectstart();
  document.removeEventListener('mouseup', mouseUpDocumentHandler);
});

const restoreOnselectstart = () => {
  if (document.onselectstart !== originalOnSelectStart)
    document.onselectstart = originalOnSelectStart;
};

useEventListener(
  toRef(scrollbar!, 'scrollbarElement'),
  'mousemove',
  mouseMoveScrollbarHandler,
);
useEventListener(
  toRef(scrollbar!, 'scrollbarElement'),
  'mouseleave',
  mouseLeaveScrollbarHandler,
);
</script>
