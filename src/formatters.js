import format from 'date-fns/fp/format';
import parseISO from 'date-fns/fp/parseISO';
import parse from 'date-fns/fp/parse';
import { isFinite, trim, isNaN, flow } from 'lodash/fp';

export const date = ({
  formatter = 'yyyy-MM-dd',
  parser,
} = {}) => flow(
  parser ? parse(parser) : parseISO,
  format(formatter),
);

export const time = ({
  formatter = 'yyyy-MM-dd HH:mm:ss',
  parser,
}) => flow(
  parser ? parse(parser) : parseISO,
  format(formatter),
);

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
