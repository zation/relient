import { omit, prop } from 'lodash/fp';
import type { schema as normalizrSchema } from 'normalizr';
import type { ReducerMeta } from 'redux-actions';

export default (schema: normalizrSchema.Entity): ReducerMeta<unknown, unknown, unknown> => (
  originalData,
  { meta },
  // @ts-ignore
) => omit([prop(schema.idAttribute)(meta)])(originalData);
