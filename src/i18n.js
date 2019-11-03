import { cloneElement, isValidElement } from 'react';
import { parse, isLiteralElement, isArgumentElement } from 'intl-messageformat-parser';
import { flow, map, prop, every, values as getValues, join, identity } from 'lodash/fp';

export default (messages) => (messageKey, values) => {
  if (!messages) {
    throw new Error('Messages is required');
  }

  if (!messageKey) {
    throw new Error('messageKey is required');
  }

  return flow(
    prop(messageKey),
    parse,
    map((element) => {
      const { value, type } = element;
      if (isLiteralElement(element)) {
        return value;
      }
      if (isArgumentElement(element)) {
        const argumentValue = values[value];
        return isValidElement(argumentValue)
          ? cloneElement(argumentValue, { key: value }) : argumentValue;
      }
      throw new Error(`Element type is not handled for: ${type}`);
    }),
    flow(getValues, every((value) => typeof value === 'string'))(values) ? join('') : identity,
  )(messages);
};
