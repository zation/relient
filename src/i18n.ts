import { cloneElement, isValidElement, ReactElement } from 'react';
import {
  parse,
  isLiteralElement,
  isArgumentElement,
} from 'intl-messageformat-parser';
import {
  flow, map, prop, every, values as getValues, join, identity,
} from 'lodash/fp';

// @ts-ignore
const mapWithIndex = map.convert({ cap: false });

export default (messages: {
  [key: string]: string
}, config: {
  ignoreNoMessageWarning
} = {
  ignoreNoMessageWarning: false,
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

  const message = prop(messageKey)(messages);
  if (!message) {
    if (!config.ignoreNoMessageWarning) {
      console.warn(`No message for key: ${messageKey}`);
    }
    return messageKey;
  }

  try {
    return flow(
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
      flow(getValues, every((value) => typeof value === 'string' || typeof value === 'number'))(values) ? join('') : identity,
    )(message);
  } catch (e) {
    if (values) {
      throw new Error(`Error for messageKey: ${messageKey} and values: ${JSON.stringify(values)}`);
    }
    throw new Error(`Error for messageKey: ${messageKey}`);
  }
};
