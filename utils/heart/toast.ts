import type { NotificationContext } from '../../components/HNotification.vue';
import type { ToastContext } from '../../components/HToast.vue';

export const toastInstances: Record<string, ToastContext[]> = reactive({});
export const notifyInstances: Record<string, NotificationContext[]> = reactive(
  {},
);
export const instances = {
  toast: toastInstances,
  notify: notifyInstances,
};

export const getInstanceLocation = (group: 'toast' | 'notify', id: string) => {
  let idx = -1;
  let pos = '';

  for (const p in instances[group]) {
    const i = instances[group][p].findIndex((instance) => instance.id === id);

    if (i > -1) {
      idx = i;
      pos = p;
      break;
    }
  }

  return { idx, pos };
};

export const getInstance = (group: 'toast' | 'notify', id: string) => {
  const { idx, pos } = getInstanceLocation(group, id);

  const current = !!pos ? instances[group][pos][idx] : undefined;
  let prev: ToastContext | NotificationContext | undefined;
  if (idx > 0) {
    prev = instances[group][pos][idx - 1];
  }

  return { current, prev };
};

export const getLastOffset = (
  group: 'toast' | 'notify',
  id: string,
): number => {
  const { prev } = getInstance(group, id);

  if (!prev) return 0;
  return prev.vm.exposed!.outerHeight.value;
};

export const getOffsetOrSpace = (
  group: 'toast' | 'notify',
  id: string,
  offset: number,
) => {
  const { idx } = getInstanceLocation(group, id);
  return idx > 0 ? 12 : offset;
};
