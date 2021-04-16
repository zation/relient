import {
  cloneElement,
  isValidElement,
  ReactElement,
  useContext,
  createContext,
} from 'react';
import {
  parse,
  isLiteralElement,
  isArgumentElement,
  MessageFormatElement,
} from '@formatjs/icu-messageformat-parser';
import {
  flow, map, prop, every, values as getValues, join, identity,
} from 'lodash/fp';

// @ts-ignore
const mapWithIndex = map.convert({ cap: false });

export interface I18N {
  (
    messageKey: string,
    values?: {
      [key: string]: ReactElement | string | number
    },
  ): string | undefined | (ReactElement | string | number)[]
}

export const I18NContext = createContext<I18N>(identity);

export const useI18N = () => useContext<I18N>(I18NContext);

export default (messages: {
  [key: string]: string
}, config: {
  ignoreNoMessageWarning: boolean
} = {
  ignoreNoMessageWarning: false,
}): I18N => (
  messageKey,
  values?,
) => {
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
      mapWithIndex((element: MessageFormatElement, index: number) => {
        const { type } = element;
        if (isLiteralElement(element)) {
          return element.value;
        }
        if (isArgumentElement(element)) {
          const argumentValue = prop(element.value)(values);
          return isValidElement(argumentValue)
            ? cloneElement(argumentValue, { key: `${element.value}${index}` }) : argumentValue;
        }
        throw new Error(`Element type is not handled for: ${type}`);
      }),
      flow(
        getValues,
        every((value) => typeof value === 'string' || typeof value === 'number'),
      )(
        values) ? join('') : identity,
    )(message);
  } catch (e) {
    if (values) {
      throw new Error(`Error for messageKey: ${messageKey} and values: ${JSON.stringify(values)}`);
    }
    throw new Error(`Error for messageKey: ${messageKey}`);
  }
};
