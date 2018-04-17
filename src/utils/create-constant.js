import { flow, identity, keys, map, propertyOf } from 'lodash/fp';

const mapWithKeys = map.convert({ cap: false });

export default textMap => ({
  values: keys(textMap),
  getOptions: (i18n = identity) => mapWithKeys((text, key) => ({
    value: key,
    text: i18n(text),
  }))(textMap),
  getText: (i18n = identity) => flow(propertyOf(textMap), i18n),
});
