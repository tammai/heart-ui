<template>
  <div :class="css()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { castArray } from 'lodash-unified';
import type { Arrayable, DeepPartial } from '../types/heart';
import { tv } from 'tailwind-variants';
import type { Reactive } from 'vue';

export type CollapseActiveName = string | number;
export type CollapseModelValue = Arrayable<CollapseActiveName>;

export interface CollapseProps {
  modelValue?: string | string[];
  accordion?: boolean;
  icon?: string;
  activeIcon?: string;
  ui?: DeepPartial<typeof ui>;
}

export interface CollapseContext {
  icon?: string;
  activeIcon?: string;
  activeNames: Ref<CollapseActiveName[]>;
  handleItemClick: (name: CollapseActiveName) => void;
}

export interface CollapseEmit {
  (
    e: 'update:modelValue',
    value: CollapseActiveName | CollapseActiveName[],
  ): void;
  (e: 'change', value: CollapseActiveName | CollapseActiveName[]): void;
}
const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmit>();

const activeNames = ref<CollapseActiveName[]>(castArray(props.modelValue));

const setActiveNames = (_activeNames: CollapseActiveName[]) => {
  activeNames.value = _activeNames;
  const value = props.accordion ? activeNames.value[0] : activeNames.value;
  emit('update:modelValue', value);
  emit('change', value);
};

const ui = {
  base: 'border-b border-neutral-200',
};

const css = computed(() => {
  return tv({
    extend: tv(ui),
    ...useHeartTheme<typeof ui>('collapse', props.ui),
  });
});

const handleItemClick = (name: CollapseActiveName) => {
  if (props.accordion) {
    setActiveNames([activeNames.value[0] === name ? '' : name]);
  } else {
    const _activeNames = [...activeNames.value];
    const index = _activeNames.indexOf(name);

    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(name);
    }
    setActiveNames(_activeNames);
  }
};

watch(
  () => props.modelValue,
  () => (activeNames.value = castArray(props.modelValue)),
  { deep: true },
);

provide<Reactive<CollapseContext>>(
  COLLAPSE_CONTEXT_KEY,
  reactive({
    icon: props.icon,
    activeIcon: props.activeIcon,
    activeNames,
    handleItemClick,
  }),
);

defineExpose({
  activeNames,
  setActiveNames,
});
</script>
