import { isNumber } from 'lodash-unified';

export const SKELETON_CONTEXT_KEY = Symbol();

export const addUnit = (value: number | string) =>
  isNumber(value) || parseInt(value) ? value + 'px' : value;

export const formatCssVariableName = (name: string) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};
