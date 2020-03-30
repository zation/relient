import format from 'date-fns/fp/format';
import isValid from 'date-fns/fp/isValid';
import { isFinite, trim, isNaN } from 'lodash/fp';

export const date = ({
  formatter = 'yyyy-MM-dd',
  defaultDisplay = '--',
} = {}) => (value: number | Date): string => {
  if (isValid(value)) {
    return format(formatter)(value);
  }
  return defaultDisplay;
};

export const time = ({
  formatter = 'yyyy-MM-dd HH:mm:ss',
  defaultDisplay = '--',
} = {}) => (value: number | Date): string => {
  if (isValid(value)) {
    return format(formatter)(value);
  }
  return defaultDisplay;
};

export const price = ({ currency = '￥', digit = 2, defaultDisplay = '--' } = {}) => (value: number): string => {
  if (isFinite(value)) {
    const number = (Math.round(value * 100) / 100).toFixed(digit);
    return trim(`${currency} ${number}`);
  }
  return defaultDisplay;
};

export const percentage = ({ digit = 2, symbol = '%', defaultDisplay = '--' } = {}) => (value: number): string => {
  if (isFinite(value)) {
    const digits = 10 ** digit;
    const result = Math.round(Number(value) * digits * 100) / digits;
    return isNaN(result) ? defaultDisplay : `${result.toFixed(digit)}${symbol}`;
  }
  return defaultDisplay;
};
