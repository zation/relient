import { isArray, mapValues, prop, flow, identity, pick } from 'lodash/fp';
import normalize from './normalize';

const mapValuesWithKey = mapValues.convert({ cap: false });

export default ({ schema, entityKey, dataKey, attributes }) => (originalData, { payload }) =>
  flow(
    dataKey ? prop(dataKey) : identity,
    normalize(isArray(payload) ? [schema] : schema),
    prop(`entities.${entityKey || schema.key}`),
    mapValuesWithKey((value, key) => ({
      ...originalData[key],
      ...(attributes ? pick(attributes)(value) : value),
    })),
    newData => ({ ...originalData, ...newData }),
  )(payload);
