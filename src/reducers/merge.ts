import {
  isArray, mapValues, prop, flow, identity,
} from 'lodash/fp';
import type { schema as normalizrSchema } from 'normalizr';
import type { ReducerMapValue } from 'redux-actions';
import normalize from './normalize';

// @ts-ignore
const mapValuesWithKey = mapValues.convert({ cap: false });

interface Merge<Payload, Meta> {
  (args: {
    schema: normalizrSchema.Entity,
    entityKey: string,
    preProcess: (args: { originalData: any, meta: Meta, payload: Payload, data: any }) => any,
    dataKey: string,
    processValue: (args: {
      originalData: any,
      meta: Meta,
      payload: Payload,
      value: any,
    }) => any,
    postProcess: (args: {
      originalData: any,
      meta: Meta,
      payload: Payload,
      data: any,
    }) => any,
  }): ReducerMapValue<Payload, Meta>
}

const merge: Merge<unknown, unknown> = ({
  schema,
  entityKey,
  preProcess,
  dataKey,
  processValue,
  postProcess,
}) => (originalData, { payload, meta }) => flow(
  dataKey ? prop(dataKey) : identity,
  preProcess ? (data) => preProcess({
    originalData, meta, payload, data,
  }) : identity,
  (data) => normalize(isArray(data) ? [schema] : schema)(data),
  prop(`entities.${entityKey || schema.key}`),
  mapValuesWithKey((value, key) => ({
    ...originalData[key],
    ...(processValue ? processValue({
      meta, originalData, payload, value,
    }) : value),
  })),
  (newData: any): any => ({ ...originalData, ...newData }),
  postProcess ? (data) => postProcess({
    data, originalData, meta, payload,
  }) : identity,
)(payload);

export default merge;
