import {
  isBoolean,
  isElement,
  isFunction,
  isNumber,
  isString,
} from 'lodash-unified';
import { createVNode, isVNode, render, type AppContext } from 'vue';
import ToastConstructor, {
  type ToastContext,
  type ToastHandler,
  type ToastProps,
} from '../../components/HToast.vue';
import { isClient, type Mutable } from '@vueuse/core';
import { instances } from '../../utils/heart/toast';

interface ToastConfigContext {
  max?: number;
  grouping?: boolean;
  duration?: number;
  offset?: number;
  showClose?: boolean;
}

type ToastParams = ToastOptions | ToastOptions['message'];
type ToastParamsNormalized = Omit<ToastProps, 'id'> & {
  appendTo: HTMLElement;
};

type ToastOptionsWithType = Omit<ToastOptions, 'type'>;

type ToastParamsWithType = ToastOptionsWithType | ToastOptions['message'];

type ToastOptions = Partial<
  Mutable<
    Omit<ToastProps, 'id'> & {
      appendTo?: HTMLElement | string;
    }
  >
>;

type ToastFn = {
  (options?: ToastParams, appContext?: null | AppContext): ToastHandler;
  closeAll(type?: ToastType): void;
};
type ToastTypedFn = (
  options?: ToastParamsWithType,
  appContext?: null | AppContext,
) => ToastHandler;

type Toast = ToastFn & {
  [K in ToastType]: ToastTypedFn;
} & {
  [key: string]: any; // Add index signature for string
};

const toastDefaults = {
  dangerouslyUseHTMLString: false,
  duration: 3000,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  plain: false,
  offset: 12,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  position: 'top',
  appendTo: isClient ? document.body : (undefined as never),
} as const;

const toastTypes = ['success', 'info', 'warning', 'error'];

export type ToastType = (typeof toastTypes)[number];

let seed = 1;

const toastConfig: ToastConfigContext = {}; // TODO: define config later

const normalizeOptions = (params?: ToastParams) => {
  const options: ToastOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params;

  const normalized = {
    ...toastDefaults,
    ...options,
  };

  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    if (!isElement(appendTo)) {
      appendTo = document.body;
    }

    normalized.appendTo = appendTo as HTMLElement;
  }

  // When grouping is configured globally,
  // if grouping is manually set when calling message individually and it is not equal to the default value,
  // the global configuration cannot override the current setting. default => false
  if (isBoolean(toastConfig.grouping) && !normalized.grouping) {
    normalized.grouping = toastConfig.grouping;
  }
  if (isNumber(toastConfig.duration) && normalized.duration === 3000) {
    normalized.duration = toastConfig.duration;
  }
  if (isNumber(toastConfig.offset) && normalized.offset === 12) {
    normalized.offset = toastConfig.offset;
  }
  if (isBoolean(toastConfig.showClose) && !normalized.showClose) {
    normalized.showClose = toastConfig.showClose;
  }

  return normalized as ToastParamsNormalized;
};

const closeToast = (instance: ToastContext) => {
  const idx = instances.indexOf(instance);
  if (idx === -1) return;

  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};

const createToast = (
  { appendTo, ...options }: ToastParamsNormalized,
  context?: AppContext | null,
): ToastContext => {
  const id = `toast_${seed++}`;
  const userOnClose = options.onClose;

  const container = document.createElement('div');

  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose?.();
      closeToast(instance);
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
    ToastConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null,
  );
  vnode.appContext = context || message._context;

  render(vnode, container);
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  appendTo.appendChild(container.firstElementChild!);

  const vm = vnode.component!;

  const handler: ToastHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed!.close();
    },
  };

  const instance: ToastContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

const message: ToastFn & Partial<Toast> & { _context: AppContext | null } = (
  options = {},
  context,
) => {
  if (!isClient) return { close: () => undefined };

  const normalized = normalizeOptions(options);

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message,
    );
    if (instance) {
      instance.props.repeatNum! += 1;
      instance.props.type = normalized.type;
      return instance.handler;
    }
  }

  if (isNumber(toastConfig.max) && instances.length >= toastConfig.max) {
    return { close: () => undefined };
  }

  const instance = createToast(normalized, context);

  instances.push(instance);
  return instance.handler;
};

toastTypes.forEach((type) => {
  message[type] = (options = {}, appContext: AppContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type } as ToastParams, appContext);
  };
});

export function closeAll(type?: ToastType): void {
  // Create a copy of instances to avoid modification during iteration
  const instancesToClose = [...instances];

  for (const instance of instancesToClose) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}

message.closeAll = closeAll;
message._context = null;

export const useHeartToast = (): {
  info: (p: ToastParamsWithType) => ToastHandler;
  warning: (p: ToastParamsWithType) => ToastHandler;
  success: (p: ToastParamsWithType) => ToastHandler;
  error: (p: ToastParamsWithType) => ToastHandler;
} => {
  const c = useNuxtApp().vueApp._context;

  return {
    info: (p) => message.info(p, c),
    warning: (p) => message.warning(p, c),
    success: (p) => message.success(p, c),
    error: (p) => message.error(p, c),
  };
};

export const useHeartGlobalZIndex = () => {
  const savedZIndex = ref(1987);

  return {
    currentZIndex: savedZIndex,
    nextZIndex: () => {
      savedZIndex.value += 1;
      return savedZIndex.value;
    },
  };
};
