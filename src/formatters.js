import format from 'date-fns/fp/formatWithOptions';
import { isNumber, trim, isNaN } from 'lodash/fp';

export const date = (formatter = 'YYYY-MM-DD') => format(formatter);

export const time = (formatter = 'YYYY-MM-DD HH:mm:ss') => format(formatter);

export const price = ({ currency = '￥', digit = 2, defaultDisplay = '--' } = {}) => (value) => {
  if (isNumber(value)) {
    const number = parseFloat(Math.round(value * 100) / 100).toFixed(digit);
    return trim(`${currency} ${number}`);
  }
  return defaultDisplay;
};

export const percentage = ({ digit = 2, symbol = '%', defaultDisplay = '--' } = {}) => (value) => {
  if (isNumber(value)) {
    const digits = 10 ** digit;
    const result = Math.round(Number(value) * digits * 100) / digits;
    return isNaN(result) ? defaultDisplay : `${result.toFixed(digit)}${symbol}`;
  }
  return defaultDisplay;
};
