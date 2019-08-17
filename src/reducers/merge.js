import { isArray, mapValues, prop, flow, identity } from 'lodash/fp';
import normalize from './normalize';

const mapValuesWithKey = mapValues.convert({ cap: false });

export default ({
  schema,
  entityKey,
  preProcess,
  dataKey,
  processValue,
  postProcess,
}) => (originalData, { payload, meta }) => flow(
  dataKey ? prop(dataKey) : identity,
  preProcess ? (data) => preProcess({ originalData, meta, payload, data }) : identity,
  (data) => normalize(isArray(data) ? [schema] : schema)(data),
  prop(`entities.${entityKey || schema.key}`),
  mapValuesWithKey((value, key) => ({
    ...originalData[key],
    ...(processValue ? processValue({ meta, originalData, payload, value }) : value),
  })),
  (newData) => ({ ...originalData, ...newData }),
  postProcess ? (data) => postProcess({ data, originalData, meta, payload }) : identity,
)(payload);
