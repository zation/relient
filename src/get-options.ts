import { identity, map } from 'lodash/fp';
import convert from 'lodash/fp/convert';

const mapWithKeys = convert(map, { cap: false });

export default (textMap: {
  [text: string]: any
}) => (i18n = identity) => mapWithKeys((text: string, key: string) => ({
  value: key,
  text: i18n(text),
}))(textMap);
