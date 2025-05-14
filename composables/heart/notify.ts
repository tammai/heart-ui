import { createVNode, isVNode, render, type AppContext, type VNode } from 'vue';
import type Notification from '../../components/HNotification.vue';
import type {
  NotificationContext,
  NotificationHandler,
  NotificationProps,
} from '../../components/HNotification.vue';
import NotificationConstructor from '../../components/HNotification.vue';
import { isClient } from '@vueuse/core';
import {
  isElement,
  isFunction,
  isString,
  isUndefined,
  merge,
} from 'lodash-unified';
import { instances } from '../../utils/heart/toast';

export const notificationTypes = [
  'neutral',
  'success',
  'info',
  'warning',
  'error',
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export type NotificationInstance = InstanceType<typeof Notification> & unknown;

export type NotificationOptions = Omit<NotificationProps, 'id'> & {
  appendTo?: HTMLElement | string;
};
export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>;

export type NotificationParams = Partial<NotificationOptions> | string | VNode;
export type NotificationParamsNormalized = Omit<NotificationProps, 'id'> & {
  appendTo: HTMLElement;
};
export type NotificationParamsTyped =
  | Partial<NotificationOptionsTyped>
  | string
  | VNode;

export interface NotifyFn {
  (
    options?: NotificationParams,
    appContext?: null | AppContext,
  ): NotificationHandler;
  closeAll(): void;
  _context: AppContext | null;
}

export type NotifyTypedFn = (
  options?: NotificationParamsTyped,
  appContext?: null | AppContext,
) => NotificationHandler;

export interface Notify extends NotifyFn {
  neutral: NotifyTypedFn;
  success: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
  info: NotifyTypedFn;
}

export interface NotificationQueueItem {
  vm: VNode;
}

let seed = 1;

const normalizeOptions = (params?: NotificationParams) => {
  const options: NotificationOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params;

  const normalized = { ...options };

  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    if (!isElement(appendTo)) {
      appendTo = document.body;
    }

    normalized.appendTo = appendTo as HTMLElement;
  }

  return normalized as NotificationParamsNormalized;
};

const mergeOptions = (
  a: NotificationParams,
  b?: NotificationParams,
): NotificationParamsNormalized => {
  const normalizedA =
    !a || isString(a) || isVNode(a) || isFunction(a)
      ? { message: a }
      : { ...a };
  const normalizedB =
    !b || isString(b) || isVNode(b) || isFunction(b) ? {} : { ...b };

  return merge(normalizedB, normalizedA) as NotificationParamsNormalized;
};

export function closeNotify(instance: NotificationContext) {
  const pos = instance.props.position || 'top-right';
  const idx = instances['notify'][pos].indexOf(instance);

  if (idx === -1) return;

  instances['notify'][pos].splice(idx, 1);
  const { handler } = instance;
  handler.close();
}

const createNotify = (
  { appendTo, ...options }: NotificationParamsNormalized,
  context?: AppContext | null,
): NotificationContext => {
  const id = `notify_${seed++}`;
  const userOnClose = options.onClose;

  const container = document.createElement('div');

  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose?.();
      closeNotify(instance);
    },

    // clean message element preventing mem leak
    onDestroy: () => {
      // since the element is destroy, then the VNode should be collected by GC as well
      // we do not want cause any mem leak because we have returned vm as a reference to users
      // so that we manually set it to false.
      render(null, container);
    },
  };
  const vnode = createVNode(
    NotificationConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null,
  );
  vnode.appContext = context || notify._context;

  render(vnode, container);
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  appendTo.appendChild(container.firstElementChild!);

  const vm = vnode.component!;

  const handler: NotificationHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed!.close();
    },
  };

  const instance: NotificationContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

const notify: NotifyFn &
  Partial<Notification> & { _context: AppContext | null } = (
  options = {},
  context,
) => {
  if (!isClient) return { close: () => undefined };

  const normalized = normalizeOptions(options);
  const pos = normalized.position || 'top-right';

  const instance = createNotify(normalized, context);

  if (!instances['notify'][pos]) {
    instances['notify'][pos] = [] as NotificationContext[];
  }

  instances['notify'][pos].push(instance);
  return instance.handler;
};

notificationTypes.forEach((type) => {
  (notify as Notify)[type] = (
    options = {},
    appContext: AppContext | null = null,
  ) => {
    if (isString(options) || isVNode(options)) {
      options = {
        message: options,
      };
    }
    return notify({ ...options, type }, appContext);
  };
});

export function closeAll(type?: NotificationType): void {
  // Create a copy of instances to avoid modification during iteration
  const instancesToClose = [
    ...Object.keys(instances['notify']).reduce((a, c) => {
      return a.concat(instances['notify'][c]);
    }, [] as NotificationContext[]),
  ];

  for (const instance of instancesToClose) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}

notify.closeAll = closeAll;
notify._context = null;

export const useHeartNotify = (
  params?: NotificationParams,
): {
  notify: (p: NotificationParamsTyped) => NotificationHandler;
  info: (p: NotificationParamsTyped) => NotificationHandler;
  success: (p: NotificationParamsTyped) => NotificationHandler;
  warning: (p: NotificationParamsTyped) => NotificationHandler;
  error: (p: NotificationParamsTyped) => NotificationHandler;
} => {
  const c = useNuxtApp().vueApp._context;

  return {
    notify: (p) => (notify as Notify).neutral(mergeOptions(p, params), c),
    info: (p) => (notify as Notify).info(mergeOptions(p, params), c),
    success: (p) => (notify as Notify).success(mergeOptions(p, params), c),
    warning: (p) => (notify as Notify).warning(mergeOptions(p, params), c),
    error: (p) => (notify as Notify).error(mergeOptions(p, params), c),
  };
};
