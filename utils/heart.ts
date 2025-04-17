import { get, isNumber } from 'lodash-unified';

export const SKELETON_CONTEXT_KEY = Symbol('h-skeleton');
export const BUTTON_GROUP_CONTEXT_KEY = Symbol('h-button-group');
export const CHECKBOX_GROUP_CONTEXT_KEY = Symbol('h-checkbox-group');
export const RADIO_GROUP_CONTEXT_KEY = Symbol('h-radio-group');
export const FORM_CONTEXT_KEY = Symbol('h-form');
export const COLLAPSE_CONTEXT_KEY = Symbol('h-collapse');

export const addUnit = (value: number | string) =>
  isNumber(value) || parseInt(value) ? value + 'px' : value;

export const formatCssVariableName = (name: string) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const getHeartConfig = (path: string) => {
  const heart = useAppConfig().heart;

  return get(heart, path);
};

export const getHeartRoundedValue = (
  size: 'sm' | 'md' | 'lg',
  enabled?: boolean,
) => {
  const roundedMapping = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  };

  return (enabled ?? getHeartConfig('rounded') === true)
    ? roundedMapping[size]
    : 'rounded-none';
};

export const getHeartShadowValue = (
  size: 'sm' | 'md' | 'lg',
  enabled?: boolean,
) => {
  const shadowMapping = {
    sm: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-xl',
  };

  return (enabled ?? getHeartConfig('shadow') ?? false)
    ? shadowMapping[size]
    : 'shadow-none';
};
