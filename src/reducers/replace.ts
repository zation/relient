import { isArray, propOr, flow } from 'lodash/fp';
import type { schema as normalizrSchema } from 'normalizr';
import type { ReducerMapValue } from 'redux-actions';
import normalize from './normalize';

export default (schema: normalizrSchema.Entity): ReducerMapValue<unknown, unknown> => (
  originalData, { payload },
) => flow(
  normalize(isArray(payload) ? [schema] : schema),
  propOr({}, `entities.${schema.key}`),
)(payload);
