import {
  identity,
  propertyOf,
} from 'lodash/fp';

export default (textMap: {
  [text: string]: any
  // @ts-ignore
}) => (i18n = identity) => (key) => {
  if (key) {
    // @ts-ignore
    const text = propertyOf(textMap)(key);
    if (text) {
      return i18n(text);
    }
    console.warn(`Can not find proper key: ${key} in textMap: ${JSON.stringify(textMap)}`);
  }

  return '';
};
