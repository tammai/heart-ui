<template>
  <thumb :move="moveX" :ratio="ratioX" :size="sizeWidth" :always="always" />
  <thumb
    :move="moveY"
    :ratio="ratioY"
    :size="sizeHeight"
    vertical
    :always="always"
  />
</template>

<script lang="ts" setup>
import Thumb from './Thumb.vue';
import type { Reactive } from 'vue';
import type { ScrollbarContext } from '../HScrollbar.vue';

export interface ScrollbarBarProps {
  always?: boolean;
  minSize: number;
}

const props = defineProps<ScrollbarBarProps>();

const scrollbar = inject<Reactive<ScrollbarContext>>(SCROLLBAR_CONTEXT_KEY);

const moveX = ref(0);
const moveY = ref(0);
const sizeWidth = ref('');
const sizeHeight = ref('');
const ratioY = ref(1);
const ratioX = ref(1);

const handleScroll = (wrap: HTMLDivElement) => {
  if (wrap) {
    const offsetHeight = wrap.offsetHeight - SCROLLBAR_GAP;
    const offsetWidth = wrap.offsetWidth - SCROLLBAR_GAP;

    moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * ratioY.value;
    moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * ratioX.value;
  }
};

const update = () => {
  const wrap = scrollbar?.wrapElement;
  if (!wrap) return;
  const offsetHeight = wrap.offsetHeight - SCROLLBAR_GAP;
  const offsetWidth = wrap.offsetWidth - SCROLLBAR_GAP;

  const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
  const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
  const height = Math.max(originalHeight, props.minSize);
  const width = Math.max(originalWidth, props.minSize);

  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height));
  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width));

  sizeHeight.value = height + SCROLLBAR_GAP < offsetHeight ? `${height}px` : '';
  sizeWidth.value = width + SCROLLBAR_GAP < offsetWidth ? `${width}px` : '';
};

defineExpose({
  handleScroll,
  update,
});
</script>
