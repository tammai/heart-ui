import { isNumber } from 'lodash-unified';

export const skeletonKey = Symbol('skeleton');

export const addUnit = (value: number | string) =>
  isNumber(value) || parseInt(value) ? value + 'px' : value;

export const formatCssVariableName = (name: string) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};
