import { identity, map } from 'lodash/fp';

// @ts-ignore
const mapWithKeys = map.convert({ cap: false });

export default (textMap: {
  [text: string]: any
}) => (i18n = identity) => mapWithKeys((text, key) => ({
  value: key,
  text: i18n(text),
}))(textMap);
