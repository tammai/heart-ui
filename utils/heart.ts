import { isNumber } from "lodash-unified";

export type CssClass =
  | string
  | Record<string, boolean>
  | Array<string | Record<string, boolean>>;

export const addUnit = (value: number | string) =>
  isNumber(value) || parseInt(value) ? value + "px" : value;
