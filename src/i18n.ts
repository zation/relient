import { cloneElement, isValidElement, ReactElement } from 'react';
import {
  parse,
  isLiteralElement,
  isArgumentElement,
} from 'intl-messageformat-parser';
import {
  flow, map, prop, every, values as getValues, join, identity,
} from 'lodash/fp';
import convert from 'lodash/fp/convert';

const mapWithIndex = convert(map, { cap: false });

export default (messages: {
  [key: string]: string
}) => (
  messageKey: string,
  values?: {
    [key: string]: ReactElement | string | number
  },
): string | undefined | (ReactElement | string | number)[] => {
  if (!messages) {
    throw new Error('Messages is required');
  }

  if (!messageKey) {
    throw new Error('messageKey is required');
  }

  try {
    return flow(
      prop(messageKey),
      parse,
      mapWithIndex((element, index) => {
        const { value, type } = element;
        if (isLiteralElement(element)) {
          return value;
        }
        if (isArgumentElement(element)) {
          const argumentValue = prop(value)(values);
          return isValidElement(argumentValue)
            ? cloneElement(argumentValue, { key: `${value}${index}` }) : argumentValue;
        }
        throw new Error(`Element type is not handled for: ${type}`);
      }),
      flow(getValues, every((value) => typeof value === 'string'))(values) ? join('') : identity,
    )(messages);
  } catch (e) {
    if (values) {
      throw new Error(`Error for messageKey: ${messageKey} and values: ${JSON.stringify(values)}`);
    }
    throw new Error(`Error for messageKey: ${messageKey}`);
  }
};
