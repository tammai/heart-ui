import type { ToastContext } from '../../components/HToast.vue';

export const instances: ToastContext[] = shallowReactive([]);

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev: ToastContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  return prev.vm.exposed!.outerHeight.value;
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 12 : offset;
};
