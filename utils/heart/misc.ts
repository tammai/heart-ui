import { isNumber, isString } from 'lodash-unified';

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

export const isWindow = (val: unknown): val is Window => val === window;

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  console.log('HeartUI', 'binding value must be a string or number');
}
