import { identity, map } from 'lodash/fp';

const mapWithKeys = map.convert({ cap: false });

export default (textMap) => (i18n = identity) => mapWithKeys((text, key) => ({
  value: key,
  text: i18n(text),
}))(textMap);
