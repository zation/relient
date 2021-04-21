import { isArray, propOr, flow } from 'lodash/fp';
import type { schema as schemaType } from 'normalizr';
import type { ReducerMapValue } from 'redux-actions';
import normalize from './normalize';

export default <Item, Payload>
(schema: schemaType.Entity): ReducerMapValue<Record<number | string, Item>, Payload> => (
  originalData, { payload },
) => flow(
  normalize(isArray(payload) ? [schema] : schema),
  propOr({}, `entities.${schema.key}`),
)(payload);
