import { identity, map } from 'lodash/fp';

// @ts-ignore
const mapWithKeys = map.convert({ cap: false });

export default (textMap: {
  [text: string]: any
}) => (i18n = identity) => mapWithKeys((label: string, key: string) => ({
  value: key,
  label: i18n(label),
}))(textMap);
