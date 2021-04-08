import { omit, prop } from 'lodash/fp';
import type { ReducerMeta } from 'redux-actions';
import type { schema as schemaType } from 'normalizr';

export default <Item, Payload, Meta>
(entity: schemaType.Entity): ReducerMeta<{ [id: string]: Item }, Payload, Meta> => (
  originalData,
  { meta },
  // @ts-ignore
) => omit([prop(entity.idAttribute)(meta)])(originalData);
