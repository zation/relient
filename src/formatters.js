import format from 'date-fns/fp/format';
import { isFinite, trim, isNaN } from 'lodash/fp';

export const date = (formatter = 'YYYY-MM-dd') => format(formatter);

export const time = (formatter = 'YYYY-MM-dd HH:mm:ss') => format(formatter);

export const price = ({ currency = '￥', digit = 2, defaultDisplay = '--' } = {}) => (value) => {
  if (isFinite(value)) {
    const number = parseFloat(Math.round(value * 100) / 100).toFixed(digit);
    return trim(`${currency} ${number}`);
  }
  return defaultDisplay;
};

export const percentage = ({ digit = 2, symbol = '%', defaultDisplay = '--' } = {}) => (value) => {
  if (isFinite(value)) {
    const digits = 10 ** digit;
    const result = Math.round(Number(value) * digits * 100) / digits;
    return isNaN(result) ? defaultDisplay : `${result.toFixed(digit)}${symbol}`;
  }
  return defaultDisplay;
};
