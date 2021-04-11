import { identity } from 'lodash/fp';

export default (textMap: {
  [key: string]: any
}) => (i18n = identity) => (key: string) => {
  if (key) {
    const text = textMap[key];
    if (text) {
      return i18n(text);
    }
    console.warn(`Can not find proper key: ${key} in textMap: ${JSON.stringify(textMap)}`);
  }

  return '';
};
