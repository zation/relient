import { identity, map } from 'lodash/fp';
import convert from 'lodash/fp/convert';

const mapWithKeys = convert(map, { cap: false });

export default (textMap: {
  [text: string]: any
}) => (i18n = identity) => mapWithKeys((value, text) => ({
  value,
  text: i18n(text),
}))(textMap);
