import {
  isArray, mapValues, prop, flow, identity,
} from 'lodash/fp';
import convert from 'lodash/fp/convert';
import type { ReducerMeta } from 'redux-actions';
import type { schema as schemaType } from 'normalizr';
import normalize from './normalize';

const mapValuesWithKey = convert(mapValues, { cap: false });

type State<Item> = { [id: string]: Item };

interface MergeParams<Item, Payload, Meta, Entity> {
  schema: schemaType.Entity<Entity>
  entityKey?: string
  preProcess?: (args: {
    originalData: State<Item>
    meta: Meta
    payload: Payload
    data: State<Item>
  }) => any
  dataKey?: string
  processValue?: (args: {
    originalData: State<Item>
    meta: Meta
    payload: Payload
    value: Item
  }) => State<Item>
  postProcess?: (args: {
    originalData: State<Item>
    meta: Meta
    payload: Payload
    data: State<Item>
  }) => State<Item>
}

export default <Item, Payload, Meta, Entity = any>({
  schema,
  entityKey,
  preProcess,
  dataKey,
  processValue,
  postProcess,
}: MergeParams<Item, Payload, Meta, Entity>): ReducerMeta<{ [id: string]: Item }, Payload, Meta> => (
  originalData,
  { payload, meta },
) => flow(
  dataKey ? prop(dataKey) : identity,
  preProcess ? (data) => preProcess({
    originalData, meta, payload, data,
  }) : identity,
  (data) => normalize<Entity>(isArray(data) ? [schema] : schema)(data),
  prop(`entities.${entityKey || schema.key}`),
  mapValuesWithKey((value: Item, id: string) => ({
    ...originalData[id],
    ...(processValue ? processValue({
      meta, originalData, payload, value,
    }) : value),
  })),
  (newData: any): any => ({ ...originalData, ...newData }),
  postProcess ? (data) => postProcess({
    data, originalData, meta, payload,
  }) : identity,
)(payload);
