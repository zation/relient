import {
  flow,
  identity,
  propertyOf,
} from 'lodash/fp';

export default (textMap: {
  [text: string]: any
  // @ts-ignore
}) => (i18n = identity) => flow(propertyOf(textMap), i18n);
