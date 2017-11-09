import { isArray, propOr, flow } from 'lodash/fp';
import normalize from './normalize';

export default schema => (originalData, { payload }) =>
  flow(
    normalize(isArray(payload) ? [schema] : schema),
    propOr({}, `entities.${schema.key}`),
  )(payload);
