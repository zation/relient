import format from 'date-fns/fp/format';
import parseISO from 'date-fns/fp/parseISO';
import parse from 'date-fns/fp/parse';
import isValid from 'date-fns/fp/isValid';
import { isFinite, trim, isNaN } from 'lodash/fp';

export const date = ({
  formatter = 'yyyy-MM-dd',
  parser,
  baseDate,
  defaultDisplay = '--',
} = {}) => (value) => {
  try {
    const dateValue = (parser && baseDate ? parse(baseDate)(parser) : parseISO)(value);
    if (isValid(dateValue)) {
      return format(formatter)(dateValue);
    }
    return defaultDisplay;
  } catch (e) {
    return defaultDisplay;
  }
};

export const time = ({
  formatter = 'yyyy-MM-dd HH:mm:ss',
  parser,
  baseDate,
  defaultDisplay = '--',
} = {}) => (value) => {
  try {
    const dateValue = (parser && baseDate ? parse(baseDate)(parser) : parseISO)(value);
    if (isValid(dateValue)) {
      return format(formatter)(dateValue);
    }
    return defaultDisplay;
  } catch (e) {
    return defaultDisplay;
  }
};

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
