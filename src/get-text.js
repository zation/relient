import { flow, identity, propertyOf } from 'lodash/fp';

export default (textMap) => (i18n = identity) => flow(propertyOf(textMap), i18n);
