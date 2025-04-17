<template>
  <div>
    <button
      :aria-expanded="isActive"
      :tabindex="disabled ? -1 : 0"
      :class="css().header()"
      type="button"
      @click="handleHeaderClick"
      @keydown.space.enter.stop.prevent="handleEnterClick"
      @focus="handleFocus"
      @blur="focusing = false"
    >
      <div :class="css().title()">
        <slot name="title">{{ title }}</slot>
      </div>
      <slot name="icon" :is-active="isActive">
        <Icon
          :name="collapseIcon"
          size="16"
          :class="css({ active: isActive }).icon()"
        />
      </slot>
    </button>

    <transition v-on="on">
      <div
        v-show="isActive"
        :class="css().content()"
        role="region"
        :aria-hidden="!isActive"
      >
        <div :class="css().inner()">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { RendererElement } from '@vue/runtime-core';
import type { CollapseContext } from './HCollapse.vue';
import { tv } from 'tailwind-variants';
import type { DeepPartial } from '../types/heart';

export interface CollapseItemProps {
  title: string;
  icon?: string;
  name?: string;
  disabled?: boolean;
  ui?: DeepPartial<typeof _css>;
}

const props = defineProps<CollapseItemProps>();

const collapse = inject<CollapseContext>(COLLAPSE_CONTEXT_KEY);

const focusing = ref(false);
const isClick = ref(false);
const name = computed(() => {
  return props.name ?? `h-collapse-id-${Math.floor(Math.random() * 1e6)}`;
});

const isActive = computed(() =>
  collapse?.activeNames.value.includes(unref(name)),
);

const collapseIcon = computed(() => {
  if (props.icon) return props.icon;
  return getHeartConfig('icon.collapse');
});

const _css = {
  slots: {
    title: 'font-semibold',
    inner: 'pb-3',
    header:
      'flex items-center justify-between w-full py-3 border-t border-neutral-200 cursor-pointer',
    content: 'transition-all duration-300 ease-in-out',
    icon: 'rotate-0 transition-transform duration-300 ease-in-out',
  },
  variants: {
    active: { true: { icon: 'rotate-90' } },
  },
};

const css = computed(() => {
  return tv({ extend: tv(_css), ...props.ui });
});

const handleFocus = () => {
  setTimeout(() => {
    if (!isClick.value) {
      focusing.value = true;
    } else {
      isClick.value = false;
    }
  }, 50);
};

const handleHeaderClick = () => {
  if (props.disabled) return;
  collapse?.handleItemClick(unref(name));
  focusing.value = false;
  isClick.value = true;
};

const handleEnterClick = () => {
  collapse?.handleItemClick(unref(name));
};

const reset = (el: RendererElement) => {
  el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow;
  el.style.paddingTop = el.dataset.oldPaddingTop;
  el.style.paddingBottom = el.dataset.oldPaddingBottom;
};

const on = {
  beforeEnter(el: RendererElement) {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    if (el.style.height) el.dataset.elExistsHeight = el.style.height;

    el.style.maxHeight = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el: RendererElement) {
    requestAnimationFrame(() => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.dataset.elExistsHeight) {
        el.style.maxHeight = el.dataset.elExistsHeight;
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = 0;
      }

      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
      el.style.overflow = 'hidden';
    });
  },

  afterEnter(el: RendererElement) {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow;
  },

  enterCancelled(el: RendererElement) {
    reset(el);
  },

  beforeLeave(el: RendererElement) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },

  leave(el: RendererElement) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  afterLeave(el: RendererElement) {
    reset(el);
  },

  leaveCancelled(el: RendererElement) {
    reset(el);
  },
};
</script>
