import {
  flow,
  identity,
  findKey,
  eq,
} from 'lodash/fp';

export default (textMap: {
  [text: string]: any
}) => (i18n = identity) => flow((value) => findKey(eq(value))(textMap), i18n);
